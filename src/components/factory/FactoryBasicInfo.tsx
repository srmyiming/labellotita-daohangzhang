import { Calendar, Users, Clock, Globe, Factory, Box, Scale, Truck, Award, CheckCircle2 } from 'lucide-react';

interface FactoryBasicInfoProps {
  description: string;
  manufacturer_tags?: Array<{ tags: { name: string } }>;
  manufacturer_certifications?: Array<{
    name: string;
    issue_date: string;
    expiry_date: string;
  }>;
  manufacturer_export_countries?: Array<{
    country_code: string;
  }>;
  certifications?: {
    name: string;
    issue_date: string;
    expiry_date: string;
  }[];
  foundedYear?: number;
  employeeCount?: number;
  annualProduction?: string;
  dailyProduction?: string;
  storageCapacity?: string;
  productionLines?: number;
  updatedAt?: string;
  exportCountries?: { country_code: string }[];
}

export function FactoryBasicInfo({ 
  description, 
  manufacturer_tags,
  manufacturer_certifications,
  foundedYear,
  employeeCount,
  annualProduction,
  dailyProduction,
  storageCapacity,
  productionLines,
  updatedAt,
  manufacturer_export_countries
}: FactoryBasicInfoProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-lg font-semibold mb-4">基本信息</h2>
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <p className="text-gray-600 whitespace-pre-line">{description}</p>
      </div>
      
      {/* 生产能力信息 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">生产能力</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {annualProduction && (
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
              <Scale className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-500">年产量</p>
                <p className="font-medium">{annualProduction}</p>
              </div>
            </div>
          )}
          
          {dailyProduction && (
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
              <Factory className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-500">日产量</p>
                <p className="font-medium">{dailyProduction}</p>
              </div>
            </div>
          )}
          
          {storageCapacity && (
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
              <Box className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-500">仓储容量</p>
                <p className="font-medium">{storageCapacity}</p>
              </div>
            </div>
          )}
          
          {productionLines && (
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
              <Truck className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-500">生产线数量</p>
                <p className="font-medium">{productionLines}条</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 认证与标签 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">认证与标签</h3>
        {manufacturer_tags && manufacturer_tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {manufacturer_tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center bg-red-50 text-red-700 px-3 py-1.5 rounded-full text-sm hover:bg-red-100 transition-colors"
              >
                {tag.tags.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">暂无标签信息</p>
        )}
      </div>
      
      {/* 认证信息 */}
      {manufacturer_certifications && manufacturer_certifications.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-red-600" />
            认证信息
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {manufacturer_certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium">{cert.name}</p>
                  <div className="text-sm text-gray-500">
                    <p>发证日期: {new Date(cert.issue_date).toLocaleDateString()}</p>
                    {cert.expiry_date && (
                      <p>有效期至: {new Date(cert.expiry_date).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
        {foundedYear && (
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">成立于</p>
              <p className="font-medium">{foundedYear}</p>
            </div>
          </div>
        )}
        
        {employeeCount && (
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">员工数量</p>
              <p className="font-medium">{employeeCount}</p>
            </div>
          </div>
        )}
        
        {updatedAt && (
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">最近更新</p>
              <p className="font-medium">{updatedAt}</p>
            </div>
          </div>
        )}
      </div>

      {manufacturer_export_countries && manufacturer_export_countries.length > 0 && (
        <div className="pt-6">
          <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
            <Globe className="h-5 w-5 text-red-600" />
            出口国家
          </h3>
          <div className="flex flex-wrap gap-2">
            {manufacturer_export_countries.map((country, index) => (
              <span 
                key={index} 
                className="inline-flex items-center bg-gray-50 px-3 py-1.5 rounded-full text-sm"
              >
                {country.country_code}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FactoryBasicInfo