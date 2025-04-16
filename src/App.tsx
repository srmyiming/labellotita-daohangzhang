import React, { useState, useEffect } from 'react';
import { 
  createBrowserRouter, 
  RouterProvider, 
  useNavigate,
  Outlet
} from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import { ArrowRight } from 'lucide-react';
import CategoryList from './components/CategoryList';
import FactoryCard from './components/FactoryCard';
import FactoryDetail from './components/FactoryDetail';
import FloatingContact from './components/FloatingContact';
import Footer from './components/Footer';
import ManufacturerCTA from './components/ManufacturerCTA';
import ManufacturerList from './pages/ManufacturerList';
import ManufacturerDetailPage from './pages/ManufacturerDetailPage';
import StaticFactoryDetail from './pages/StaticFactoryDetail';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';
import { manufacturersApi } from './lib/supabase';
import { toast } from 'sonner';

function AppContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showAllManufacturers, setShowAllManufacturers] = useState(false);
  const [selectedFactory, setSelectedFactory] = useState<Factory | null>(null);
  const [recommendedFactories, setRecommendedFactories] = useState<Factory[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchRecommendedFactories = async () => {
      try {
        setLoading(true);
        const data = await manufacturersApi.getRecommended();
        setRecommendedFactories(data);
        if (!selectedFactory && data.length > 0) {
          setSelectedFactory(data[0]);
        }
      } catch (error) {
        console.error('Error fetching recommended factories:', error);
        toast.error('获取推荐制造商失败');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedFactories();
  }, []);

  const handleFactoryClick = (factory: Factory) => {
    setSelectedFactory(factory);
    navigate(`/manufacturers/${factory.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={setSearchTerm} />
      <FloatingContact />
      
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
          <Hero onSearch={setSearchTerm} />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CategoryList />
            
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-red-600">
                推荐制造商
                {loading && <span className="ml-2">加载中...</span>}
              </span>
            </h2>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-8 shadow-md animate-pulse">
                    <div className="aspect-video w-full mb-6 bg-gray-200 rounded-lg"></div>
                    <div className="h-8 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedFactories.map(factory => (
                  <FactoryCard 
                    key={factory.id} 
                    factory={factory}
                    onClick={() => handleFactoryClick(factory)}
                  />
                ))}
              </div>
            )}
            
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setShowAllManufacturers(true)}
                className="group flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 hover:text-red-600 border border-gray-200"
              >
                <span className="font-medium">查看全部制造商</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {recommendedFactories.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  没有找到匹配的工厂。请尝试其他搜索条件。
                </p>
              </div>
            )}
          </main>
          <ManufacturerCTA />
        </>
      )}
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppContent />,
  },
  {
    path: "/manufacturers",
    element: <ManufacturerList onFactoryClick={(factory) => {
      navigate(`/manufacturers/${factory.id}`);
    }} />,
  },
  {
    path: "/manufacturers/:id",
    element: <ManufacturerDetailPage />,
  },
  {
    path: "/static-factory",
    element: <StaticFactoryDetail />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;