import React, { useState, useEffect, useMemo } from 'react';
import { 
  createBrowserRouter, 
  RouterProvider, 
  useNavigate
} from 'react-router-dom';
import Hero from './components/Hero';
import { ArrowRight } from 'lucide-react';
import CategoryList from './components/CategoryList';
import FactoryCard from './components/FactoryCard';
import FactoryDetail from './components/FactoryDetail';
import ManufacturerCTA from './components/ManufacturerCTA';
import ManufacturerList from './pages/ManufacturerList';
import ManufacturerDetailPage from './pages/ManufacturerDetailPage';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';
import { manufacturersApi } from './lib/supabase';
import { Factory } from './types';

// 搜索历史存储键
const SEARCH_HISTORY_KEY = 'search_history';

function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const savedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const addToSearchHistory = (term: string) => {
    if (!term.trim()) return;
    
    setSearchHistory(prev => {
      const newHistory = [term, ...prev.filter(item => item !== term)].slice(0, 10);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  };

  return { searchHistory, addToSearchHistory, clearSearchHistory };
}

function useFactories() {
  const [recommendedFactories, setRecommendedFactories] = useState<Factory[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchRecommendedFactories() {
      try {
        setLoading(true);
        const factories = await manufacturersApi.getRecommended();
        setRecommendedFactories(factories);
      } catch (error) {
        console.error('Error fetching recommended factories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendedFactories();
  }, []);

  return {
    recommendedFactories,
    loading
  };
}

function AppContent() {
  const { searchHistory, addToSearchHistory } = useSearchHistory();
  const { recommendedFactories, loading: factoriesLoading } = useFactories();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetail, setShowDetail] = useState(false);
  const [showAllManufacturers, setShowAllManufacturers] = useState(false);
  const [selectedFactory, setSelectedFactory] = useState<Factory | null>(null);
  const navigate = useNavigate();
  
  // 搜索建议 - 根据当前工厂数据生成
  const searchSuggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    const suggestions: Array<{type: string, text: string}> = [];
    const term = searchTerm.toLowerCase();
    const maxSuggestions = 5;
    
    // 从制造商名称生成建议
    recommendedFactories.forEach(factory => {
      if (suggestions.length >= maxSuggestions) return;
      if (factory.name.toLowerCase().includes(term)) {
        suggestions.push({
          type: '制造商',
          text: factory.name
        });
      }
    });
    
    // 从产品名称生成建议
    recommendedFactories.forEach(factory => {
      if (suggestions.length >= maxSuggestions) return;
      factory.products?.forEach((product: string) => {
        if (suggestions.length >= maxSuggestions) return;
        if (product.toLowerCase().includes(term)) {
          suggestions.push({
            type: '产品',
            text: product
          });
        }
      });
    });
    
    // 如果之前没有找到足够的建议,添加一些默认分类建议
    if (suggestions.length < maxSuggestions) {
      const categories = ['奶酪', '橄榄油', '香肠', '火腿', '葡萄酒'];
      categories.forEach(category => {
        if (suggestions.length >= maxSuggestions) return;
        if (category.toLowerCase().includes(term)) {
          suggestions.push({
            type: '分类',
            text: category
          });
        }
      });
    }
    
    return suggestions;
  }, [searchTerm, recommendedFactories]);
  
  // 处理搜索词更新: 保存历史并导航到制造商列表
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim()) {
      addToSearchHistory(term);
      // 跳转到制造商列表页并携带查询参数
      navigate(`/manufacturers?search=${encodeURIComponent(term)}`);
    }
  };
  
  const handleFactoryClick = (factory: Factory) => {
    setSelectedFactory(factory);
    navigate(`/manufacturers/${factory.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {showDetail && selectedFactory && (
        <FactoryDetail 
          factory={selectedFactory} 
          onBack={() => setShowDetail(false)} 
        />
      )}
      
      {showAllManufacturers && (
        <ManufacturerList onFactoryClick={handleFactoryClick} />
      )}
      
      {!showDetail && !showAllManufacturers && (
        <>
          <Hero 
            onSearch={handleSearch} 
            searchHistory={searchHistory} 
            suggestions={searchSuggestions} 
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CategoryList />
            
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-red-600">
                推荐制造商
              </span>
            </h2>
            
            {factoriesLoading ? (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-700"></div>
                <p className="mt-2 text-gray-600">加载中...</p>
              </div>
            ) : recommendedFactories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedFactories.slice(0, 6).map(factory => (
                  <FactoryCard 
                    key={factory.id}
                    factory={factory}
                    onClick={() => handleFactoryClick(factory)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-600">
                  没有找到匹配的工厂。请尝试其他搜索条件。
                </p>
              </div>
            )}
          </div>
          <ManufacturerCTA />
        </>
      )}
    </div>
  );
}

import Layout from './components/Layout';
import StaticFactoryDetail from './pages/StaticFactoryDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <AppContent /> },
      { 
        path: 'manufacturers',
        loader: ({ request }) => {
          // 从URL参数中获取搜索词
          const url = new URL(request.url);
          const searchTerm = url.searchParams.get('search') || '';
          return { searchTerm };
        },
        element: <ManufacturerList onFactoryClick={(factory: Factory) => {
          window.location.href = `/manufacturers/${factory.id}`;
        }} />
      },
      { path: 'manufacturers/:id', element: <ManufacturerDetailPage /> },
      { path: 'static-factory', element: <StaticFactoryDetail /> },
      { path: 'categories', element: <Categories /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
