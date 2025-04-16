import React from 'react';
import { Phone, Mail, Globe } from 'lucide-react';
import { Button } from '../ui/button';

interface FactoryContactCardProps {
  phone?: string;
  email?: string;
  website?: string;
}

export function FactoryContactCard({ phone, email, website }: FactoryContactCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold mb-6">联系方式</h3>
      
      <div className="space-y-4">
        {phone && (
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
            <Phone className="h-5 w-5 text-red-600" />
            <div>
              <div className="text-sm text-gray-500">电话</div>
              <div>{phone}</div>
            </div>
          </div>
        )}
        
        {email && (
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
            <Mail className="h-5 w-5 text-red-600" />
            <div>
              <div className="text-sm text-gray-500">邮箱</div>
              <div>{email}</div>
            </div>
          </div>
        )}
        
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
      </div>
      
      <Button 
        className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
      >
        立即联系
      </Button>
    </div>
  );
}