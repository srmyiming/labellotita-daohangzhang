import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Factory } from '../types';
import { useManufacturerFilters } from '../hooks/useManufacturerFilters';
import ManufacturerFilters from '../components/manufacturer/ManufacturerFilters';
import ManufacturerSearch from '../components/manufacturer/ManufacturerSearch';
import ManufacturerListItem from '../components/manufacturer/ManufacturerListItem';
import { Loader2 } from 'lucide-react';

interface ManufacturerListProps {
  onFactoryClick: (factory: Factory) => void;
}

export default function ManufacturerList({ onFactoryClick }: ManufacturerListProps) {
  const location = useLocation();
  const { selectedCategoryFromRoute } = location.state || {};

  const {
    // 过滤器状态和操作
    filters,
    updateFilter,
    resetFilters,
    toggleTag,
    
    // 数据
    manufacturers,
    categories,
    regions,
    countries,
    
    // UI状态
    loading,
    error,
    
    // 计算属性
    filteredTags,
  } = useManufacturerFilters({ onFactoryClick });

  // 从路由状态设置初始分类
  React.useEffect(() => {
    if (selectedCategoryFromRoute) {
      updateFilter('categoryId', selectedCategoryFromRoute);
    }
  }, [selectedCategoryFromRoute, updateFilter]);

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