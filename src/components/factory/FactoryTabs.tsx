import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Factory } from '../../types';
import CatalogTab from './tabs/CatalogTab';
import FactoryImagesTab from './tabs/FactoryImagesTab';
import ContactTab from './tabs/ContactTab';

interface FactoryTabsProps {
  factory: Factory;
}

export function FactoryTabs({ factory }: FactoryTabsProps) {
  return (
    <div className="bg-card rounded-xl shadow-sm border border-border">
      <Tabs defaultValue="catalogo" className="w-full">
        <div className="border-b border-border px-6">
          <TabsList className="flex w-full gap-8 bg-transparent">
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