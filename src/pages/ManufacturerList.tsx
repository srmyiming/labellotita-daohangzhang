import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams, useLoaderData } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Factory } from '../types';
import { useManufacturerFilters } from '../hooks/useManufacturerFilters';
import ManufacturerFilters from '../components/manufacturer/ManufacturerFilters';
import ManufacturerSearch from '../components/manufacturer/ManufacturerSearch';
import ManufacturerListItem from '../components/manufacturer/ManufacturerListItem';
import { Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

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
  
  // 从路由状态获取分类ID
  const locationState = location.state || {};
  const selectedCategoryFromRoute = locationState.selectedCategory;
  const searchTermFromUrl = searchParams.get('search') || loaderData?.searchTerm || '';
  const categoryIdFromUrl = searchParams.get('category') || selectedCategoryFromRoute || loaderData?.categoryId || '';

  const {
    // 过滤器状态和操作
    filters,
    updateFilter,
    resetFilters,
    toggleTag,
    
    // 数据
    manufacturers: filtersManufacturers,
    categories,
    regions,
    countries,
    
    // UI状态
    loading,
    error: filtersError,
    
    // 计算属性
    filteredTags,
    searchSuggestions,

    // 搜索历史
    searchHistory,
    clearHistory,
  } = useManufacturerFilters({ onFactoryClick });

  const [searchTerm, setSearchTerm] = useState(searchTermFromUrl);
  const [categoryId, setCategoryId] = useState(categoryIdFromUrl);
  const [loadingManufacturers, setLoadingManufacturers] = useState(false);
  const [manufacturers, setManufacturers] = useState<Factory[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 当从分类页面跳转来时，设置分类筛选器
  useEffect(() => {
    if (selectedCategoryFromRoute) {
      updateFilter('categoryId', selectedCategoryFromRoute);
      setCategoryId(selectedCategoryFromRoute);
    }
  }, [selectedCategoryFromRoute, updateFilter]);

  // 从URL参数或加载器数据设置初始搜索词
  useEffect(() => {
    if (searchTermFromUrl) {
      updateFilter('searchTerm', searchTermFromUrl);
    }
  }, [searchTermFromUrl, updateFilter]);

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={(term) => updateFilter('searchTerm', term)} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="py-8">
          <h1 className="text-4xl font-bold text-center">食品制造商</h1>
          <p className="text-gray-600 mt-4 text-center text-lg">
            发现西班牙最好的食品制造商
          </p>
        </div>

        <div className="flex gap-12">
          {/* 左侧筛选栏 */}
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

          {/* 右侧内容区 */}
          <div className="flex-1">
            {/* 搜索框 */}
            <ManufacturerSearch 
              value={filters.searchTerm}
              onChange={(term) => updateFilter('searchTerm', term)}
              searchHistory={searchHistory}
              onClearHistory={clearHistory}
              suggestions={searchSuggestions}
            />
            
            {/* 结果统计 */}
            <div className="mt-6 mb-8 pb-6 border-b">
              <p className="text-gray-600">
                找到 <span className="font-semibold text-gray-900">
                  {manufacturers.length}
                </span> 家制造商
              </p>
            </div>

            {/* 制造商列表 */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-red-600" />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500 text-lg">{error}</p>
              </div>
            ) : manufacturers.length > 0 ? (
              <div className="space-y-4">
                {manufacturers.map(factory => (
                  <ManufacturerListItem
                    key={factory.id}
                    factory={factory}
                    categories={categories}
                    onClick={() => onFactoryClick(factory)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  没有找到匹配的工厂。请尝试其他搜索条件。
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}