import { useEffect, useRef } from 'react';
import { useLocation, useSearchParams, useLoaderData } from 'react-router-dom';
import { Factory } from '../types';
import { useManufacturerFilters } from '../hooks/useManufacturerFilters';
import ManufacturerFilters from '../components/manufacturer/ManufacturerFilters';
import ManufacturerSearch from '../components/manufacturer/ManufacturerSearch';
import ManufacturerListItem from '../components/manufacturer/ManufacturerListItem';
import { Loader2 } from 'lucide-react';
import { Spinner } from '../components/ui/Spinner';

interface ManufacturerListProps {
  onFactoryClick: (factory: Factory) => void;
}

interface LoaderData {
  searchTerm?: string;
  categoryId?: string;
}

export default function ManufacturerList({ onFactoryClick }: ManufacturerListProps) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const loaderData = useLoaderData() as LoaderData;
  const isInitialMount = useRef(true);
  
  const {
    filters,
    updateFilter,
    resetFilters,
    toggleTag,
    manufacturers,
    categories,
    regions,
    countries,
    loading,
    filteredTags,
    searchSuggestions,
    searchHistory,
    clearHistory,
    isLoading,
    error
  } = useManufacturerFilters({ onFactoryClick });

  // 只在组件首次挂载时从 URL 参数更新过滤器
  useEffect(() => {
    if (isInitialMount.current) {
      const categoryId = searchParams.get('category');
      const searchTerm = searchParams.get('search');
      const regionId = searchParams.get('region');
      const country = searchParams.get('country');

      if (categoryId && categoryId !== filters.categoryId) {
        updateFilter('categoryId', categoryId);
      }
      if (searchTerm && searchTerm !== filters.searchTerm) {
        updateFilter('searchTerm', searchTerm);
      }
      if (regionId && regionId !== filters.regionId) {
        updateFilter('regionId', regionId);
      }
      if (country && country !== filters.exportCountry) {
        updateFilter('exportCountry', country);
      }

      isInitialMount.current = false;
    }
  }, [location.key]); // 只在路由变化时执行

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 mb-4">加载出错: {error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          重试
        </button>
      </div>
    );
  }

  if (!manufacturers.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-gray-500 mb-4">没有找到符合条件的厂家</p>
        <button
          onClick={() => {
            const newSearchParams = new URLSearchParams();
            window.history.replaceState(null, '', `${location.pathname}?${newSearchParams}`);
            window.location.reload();
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          重置筛选条件
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 主横幅 */}
      <div className="relative bg-gradient-to-r from-red-600 to-yellow-600 py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              食品制造商
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              发现西班牙最好的食品制造商
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 筛选侧边栏 */}
          <div className="w-full lg:w-1/4 space-y-6">
            <ManufacturerFilters 
              categories={categories}
              regions={regions}
              countries={countries}
              filters={filters}
              filteredTags={filteredTags}
              onFilterChange={updateFilter}
              onTagToggle={toggleTag}
              onReset={resetFilters}
            />
          </div>

          {/* 主内容区 */}
          <div className="w-full lg:w-3/4">
            <ManufacturerSearch 
              value={filters.searchTerm}
              onChange={(term) => updateFilter('searchTerm', term)}
              searchHistory={searchHistory}
              onClearHistory={clearHistory}
              suggestions={searchSuggestions}
            />
            
            <p className="text-sm text-gray-500 mt-4 mb-6">
              找到 {manufacturers.length} 家制造商
            </p>
            
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
              </div>
            ) : manufacturers.length > 0 ? (
              <div className="space-y-6">
                {manufacturers.map((factory: Factory) => (
                  <ManufacturerListItem 
                    key={factory.id}
                    factory={factory}
                    categories={categories}
                    onClick={() => onFactoryClick(factory)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-2">没有找到匹配的制造商</h3>
                <p className="text-gray-500 mb-4">
                  尝试调整您的筛选条件或搜索词，以查看更多结果。
                </p>
                <button
                  onClick={resetFilters}
                  className="text-red-600 font-medium hover:text-red-700"
                >
                  重置所有筛选条件
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
