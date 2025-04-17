import React, { useState } from 'react';
import { MapPin, Phone, Mail, Globe, Clock } from 'lucide-react';
import { Button } from './ui/button';

/**
 * 联系信息组件
 * 
 * @future API依赖:
 * - GET /api/manufacturers/[id]/contact - 获取联系方式
 * - GET /api/manufacturers/[id]/location - 获取地理位置信息
 * - GET /api/manufacturers/[id]/business-hours - 获取营业时间
 * 
 * @param address - 地址
 * @param phone - 电话
 * @param email - 邮箱
 * @param website - 网站
 * @param region - 区域
 */
interface ContactInfoProps {
  address: string;
  phone: string;
  email: string;
  website?: string;
  region?: string | null;
}

export default function ContactInfo({ address, phone, email, website, region }: ContactInfoProps) {
  const [imgError, setImgError] = useState(false);

  // 根据 region 构建 SVG 图片 URL
  let regionImageSrc = '/images/regions/default.svg';
  
  if (region && !imgError) {
    if (region === 'madrid') {
      regionImageSrc = '/images/regions/spain-madrid.svg';
    } else if (region === 'castilla') {
      regionImageSrc = '/images/regions/castilla.svg';
    } else {
      // 如果有其他地区，可以继续添加条件
      // 例如: else if (region === 'barcelona') { ... }
    }
  }

  // 图片加载失败时的处理函数
  const handleImageError = () => {
    console.error(`无法加载地区图片: ${regionImageSrc}`);
    setImgError(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">联系信息</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
            <MapPin className="h-5 w-5 text-red-600" />
            <div>
              <div className="text-sm text-gray-500">地址</div>
              <div>{address}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
            <Phone className="h-5 w-5 text-red-600" />
            <div>
              <div className="text-sm text-gray-500">电话</div>
              <div>{phone}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
            <Mail className="h-5 w-5 text-red-600" />
            <div>
              <div className="text-sm text-gray-500">邮箱</div>
              <div>{email}</div>
            </div>
          </div>
          
          {website && (
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
              <Globe className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-sm text-gray-500">网站</div>
                <a 
                  href={`https://${website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-700"
                >
                  {website}
                </a>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
            <Clock className="h-5 w-5 text-red-600" />
            <div>
              <div className="text-sm text-gray-500">营业时间</div>
              <div>周一 - 周五: 9:00 - 18:00</div>
              <div>周六: 9:00 - 14:00</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">工厂位置</h3>
        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100"> 
          <img 
            src={regionImageSrc}
            alt={region ? `${region} 地区地图` : '默认地图'} 
            className="w-full h-full object-contain" // 对于 SVG 使用 object-contain 更合适
            onError={handleImageError} // 添加错误处理
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => window.open(regionImageSrc, '_blank')}
          >
            查看大图
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => window.open(`https://map.baidu.com/search/${encodeURIComponent(address)}`, '_blank')}
          >
            获取路线
          </Button>
        </div>
      </div>
    </div>
  );
}