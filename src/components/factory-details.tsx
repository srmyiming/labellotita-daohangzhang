import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface FactoryDetailsProps {
  images: string[];
}

export default function FactoryDetails({ images }: FactoryDetailsProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="aspect-square relative">
              <img src={image} alt={`工厂图片 ${index + 1}`} className="object-cover w-full h-full" />
            </div>
          </Card>
        ))}
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">认证信息</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Badge variant="outline" className="justify-center py-2">
            ISO 9001:2015
          </Badge>
          <Badge variant="outline" className="justify-center py-2">
            HACCP
          </Badge>
          <Badge variant="outline" className="justify-center py-2">
            有机认证
          </Badge>
          <Badge variant="outline" className="justify-center py-2">
            清真认证
          </Badge>
          <Badge variant="outline" className="justify-center py-2">
            FDA 注册
          </Badge>
          <Badge variant="outline" className="justify-center py-2">
            欧盟有机标志
          </Badge>
        </div>
      </div>
    </div>
  );
}