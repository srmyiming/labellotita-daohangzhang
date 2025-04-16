import React from 'react';

export default function ManufacturerCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-yellow-500 opacity-5 transform rotate-12 scale-150"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          您是食品制造商吗？
        </h2>
        <p className="text-gray-300 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
          加入我们的目录，提高您企业的知名度。与分销商和潜在客户建立联系。
        </p>
        <button className="bg-gradient-to-r from-yellow-500 to-red-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-yellow-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
          注册您的企业
        </button>
      </div>
    </section>
  );
}