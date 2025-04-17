import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
import { Beef, Box, Droplet, Cookie, Wine, Cake, Milk, ArrowRight, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Category } from '../types';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';

const iconMap = {
  beef: Beef,
  box: Box,
  droplet: Droplet,
  cookie: Cookie,
  wine: Wine,
  cake: Cake,
  milk: Milk,
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('category_counts')
          .select('*');
        
        if (error) throw error;
        
        const formattedCategories = data.map(category => ({
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

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryClick = (categoryId: string) => {
    navigate('/manufacturers', { 
      state: { 
        selectedCategory: categoryId,
        fromCategories: true 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 页眉已在 Layout 组件中 */}
      
      {/* 主横幅 */}
      <div className="relative bg-gradient-to-r from-red-600 to-yellow-600 py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              食品分类目录
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              探索西班牙各类优质食品制造商，找到最适合您的合作伙伴
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 搜索框 */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索分类..."
              className="w-full pl-12 pr-4 h-12 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-sm hover:shadow transition-shadow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* 分类列表 */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
          </div>
        ) : filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map(category => {
              const Icon = iconMap[category.icon as keyof typeof iconMap] || Box;
              
              return (
                <div 
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer group"
                >
                  <div className="p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                      <Icon className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{category.count} 家制造商</p>
                    <div className="flex items-center text-red-600 text-sm font-medium">
                      <span>查看制造商</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">没有找到匹配的分类</p>
            <Button 
              onClick={() => setSearchTerm('')}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              清除搜索
            </Button>
          </div>
        )}
        
        {/* 联系我们 CTA */}
        <div className="mt-20 py-12 px-6 bg-gray-50 rounded-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              找不到您需要的分类？
            </h2>
            <p className="text-gray-600 mb-6">
              我们不断更新和完善分类目录。如果您没有找到合适的分类，请联系我们。
            </p>
            <Button
              onClick={() => navigate('/contact')}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-6 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300"
            >
              联系我们
            </Button>
          </div>
        </div>
      </main>
      {/* 页脚已在 Layout 组件中 */}
    </div>
  );
}
