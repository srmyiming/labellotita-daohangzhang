import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 lg:mb-0">
            <h3 className="text-white text-lg font-semibold mb-4">西班牙781食品</h3>
            <p className="text-sm">最全面的西班牙食品制造商目录。</p>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/categories" className="hover:text-white">分类</Link></li>
              <li><Link to="/manufacturers" className="hover:text-white">制造商</Link></li>
              <li><Link to="/categories" className="hover:text-white">制造商地图</Link></li>
              <li><Link to="/about" className="hover:text-white">博客</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">信息</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white">关于我们</Link></li>
              <li><Link to="/contact" className="hover:text-white">联系我们</Link></li>
              <li><Link to="/about" className="hover:text-white">隐私政策</Link></li>
              <li><Link to="/about" className="hover:text-white">使用条款</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">联系方式</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                info@directorioalimentos.es
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +34 91 123 45 67
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                马德里，西班牙
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p className="text-sm text-gray-400 text-center">
            © 2025 西班牙781食品。保留所有权利。
          </p>
        </div>
      </div>
    </footer>
  );
}