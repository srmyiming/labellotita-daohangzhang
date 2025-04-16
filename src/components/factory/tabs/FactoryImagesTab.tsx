import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FactoryImagesTabProps {
  images?: string[];
}

export default function FactoryImagesTab({ images = [] }: FactoryImagesTabProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex(prev => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  }, [images.length]);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex(prev => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  }, [images.length]);

  const handleThumbnailClick = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  return (
    <div className="p-6">
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-6">🏭 工厂实景</h2>
          <div className="relative">
            <div className="aspect-[16/9] rounded-lg overflow-hidden">
              <img 
                src={images[currentImageIndex] || "https://images.unsplash.com/photo-1581091226825-c6a89e7e4801?w=800&auto=format&fit=crop"} 
                alt="工厂生产线" 
                className="w-full h-full object-cover transition-transform duration-500" 
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 shadow-lg transition-all duration-300 ${
                    index === currentImageIndex ? 'border-red-500 scale-105' : 'border-white'
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img 
                    src={img} 
                    alt={`工厂图片 ${index + 1}`} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
            <button 
              onClick={handlePrevImage}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={handleNextImage}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}