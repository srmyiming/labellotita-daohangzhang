import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Building2, 
  Globe2, 
  ShieldCheck,
  Search,
  MessageSquareQuote,
  ClipboardCheck,
  Ship,
  Warehouse,
  Wallet,
  HeadphonesIcon,
  Users,
  Target,
  TrendingUp,
  Award,
  Clock,
  CheckCircle2
} from 'lucide-react';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={() => {}} />
      
      {/* 主横幅 - 使用更现代的设计 */}
      <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:60px_60px]"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              连接中国与西班牙的<br />
              <span className="text-yellow-300">优质食品贸易桥梁</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light">
              我们致力于为中国采购商提供最优质的西班牙食品制造商资源，
              打造<span className="font-medium">安全</span>、<span className="font-medium">便捷</span>、<span className="font-medium">高效</span>的一站式采购服务平台
            </p>
          </div>
        </div>
      </div>

      {/* 数据统计 */}
      <div className="relative -mt-12 z-10 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:-translate-y-1 transition-all">
            <div className="text-4xl font-bold text-red-600 mb-2">200+</div>
            <div className="text-gray-600">合作制造商</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:-translate-y-1 transition-all">
            <div className="text-4xl font-bold text-red-600 mb-2">98%</div>
            <div className="text-gray-600">客户满意度</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:-translate-y-1 transition-all">
            <div className="text-4xl font-bold text-red-600 mb-2">15年+</div>
            <div className="text-gray-600">行业经验</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:-translate-y-1 transition-all">
            <div className="text-4xl font-bold text-red-600 mb-2">1000+</div>
            <div className="text-gray-600">成功案例</div>
          </div>
        </div>
      </div>

      {/* 关于我们 */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">为什么选择我们</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              作为专业的西班牙食品贸易服务平台，我们以专业、诚信、高效为核心，
              为您提供全方位的跨境贸易解决方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border hover:shadow-xl transition-all duration-300 group">
              <div className="bg-red-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
                <Users className="w-8 h-8 text-red-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-4">专业团队</h3>
              <p className="text-gray-600 leading-relaxed">
                我们的团队由资深的食品行业专家组成，拥有丰富的跨境贸易经验，熟悉中西方市场规则和文化差异。
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border hover:shadow-xl transition-all duration-300 group">
              <div className="bg-red-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
                <Target className="w-8 h-8 text-red-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-4">精准对接</h3>
              <p className="text-gray-600 leading-relaxed">
                根据您的具体需求，为您精准匹配最合适的西班牙食品制造商，节省筛选时间，提高采购效率。
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border hover:shadow-xl transition-all duration-300 group">
              <div className="bg-red-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
                <TrendingUp className="w-8 h-8 text-red-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-4">持续增长</h3>
              <p className="text-gray-600 leading-relaxed">
                不断拓展优质供应商网络，紧跟市场趋势，为您带来更多优质的西班牙食品选择。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 我们的优势 */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">我们的优势</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              六大核心优势，让您的采购更加安心、便捷、高效
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="absolute inset-0.5 bg-gradient-to-r from-red-600 to-yellow-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-white p-8 rounded-xl">
                <Award className="w-12 h-12 text-red-600 mb-6" />
                <h3 className="text-xl font-semibold mb-4">品质保证</h3>
                <p className="text-gray-600">
                  严格的供应商资质审核，确保每个合作制造商都具备相应的认证和资质。
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0.5 bg-gradient-to-r from-red-600 to-yellow-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-white p-8 rounded-xl">
                <Globe2 className="w-12 h-12 text-red-600 mb-6" />
                <h3 className="text-xl font-semibold mb-4">资源网络</h3>
                <p className="text-gray-600">
                  覆盖西班牙各大食品产区，拥有丰富的优质供应商资源网络。
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0.5 bg-gradient-to-r from-red-600 to-yellow-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-white p-8 rounded-xl">
                <Clock className="w-12 h-12 text-red-600 mb-6" />
                <h3 className="text-xl font-semibold mb-4">高效服务</h3>
                <p className="text-gray-600">
                  快速响应客户需求，提供专业的一站式采购解决方案。
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0.5 bg-gradient-to-r from-red-600 to-yellow-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-white p-8 rounded-xl">
                <ShieldCheck className="w-12 h-12 text-red-600 mb-6" />
                <h3 className="text-xl font-semibold mb-4">安全保障</h3>
                <p className="text-gray-600">
                  完善的风险管控体系，保障您的采购安全和资金安全。
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0.5 bg-gradient-to-r from-red-600 to-yellow-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-white p-8 rounded-xl">
                <MessageSquareQuote className="w-12 h-12 text-red-600 mb-6" />
                <h3 className="text-xl font-semibold mb-4">专业咨询</h3>
                <p className="text-gray-600">
                  提供专业的市场分析和采购建议，助您做出最优决策。
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0.5 bg-gradient-to-r from-red-600 to-yellow-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-white p-8 rounded-xl">
                <HeadphonesIcon className="w-12 h-12 text-red-600 mb-6" />
                <h3 className="text-xl font-semibold mb-4">全程支持</h3>
                <p className="text-gray-600">
                  从选品到售后的全流程服务支持，让您无后顾之忧。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 合作流程 */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">简单的合作流程</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              四步轻松开启您的西班牙食品采购之旅
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-red-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">提交需求</h3>
              <p className="text-gray-600 text-center">
                告诉我们您的采购需求和目标
              </p>
              <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-red-200 -translate-y-1/2 transform"></div>
            </div>

            <div className="relative">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-red-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">方案定制</h3>
              <p className="text-gray-600 text-center">
                为您量身定制专业采购方案
              </p>
              <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-red-200 -translate-y-1/2 transform"></div>
            </div>

            <div className="relative">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-red-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">确认执行</h3>
              <p className="text-gray-600 text-center">
                确认方案并开始执行采购计划
              </p>
              <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-red-200 -translate-y-1/2 transform"></div>
            </div>

            <div className="relative">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-red-600">4</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">完成交付</h3>
              <p className="text-gray-600 text-center">
                确保货物安全送达您的手中
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 联系我们 CTA */}
      <section className="py-24 bg-gradient-to-br from-red-600 to-yellow-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:60px_60px]"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">准备好开始了吗？</h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              立即联系我们，开启您的西班牙优质食品采购之旅。我们的专业团队随时准备为您提供支持！
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="bg-white text-red-600 px-12 py-4 rounded-full text-lg font-semibold hover:bg-red-50 transition-all transform hover:-translate-y-1 hover:shadow-lg"
            >
              立即联系我们
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}