import React from 'react';
import { MapPin, Phone, Mail, Globe, Clock } from 'lucide-react';
import { Button } from '../../ui/button';
import { Factory } from '../../../types';

interface ContactTabProps {
  factory: Factory;
}

export default function ContactTab({ factory }: ContactTabProps) {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">联系信息</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
              <MapPin className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-sm text-gray-500">地址</div>
                <div>{factory.address}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
              <Phone className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-sm text-gray-500">电话</div>
                <div>{factory.phone}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
              <Mail className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-sm text-gray-500">邮箱</div>
                <div>{factory.email}</div>
              </div>
            </div>
            
            {factory.website && (
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
                <Globe className="h-5 w-5 text-red-600" />
                <div>
                  <div className="text-sm text-gray-500">网站</div>
                  <a 
                    href={`https://${factory.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700"
                  >
                    {factory.website}
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
          <div className="aspect-square bg-gray-100 rounded-lg"></div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">查看大图</Button>
            <Button variant="outline" className="flex-1">获取路线</Button>
          </div>
        </div>
      </div>
    </div>
  );
}