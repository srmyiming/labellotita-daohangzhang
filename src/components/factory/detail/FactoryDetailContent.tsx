import React from 'react';
import { Factory } from '../../../types';
import { FactoryBasicInfo } from '../FactoryBasicInfo';
import { FactoryTabs } from '../FactoryTabs';

interface FactoryDetailContentProps {
  factory: Factory;
}

export function FactoryDetailContent({ factory }: FactoryDetailContentProps) {
  // 格式化更新时间
  const formattedUpdateTime = factory.updated_at ? 
    new Date(factory.updated_at).toLocaleDateString('zh-CN') : undefined;

  return (
    <div className="flex-1 space-y-6">
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
        updatedAt={formattedUpdateTime}
        manufacturer_export_countries={factory.manufacturer_export_countries}
      />
      
      <FactoryTabs factory={factory} />
    </div>
  );
}