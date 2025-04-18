import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

export function PurchaseServiceCard() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 sticky top-28 z-20">
      <div className="space-y-6">
        <div>
          <h2 className="flex items-center text-xl font-semibold mb-6">
            <span className="text-yellow-500 mr-2">🤝</span>
            我们可为中国采购方提供：
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
              样品寄送安排
            </li>
            <li className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
              拼柜与集中采购服务
            </li>
            <li className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
              专人对接工厂销售负责人
            </li>
            <li className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
              实地验厂/视频看货支持
            </li>
            <li className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
              一站式进口代理服务
            </li>
            <li className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
              中文资料翻译与整理
            </li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100/50">
          <p className="flex items-start text-gray-700">
            <span className="text-yellow-500 mr-2">👉</span>
            我们与西班牙当地食品协会合作，为中国采购商提供一站式服务，确保您的采购过程顺利无忧。
          </p>
        </div>

        <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg py-6 rounded-xl font-semibold">
          获取产品报价
        </Button>
      </div>
    </div>
  );
}

export default PurchaseServiceCard;