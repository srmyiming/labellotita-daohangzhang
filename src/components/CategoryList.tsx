import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Beef, Box, Droplet, Cookie, Wine, Cake, Milk } from 'lucide-react';
import { supabase, manufacturersApi } from '../lib/supabase';
import { Category } from '../types';
import { toast } from 'sonner';

const iconMap = {
  beef: Beef,
  box: Box,
  droplet: Droplet,
  cookie: Cookie,
  wine: Wine,
  cake: Cake,
  milk: Milk,
};

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleCategoryClick = useCallback((categoryId: string) => {
    navigate('/manufacturers', { 
      state: { 
        selectedCategory: categoryId,
        fromCategories: true 
      } 
    });
  }, [navigate]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('category_counts')
          .select('*');
        
        if (categoriesError) throw categoriesError;
        
        // 转换数据结构以匹配 Category 类型
        const formattedCategories = categoriesData.map(category => ({
          id: category.id,
          name: category.name,
          icon: category.icon || 'box',
          count: category.manufacturer_count
        }));
        
        setCategories(formattedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('获取分类列表失败');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-12">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-red-600">
          热门分类
          {loading && <span className="ml-2">加载中...</span>}
        </span>
      </h2>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col items-center p-8 bg-white rounded-xl shadow-md animate-pulse">
              <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap] || Box;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`flex flex-col items-center p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  category.count === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
                disabled={category.count === 0}
              >
                <Icon className="h-12 w-12 text-yellow-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className={`text-sm font-medium ${category.count > 0 ? 'text-gray-500' : 'text-gray-400'}`}>
                  {category.count} 家制造商
                </p>
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}