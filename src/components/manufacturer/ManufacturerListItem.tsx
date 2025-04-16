import React from 'react';
import { Star, MapPin, ArrowRight, CheckCircle, Pin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Factory, Category } from '../../types';
import { Button } from '../ui/button';

interface ManufacturerListItemProps {
  factory: Factory;
  categories: Category[];
  onClick: () => void;
}

export default function ManufacturerListItem({ factory, categories, onClick }: ManufacturerListItemProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/manufacturers/${factory.id}`);
  };

  return (
    <div 
      className="bg-white border rounded-lg p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
          <h3 className="text-xl font-bold group-hover:text-red-600 transition-colors">
            {factory.name}
            {factory.is_pinned && (
              <Pin className="h-4 w-4 text-red-600 ml-2 inline-block" />
            )}
          </h3>
          <div className="flex items-center gap-2">
            {factory.verified && (
              <span className="inline-flex items-center text-green-600 text-sm font-medium">
                <CheckCircle className="h-4 w-4 mr-1" />
                已认证
              </span>
            )}
            {factory.recommended && (
              <span className="inline-flex items-center text-yellow-600 text-sm font-medium">
                推荐
              </span>
            )}
          </div>
          </div>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            {factory.rating && (
              <span className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-4 h-4 ${i < factory.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                  />
                ))}
              </span>
            )}
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-red-600" />
              {factory.city}
            </span>
            <span>
              {categories.find(c => c.id === factory.category)?.name}
            </span>
          </div>
          <p className="mt-3 text-gray-600 line-clamp-2">{factory.description}</p>
        </div>
        <Button 
          variant="outline"
          className="shrink-0 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          <span>查看详情</span>
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {Array.isArray(factory.products) && factory.products.map(product => (
          <span
            key={product}
            className="bg-gray-50 text-gray-700 text-sm px-3 py-1.5 rounded-full border border-gray-100"
          >
            {product}
          </span>
        ))}
      </div>
    </div>
  );
}