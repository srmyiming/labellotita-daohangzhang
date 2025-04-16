import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Globe, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('消息已发送，我们会尽快与您联系！');
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={() => {}} />
      
      {/* 主横幅 */}
      <div className="relative bg-gradient-to-r from-red-600 to-yellow-600 py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              联系我们
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              无论您有任何问题或需求，我们都随时准备为您提供专业的支持和服务
            </p>
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 联系信息 */}
          <div>
            <h2 className="text-2xl font-bold mb-8">联系方式</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-red-50 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">电话咨询</h3>
                  <p className="text-gray-600">+34 91 123 45 67</p>
                  <p className="text-sm text-gray-500 mt-1">
                    周一至周五: 9:00 - 18:00 (西班牙时间)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-red-50 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">电子邮件</h3>
                  <p className="text-gray-600">info@directorioalimentos.es</p>
                  <p className="text-sm text-gray-500 mt-1">
                    24小时内回复
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-red-50 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">办公地址</h3>
                  <p className="text-gray-600">马德里市中心商务区</p>
                  <p className="text-sm text-gray-500 mt-1">
                    欢迎预约参观
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-red-50 p-3 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">微信咨询</h3>
                  <p className="text-gray-600">扫描二维码添加客服</p>
                  <div className="mt-4">
                    <iframe 
                      src="https://work.weixin.qq.com/ca/cawcde6080938f97bf"
                      className="w-32 h-32 border-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 联系表单 */}
          <div>
            <h2 className="text-2xl font-bold mb-8">发送消息</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    姓名
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    公司名称
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    电子邮件
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    电话号码
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  消息内容
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                ></textarea>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300"
              >
                发送消息
              </Button>
            </form>
          </div>
        </div>
        
        {/* 地图 */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">我们的位置</h2>
          <div className="aspect-[21/9] bg-gray-100 rounded-xl overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12147.354400147904!2d-3.703510387939453!3d40.41677900000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42287d6da3df33%3A0x6e5b9f56784e14a3!2sMadrid%2C%20Spain!5e0!3m2!1sen!2sus!4v1650116241012!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}