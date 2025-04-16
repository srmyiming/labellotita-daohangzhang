import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Factory } from '../../types';
import CatalogTab from './tabs/CatalogTab';
import FactoryImagesTab from './tabs/FactoryImagesTab';
import ContactTab from './tabs/ContactTab';
import FactoryProductTab from './tabs/FactoryProductTab';

interface FactoryTabsProps {
  factory: Factory;
}

export function FactoryTabs({ factory }: FactoryTabsProps) {
  return (
    <div className="bg-card rounded-xl shadow-sm border border-border">
      <Tabs defaultValue="products" className="w-full">
        <div className="border-b border-border px-6">
          <TabsList className="flex w-full gap-8 bg-transparent">
            <TabsTrigger 
              value="products" 
              className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-4 py-3"
            >
              产品列表
            </TabsTrigger>
            <TabsTrigger 
              value="catalogo" 
              className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-4 py-3"
            >
              产品目录
            </TabsTrigger>
            <TabsTrigger 
              value="factory" 
              className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-4 py-3"
            >
              工厂详情
            </TabsTrigger>
            <TabsTrigger 
              value="contact" 
              className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-4 py-3"
            >
              联系方式
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="products">
          <FactoryProductTab products={
            // 尝试从几个可能的来源获取产品信息
            // 1. 首先尝试从静态数据结构获取格式化的产品列表
            Array.isArray((factory as any).staticData?.products) 
              ? (factory as any).staticData.products 
              // 2. 然后尝试获取实际API返回的产品列表
              : Array.isArray(factory.manufacturer_products) 
                ? factory.manufacturer_products 
                // 3. 最后尝试将字符串产品列表转换为所需格式
                : factory.products?.map(name => ({ name, description: "" })) || []
          } />
        </TabsContent>

        <TabsContent value="catalogo">
          <CatalogTab pdfUrl={factory.catalog_pdf_url} />
        </TabsContent>

        <TabsContent value="factory">
          <FactoryImagesTab images={factory.factoryImages} />
        </TabsContent>

        <TabsContent value="contact">
          <ContactTab factory={factory} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default FactoryTabs