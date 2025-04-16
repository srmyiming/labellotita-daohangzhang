import React from 'react';
import { CheckCircle, MapPin, Phone, Download, Tag } from 'lucide-react';
import { Button } from '../ui/button';
import { categories } from '../../data';

interface FactoryHeaderProps {
  name: string;
  address: string;
  verified?: boolean;
  category?: string;
}

export function FactoryHeader({ name, address, verified, category }: FactoryHeaderProps) {
  const categoryName = categories.find(c => c.id === category)?.name;

  return (
    <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{name}</h1>
            {verified && (
              <span className="inline-flex items-center bg-green-50 dark:bg-green-900/20 px-2.5 py-0.5 rounded-full text-sm text-green-700 dark:text-green-300">
                <CheckCircle className="h-4 w-4 mr-1.5" />
                已认证
              </span>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {address}
            </p>
            {categoryName && (
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                <Tag className="h-4 w-4" />
                分类: {categoryName}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex-1 md:flex-none">
            <Phone className="h-4 w-4 mr-2" />
            联系方式
          </Button>
          <Button className="flex-1 md:flex-none bg-primary text-primary-foreground hover:bg-primary/90">
            <Download className="h-4 w-4 mr-2" />
            产品目录
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FactoryHeader