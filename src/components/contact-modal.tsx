import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Phone, Mail, MapPin, Globe, Clock } from 'lucide-react';

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  website: string;
  workingHours: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactInfo: ContactInfo;
  title: string;
}

export default function ContactModal({ isOpen, onClose, contactInfo, title }: ContactModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-start space-x-3">
            <Phone className="w-5 h-5 text-red-600" />
            <div>
              <p className="font-medium">电话</p>
              <p className="text-sm text-gray-600">{contactInfo.phone}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-red-600" />
            <div>
              <p className="font-medium">电子邮箱</p>
              <p className="text-sm text-gray-600">{contactInfo.email}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-red-600" />
            <div>
              <p className="font-medium">地址</p>
              <p className="text-sm text-gray-600">{contactInfo.address}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Globe className="w-5 h-5 text-red-600" />
            <div>
              <p className="font-medium">网站</p>
              <p className="text-sm text-gray-600">{contactInfo.website}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-red-600" />
            <div>
              <p className="font-medium">营业时间</p>
              <p className="text-sm text-gray-600 whitespace-pre-line">{contactInfo.workingHours}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={onClose}>关闭</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}