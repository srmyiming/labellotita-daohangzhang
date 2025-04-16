import React from 'react';
import { CheckCircle } from 'lucide-react';

interface Product {
  name: string;
  description: string;
}

interface FactoryProductTabProps {
  products?: Product[];
}

export default function FactoryProductTab({ products = [] }: FactoryProductTabProps) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">产品列表</h2>
      
      {products.length > 0 ? (
        <div className="space-y-4">
          {products.map((product, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">暂无产品信息</p>
        </div>
      )}
      
      <div className="mt-8 bg-yellow-50 border border-yellow-100 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          注意：产品详情和规格可能会随时更新，请联系制造商获取最新产品信息。
        </p>
      </div>
    </div>
  );
}