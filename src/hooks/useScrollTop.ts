import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // 直接跳转到顶部，移除平滑滚动
  }, [pathname]); // 当路径改变时触发
} 