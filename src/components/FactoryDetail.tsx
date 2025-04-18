import { Factory } from '../types';
import BreadcrumbNav from './factory/BreadcrumbNav';
import FactoryBasicInfo from './factory/FactoryBasicInfo';
import FactoryTabs from './factory/FactoryTabs';
import PurchaseServiceCard from './PurchaseServiceCard';
import { 
  Loader2, 
  CheckCircle, 
  Award, 
  MapPin, 
  Tag,
  Mail,
  Phone,
  Globe,
  Clock
} from 'lucide-react';
import { Button } from './ui/button';

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

  // 提取第一张图片作为主图，其余作为画廊图片
  const mainImage = factory.factoryImages?.[0] || '/images/factory-placeholder.jpg';
  const galleryImages = factory.factoryImages?.slice(1) || [];

  return (
    <div className="min-h-screen">
      {/* 顶部导航 */}
      <BreadcrumbNav factoryName={factory.name} onBack={onBack} />

      {/* 主图区域 - 全宽背景 */}
      <div className="relative h-64 md:h-80 lg:h-96 w-full overflow-hidden bg-gray-100">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${mainImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              {factory.verified && (
                <span className="inline-flex items-center bg-green-500/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-sm text-white border border-green-500/30">
                  <CheckCircle className="h-4 w-4 mr-1.5" />
                  已认证企业
                </span>
              )}
              {factory.manufacturer_certifications && factory.manufacturer_certifications.length > 0 && (
                <span className="inline-flex items-center bg-blue-500/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-sm text-white border border-blue-500/30">
                  <Award className="h-4 w-4 mr-1.5" />
                  {factory.manufacturer_certifications.length} 项认证
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold drop-shadow-sm">{factory.name}</h1>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 左侧主要内容 */}
            <div className="flex-1 space-y-8">
              {/* 图片画廊 */}
              {galleryImages.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">工厂图片</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {galleryImages.map((img, index) => (
                      <div 
                        key={index} 
                        className="aspect-square rounded-lg overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity cursor-pointer"
                        onClick={() => window.open(img, '_blank')}
                      >
                        <img 
                          src={img} 
                          alt={`${factory.name} 图片 ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <FactoryBasicInfo 
                description={factory.description}
                manufacturer_tags={factory.manufacturer_tags}
                manufacturer_certifications={factory.manufacturer_certifications}
                foundedYear={factory.founded_year}
                employeeCount={factory.employee_count}
                annualProduction={factory.annual_production}
                dailyProduction={factory.daily_production}
                storageCapacity={factory.storage_capacity}
                productionLines={factory.production_lines}
                updatedAt={factory.updated_at}
                manufacturer_export_countries={factory.manufacturer_export_countries}
              />

              <FactoryTabs factory={factory} />
            </div>

            {/* 右侧信息 */}
            <div className="w-full lg:w-[360px] space-y-6 lg:pt-0 pt-4">
              <div className="sticky top-6">
                <PurchaseServiceCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}