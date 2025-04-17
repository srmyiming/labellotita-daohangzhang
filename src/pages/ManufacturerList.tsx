import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams, useLoaderData } from 'react-router-dom';
import { Factory } from '../types';
import { useManufacturerFilters } from '../hooks/useManufacturerFilters';
import ManufacturerFilters from '../components/manufacturer/ManufacturerFilters';
import ManufacturerSearch from '../components/manufacturer/ManufacturerSearch';
import ManufacturerListItem from '../components/manufacturer/ManufacturerListItem';
import { Loader2 } from 'lucide-react';

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
  const { selectedCategory: categoryFromRoute } = location.state || {};
  const searchTermFromUrl = searchParams.get('search') || loaderData?.searchTerm || '';
  const categoryIdFromUrl = searchParams.get('category') || categoryFromRoute || loaderData?.categoryId || '';

  // 使用自定义钩子管理筛选状态
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
    error,
    filteredTags,
    searchSuggestions,
    searchHistory,
    clearHistory
  } = useManufacturerFilters({ onFactoryClick });

  // 初始化搜索条件
  useEffect(() => {
    if (searchTermFromUrl) {
      updateFilter('searchTerm', searchTermFromUrl);
    }
    if (categoryIdFromUrl) {
      updateFilter('categoryId', categoryIdFromUrl);
    }
  }, [searchTermFromUrl, categoryIdFromUrl, updateFilter]);

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
                <Loader2 className="h-8 w-8 animate-spin text-red-600" />
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
                <img 
                  src="/images/no-results.svg" 
                  alt="没有找到结果" 
                  className="w-32 h-32 mx-auto mb-4 opacity-70"
                />
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
