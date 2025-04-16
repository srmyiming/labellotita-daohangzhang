import React from 'react';
import { Search, Utensils, Award, Users } from 'lucide-react';

export default function Hero({ onSearch }: { onSearch: (term: string) => void }) {
  return (
    <div className="relative bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 py-32">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">西班牙食品目录</h1>
        <p className="text-2xl text-white mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow">
          在一个平台上找到西班牙最好的食品制造商和产品
        </p>
        
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              className="w-full px-12 py-5 rounded-full shadow-xl text-lg bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="搜索制造商、产品或分类..."
              onChange={(e) => onSearch(e.target.value)}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Search className="h-6 w-6 text-yellow-600" />
            </div>
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl">
              搜索
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-white">
            <Utensils className="h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">优质制造商</h3>
            <p className="text-white/80">严选顶级西班牙食品制造商</p>
          </div>
          <div className="flex flex-col items-center text-white">
            <Award className="h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">品质保证</h3>
            <p className="text-white/80">所有制造商经过严格认证</p>
          </div>
          <div className="flex flex-col items-center text-white">
            <Users className="h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">直接对接</h3>
            <p className="text-white/80">与制造商直接建立联系</p>
          </div>
        </div>
      </div>
    </div>
  );
}