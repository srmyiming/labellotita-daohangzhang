import React from 'react';
import { Factory } from '../types';
import BreadcrumbNav from './factory/BreadcrumbNav';
import FactoryHeader from './factory/FactoryHeader';
import FactoryBasicInfo from './factory/FactoryBasicInfo';
import FactoryTabs from './factory/FactoryTabs';
import PurchaseServiceCard from './PurchaseServiceCard';
import FloatingContact from './FloatingContact';
import { Loader2 } from 'lucide-react';

/**
 * 制造商详情组件
 * 
 * @future API依赖:
 * - GET /api/manufacturers/[id] - 获取制造商详细信息
 * - GET /api/manufacturers/[id]/images - 获取制造商所有图片
 * - GET /api/manufacturers/[id]/products - 获取制造商产品列表
 * - GET /api/manufacturers/[id]/certifications - 获取认证信息
 * 
 * @param factory - 制造商详细信息
 * @param onBack - 返回回调
 */
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
    <div className="min-h-screen">
      <BreadcrumbNav factoryName={factory.name} onBack={onBack} />

      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 左侧主要内容 */}
            <div className="flex-1 space-y-6">
              <FactoryHeader 
                name={factory.name}
                address={factory.address}
                verified={factory.verified}
                category={factory.category}
              />
              
              <FactoryBasicInfo 
                description={factory.description}
                tags={factory.manufacturer_tags?.map(mt => mt.tags.name)}
              />

              <FactoryTabs factory={factory} />
            </div>

            {/* 右侧信息 */}
            <div className="w-full lg:w-[360px] space-y-6">
              <PurchaseServiceCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}