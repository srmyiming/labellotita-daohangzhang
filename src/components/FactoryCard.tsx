import { useState, useEffect } from 'react';
import { Factory } from '../types';
import { MapPin, CheckCircle, Image as ImageIcon, Star, Award } from 'lucide-react';
import { categories } from '../data';

/**
 * 制造商卡片组件
 * 
 * @future API依赖:
 * - GET /api/manufacturers - 获取制造商列表
 * - manufacturer_images表 - 获取制造商主图
 * - manufacturer_categories表 - 获取分类信息
 * 
 * @param factory - 制造商信息
 * @param onClick - 点击卡片回调
 */

export default function FactoryCard({ 
  factory, 
  onClick 
}: { 
  factory: Factory;
  onClick: () => void;
}) {
  // 确定要显示的图片URL
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    // 优先使用 factoryImages 中的第一张图片，其次使用 imageUrl
    if (factory.factoryImages && factory.factoryImages.length > 0) {
      setImageUrl(factory.factoryImages[0]);
    } else if (factory.imageUrl) {
      setImageUrl(factory.imageUrl);
    } else {
      // 如果没有图片，使用基于工厂名称的占位图
      // 使用固定的食品相关图片，而不是随机图片，确保一致性
      const foodImages = [
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
        'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
        'https://images.unsplash.com/photo-1482049016688-2d3e1b311543',
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352'
      ];
      // 使用工厂ID的数字值来选择一个固定的图片，确保同一工厂总是使用同一张图片
      const imageIndex = parseInt(factory.id.replace(/\D/g, '')) % foodImages.length;
      const placeholderUrl = `${foodImages[imageIndex || 0]}?w=400&h=300&fit=crop`;
      setImageUrl(placeholderUrl);
    }
  }, [factory]);

  const handleImageError = () => {
    setImageError(true);
    // 图片加载失败时，使用备用图片
    setImageUrl(`https://source.unsplash.com/400x300/?food,spain,${encodeURIComponent(factory.category || 'factory')}`);
  };

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer" 
      onClick={onClick}
    >
      <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
        {!imageError && imageUrl ? (
          <>
            <img 
              src={imageUrl} 
              alt={factory.name} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <ImageIcon className="w-12 h-12 text-gray-300" />
          </div>
        )}
        {factory.verified && (
          <div className="absolute top-2 right-2 bg-green-500/80 text-white text-xs font-medium px-2 py-1 rounded-full">
            <CheckCircle className="h-3 w-3 inline mr-1" />
            已认证
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{factory.name}</h3>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-flex items-center text-gray-600 text-xs font-medium bg-gray-50 px-2 py-0.5 rounded-full">
            <MapPin className="h-3 w-3 mr-1" />
            {factory.city || factory.address.split(',')[0]}
          </span>
          
          {factory.manufacturer_certifications && factory.manufacturer_certifications.length > 0 && (
            <span className="inline-flex items-center text-blue-600 text-xs font-medium bg-blue-50 px-2 py-0.5 rounded-full">
              <Award className="h-3 w-3 mr-1" />
              {factory.manufacturer_certifications.length} 认证
            </span>
          )}
        </div>
        
        <div className="mb-2">
          <p className="text-gray-600 text-xs mb-2">分类: {factory.categoryName || categories.find(c => c.id === factory.category)?.name}</p>
          <div className="flex items-center gap-4 text-gray-600 text-xs">
            {factory.rating && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">{factory.rating}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {factory.tags?.slice(0, 2).map((tag, index) => (
            <span key={index} className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          )) || 
          factory.manufacturer_tags?.slice(0, 2).map((tagObj, index) => (
            <span key={index} className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full">
              {tagObj.tags.name}
            </span>
          ))}
        </div>
        
        <p className="text-gray-600 text-xs mt-3 mb-3 line-clamp-2">
          {factory.description || `${factory.name}是一家专业的食品制造商，提供高品质的西班牙食品。`}
        </p>
        
        <div className="mt-3 text-xs flex justify-end items-center">
          <span className="text-red-600 font-medium hover:underline">查看详情</span>
        </div>
      </div>
    </div>
  );
}