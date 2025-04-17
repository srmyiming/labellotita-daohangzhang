import React from 'react';
import { Factory } from '../../../types';
import ContactInfo from '../../ContactInfo'; // 导入 ContactInfo 组件

interface ContactTabProps {
  factory: Factory;
}

export default function ContactTab({ factory }: ContactTabProps) {
  // 直接使用 ContactInfo 组件，并传递所需的数据
  return (
    <div className="p-6">
      <ContactInfo 
        address={factory.address || '地址未提供'} 
        phone={factory.phone || '电话未提供'}
        email={factory.email || '邮箱未提供'}
        website={factory.website}
        region={factory.region} // 传递 region 数据
      />
    </div>
  );
}