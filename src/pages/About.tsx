import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Building2, 
  Users, 
  Globe2, 
  ShieldCheck, 
  Truck, 
  FileText,
  CheckCircle2,
  BarChart3,
  Building,
  Handshake
} from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={() => {}} />
      
      {/* 主横幅 */}
      <div className="relative bg-gradient-to-r from-red-600 to-yellow-600 py-24">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              连接中国与西班牙的食品贸易桥梁
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              我们致力于为中国采购商提供最优质的西班牙食品制造商资源，打造安全、便捷、高效的一站式采购服务平台
            </p>
          </div>
        </div>
      </div>

      {/* 关于我们 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">关于我们</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              作为专业的西班牙食品贸易服务平台，我们拥有丰富的行业经验和广泛的合作网络，为中国采购商提供全方位的支持。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border hover:shadow-lg transition-shadow">
              <Building2 className="w-12 h-12 text-red-600 mb-6" />
              <h3 className="text-xl font-semibold mb-4">专业团队</h3>
              <p className="text-gray-600">
                我们的团队由资深的食品行业专家组成，熟悉中西方市场，能够为您提供专业的采购建议。
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border hover:shadow-lg transition-shadow">
              <Globe2 className="w-12 h-12 text-red-600 mb-6" />
              <h3 className="text-xl font-semibold mb-4">广泛网络</h3>
              <p className="text-gray-600">
                与西班牙各地优质食品制造商建立长期合作关系，确保采购源头的可靠性。
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border hover:shadow-lg transition-shadow">
              <ShieldCheck className="w-12 h-12 text-red-600 mb-6" />
              <h3 className="text-xl font-semibold mb-4">品质保证</h3>
              <p className="text-gray-600">
                严格的供应商筛选标准，确保每个合作制造商都具备相应的资质认证。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 我们的服务 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">我们的服务</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              为中国采购商提供全流程的一站式服务，让跨境采购变得简单高效
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-red-50 p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">样品寄送安排</h3>
                  <p className="text-gray-600">
                    协助安排样品寄送，让您在采购前充分了解产品品质
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-red-50 p-3 rounded-lg">
                  <Truck className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">拼柜与集中采购</h3>
                  <p className="text-gray-600">
                    提供拼柜服务，帮助小批量采购降低物流成本
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-red-50 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">专人对接服务</h3>
                  <p className="text-gray-600">
                    配备专业客服团队，提供一对一贴心服务
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-red-50 p-3 rounded-lg">
                  <Building className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">实地验厂支持</h3>
                  <p className="text-gray-600">
                    提供实地考察或视频看货服务，确保采购决策的准确性
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 为什么选择我们 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">为什么选择我们</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我们的优势让您的采购更加安心、便捷
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">严格筛选</h3>
              <p className="text-gray-600">
                所有制造商经过严格审核，确保资质齐全
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">透明报价</h3>
              <p className="text-gray-600">
                采购价格透明公开，无隐藏费用
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">资源丰富</h3>
              <p className="text-gray-600">
                覆盖西班牙各大食品产区，选择多样
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Handshake className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">一站服务</h3>
              <p className="text-gray-600">
                从选品到通关，全程专业服务
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 联系我们 CTA */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-yellow-600 relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-6">开启您的采购之旅</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              我们的专业团队随时为您提供支持，让我们一起开创美好的合作未来
            </p>
            <button className="bg-white text-red-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
              立即联系我们
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}