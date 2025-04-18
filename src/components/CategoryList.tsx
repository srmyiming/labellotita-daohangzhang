import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Beef, Box, Droplet, Cookie, Wine, Cake, Milk } from 'lucide-react';
import { supabase } from '../lib/supabase';
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
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    if (!categoryId) {
      toast.error('无效的分类');
      return;
    }
    navigate(`/manufacturers?category=${categoryId}`);
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const cachedCategories = sessionStorage.getItem('categories');
        if (cachedCategories && isMounted) {
          setCategories(JSON.parse(cachedCategories));
          setLoading(false);
          return;
        }

        const { data: categoriesData, error: categoriesError } = await supabase
          .from('category_counts')
          .select('*')
          .order('manufacturer_count', { ascending: false })
          .abortSignal(controller.signal);
        
        if (categoriesError) throw categoriesError;
        
        if (!categoriesData) {
          throw new Error('未获取到分类数据');
        }
        
        const formattedCategories = categoriesData.map(category => ({
          id: category.id,
          name: category.name,
          icon: category.icon || 'box',
          count: category.manufacturer_count
        }));

        if (isMounted) {
          setCategories(formattedCategories);
          sessionStorage.setItem('categories', JSON.stringify(formattedCategories));
        }
      } catch (error: any) {
        if (error.name === 'AbortError') return;
        console.error('Error fetching categories:', error);
        if (isMounted) {
          setError('获取分类列表失败');
          toast.error('获取分类列表失败');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => {
            sessionStorage.removeItem('categories');
            window.location.reload();
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          重新加载
        </button>
      </div>
    );
  }

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