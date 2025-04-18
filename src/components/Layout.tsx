// src/components/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingContact from './FloatingContact';
import { useScrollTop } from '../hooks/useScrollTop';

const Layout: React.FC = () => {
  // 在布局组件中使用 useScrollTop，这样所有页面都会自动滚动到顶部
  useScrollTop();

  // 注意：Header 的 onSearch 功能需要通过其他方式处理，
  // 可能需要状态管理库或 Context API 在布局和页面间共享状态和回调。
  // 暂时移除 onSearch 属性，后续可以根据需要添加。
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header onSearch={() => {}} /> 
      <FloatingContact />
      <main className="flex-grow">
        <Outlet /> {/* 子路由对应的页面组件将在这里渲染 */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
