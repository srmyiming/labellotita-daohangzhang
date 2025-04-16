import React, { useState } from 'react';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';
import ContactDialog from './ContactDialog';

export default function FloatingContact() {
  const [showContact, setShowContact] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-50">
      <button 
        className="bg-gradient-to-r from-red-500 to-red-600 w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all group border-2 border-white hover:scale-110 animate-bounce"
        onClick={() => setShowContact(true)}
      >
        <MessageCircle className="w-8 h-8 text-white" />
        <span className="sr-only">微信联系</span>
      </button>
      
      <button 
        className="bg-gradient-to-r from-red-500 to-red-600 w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all group border-2 border-white hover:scale-110"
        onClick={() => setShowContact(true)}
      >
        <Phone className="w-8 h-8 text-white" />
        <span className="sr-only">电话联系</span>
      </button>
      
      <button 
        className="bg-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all group border border-gray-100 hover:scale-110"
        onClick={scrollToTop}
      >
        <ArrowUp className="w-8 h-8 text-gray-600 group-hover:text-red-600 transition-colors" />
        <span className="sr-only">回到顶部</span>
      </button>
      
      <ContactDialog open={showContact} onOpenChange={setShowContact} />
    </div>
  );
}