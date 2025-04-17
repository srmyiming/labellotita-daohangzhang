import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams, useLoaderData } from 'react-router-dom';


import { Factory } from '../types';
import { useManufacturerFilters, Filters } from '../hooks/useManufacturerFilters';
import ManufacturerFilters from '../components/manufacturer/ManufacturerFilters';
import ManufacturerSearch from '../components/manufacturer/ManufacturerSearch';
import ManufacturerListItem from '../components/manufacturer/ManufacturerListItem';
import { Loader2 } from 'lucide-react';
import { supabase, manufacturersApi } from '../lib/supabase';

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
  
  // 从路由状态和URL参数获取初始值
  const { selectedCategory: categoryFromRoute, fromCategories } = location.state || {};
  const searchTermFromUrl = searchParams.get('search') || loaderData?.searchTerm || '';
  const categoryIdFromUrl = searchParams.get('category') || categoryFromRoute || loaderData?.categoryId || '';

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

  // 本地状态管理
  const [localFilters, setLocalFilters] = useState({
    searchTerm: searchTermFromUrl,
    categoryId: categoryIdFromUrl
  });

  // 初始化过滤器
  useEffect(() => {
    if (searchTermFromUrl) {
      updateFilter('searchTerm', searchTermFromUrl);
    }
    if (categoryIdFromUrl) {
      updateFilter('categoryId', categoryIdFromUrl);
    }
  }, []);

  // 处理过滤器更新
  const handleFilterChange = (key: keyof Filters, value: string | null) => {
    if (key === 'searchTerm' || key === 'categoryId') {
      setLocalFilters(prev => ({ ...prev, [key]: value }));
    }
    updateFilter(key, value);
    
    // 更新 URL 参数
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set(key === 'searchTerm' ? 'search' : key, value);
    } else {
      newSearchParams.delete(key === 'searchTerm' ? 'search' : key);
    }
    window.history.replaceState(null, '', `${location.pathname}?${newSearchParams}`);
  };

  // 处理重置
  const handleReset = () => {
    setLocalFilters({
      searchTerm: '',
      categoryId: ''
    });
    resetFilters();
    window.history.replaceState(null, '', location.pathname);
  };

  return (
    <div className="min-h-screen bg-white">
      
      
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
            filters={{
              ...filters,
              searchTerm: localFilters.searchTerm,
              categoryId: localFilters.categoryId
            }}
            filteredTags={filteredTags}
            onFilterChange={handleFilterChange}
            onTagToggle={toggleTag}
            onReset={handleReset}
          />

          {/* 右侧内容区 */}
          <div className="flex-1">
            {/* 搜索框 */}
            <ManufacturerSearch 
              value={localFilters.searchTerm}
              onChange={(term) => handleFilterChange('searchTerm', term)}
              searchHistory={searchHistory}
              onClearHistory={clearHistory}
              suggestions={searchSuggestions}
            />
            
            {/* 结果统计 */}
            <div className="mt-6 mb-8 pb-6 border-b">
              <p className="text-gray-600">
                找到 <span className="font-semibold text-gray-900">
                  {filtersManufacturers.length}
                </span> 家制造商
              </p>
            </div>

            {/* 制造商列表 */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-red-600" />
              </div>
            ) : filtersError ? (
              <div className="text-center py-12">
                <p className="text-red-500 text-lg">{filtersError}</p>
              </div>
            ) : filtersManufacturers.length > 0 ? (
              <div className="space-y-4">
                {filtersManufacturers.map(factory => (
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
                <p className="text-gray-500 text-lg">没有找到符合条件的制造商</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
}