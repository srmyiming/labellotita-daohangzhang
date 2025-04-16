import React from 'react';
import { Factory } from '../types';
import { MapPin, CheckCircle, Image as ImageIcon, Star } from 'lucide-react';
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
  return (
    <div 
      className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer" 
      onClick={onClick}
    >
      <div className="aspect-video w-full mb-6 rounded-lg overflow-hidden bg-gray-100 relative">
        {factory.imageUrl ? (
          <img 
            src={factory.imageUrl} 
            alt={factory.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-gray-300" />
          </div>
        )}
      </div>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{factory.name}</h3>
          <div className="flex items-center gap-2">
            {factory.verified && (
            <span className="inline-flex items-center text-green-600 text-sm font-medium bg-green-50 px-3 py-1 rounded-full">
              <CheckCircle className="h-4 w-4 mr-2" />
              已认证
            </span>
            )}
            {factory.recommended && (
              <span className="inline-flex items-center text-yellow-600 text-sm font-medium bg-yellow-50 px-3 py-1 rounded-full">
                推荐
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <p className="text-gray-600 text-sm mb-2">分类: {categories.find(c => c.id === factory.category)?.name}</p>
        <div className="flex items-center gap-4 text-gray-600 text-sm">
          {factory.rating && (
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span>{factory.rating}</span>
            </div>
          )}
          <MapPin className="h-4 w-4 mr-2 text-red-500" />
          位置: {factory.city}
        </div>
      </div>
      
      <p className="text-sm font-medium text-yellow-600 mb-6 bg-yellow-50 inline-block px-3 py-1 rounded-full">
        {factory.productCount} 种产品
      </p>
    </div>
  );
}