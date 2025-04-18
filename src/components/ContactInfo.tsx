import React from 'react';
import { MapPin, Phone, Mail, Globe, Clock } from 'lucide-react';

/**
 * 联系信息组件
 * 
 * @future API依赖:
 * - GET /api/manufacturers/[id]/contact - 获取联系方式
 * - GET /api/manufacturers/[id]/business-hours - 获取营业时间
 * 
 * @param address - 地址
 * @param phone - 电话
 * @param email - 邮箱
 * @param website - 网站
 */
interface ContactInfoProps {
  address: string;
  phone: string;
  email: string;
  website?: string;
}

export default function ContactInfo({ address, phone, email, website }: ContactInfoProps) {
  return (
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
  );
}