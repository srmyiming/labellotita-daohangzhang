import React from 'react';
import { Factory } from '../../types';
import { Loader2 } from 'lucide-react';
import { FactoryDetailHeader } from './detail/FactoryDetailHeader';
import { FactoryDetailContent } from './detail/FactoryDetailContent';
import { FactoryDetailSidebar } from './detail/FactoryDetailSidebar';

interface FactoryDetailProps {
  factory: Factory | undefined;
  onBack: () => void;
  loading?: boolean;
}

export default function FactoryDetail({ factory, onBack, loading = false }: FactoryDetailProps) {
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-500">正在加载制造商信息...</p>
        </div>
      </div>
    );
  }
  
  if (!factory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">未找到制造商信息</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <FactoryDetailHeader factory={factory} onBack={onBack} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <FactoryDetailContent factory={factory} />
          <FactoryDetailSidebar factory={factory} />
        </div>
      </div>
    </div>
  );
}