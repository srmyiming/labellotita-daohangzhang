import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { MessageCircle, Phone } from 'lucide-react';

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactDialog({ open, onOpenChange }: ContactDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">扫码添加企业微信</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex flex-col items-center">
            <iframe 
              src="https://work.weixin.qq.com/ca/cawcde6080938f97bf"
              className="w-[280px] h-[380px] border-0"
            />
            <p className="text-sm text-gray-500 mt-4 text-center">
              扫描上方二维码，添加客服微信
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}