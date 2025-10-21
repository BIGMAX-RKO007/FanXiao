'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

export default function ContactMe() {
  const [copied, setCopied] = useState(false);

  const qqNumber = '369246926';

  const handleCopy = () => {
    navigator.clipboard.writeText(qqNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-300 max-w-xs text-center">
      <h3 className="mb-2 font-semibold text-lg">微信二维码</h3>
      <img
        src="/wechat-qrcode.png"
        alt="微信二维码"
        className="mx-auto mb-4 w-36 h-36 object-contain"
      />
      
      {/* 这里用 flex 一行排列 QQ号和复制按钮 */}
      <div className="flex items-center justify-center gap-3 mb-2 cursor-default select-text">
        <span className="text-lg font-medium">QQ号: {qqNumber}</span>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="flex items-center gap-1"
        >
          {copied ? (
            <>
              <Check className="text-green-500 w-5 h-5" />
              已复制
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              复制
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
