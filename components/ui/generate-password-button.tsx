'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Copy, Check } from 'lucide-react';


export default function GeneratePasswordButton() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  // 随机密码生成函数
  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let pass = '';
    for (let i = 0; i < 12; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
    setShowPassword(true);
    setCopied(false); // 新密码生成后，重置复制状态
  };

  // 复制密码到剪贴板
  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2秒后恢复复制按钮状态
    }
  };

  return (
    <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
      <Button
        size="lg"
        variant="outline"
        className="text-lg rounded-full"
        onClick={generatePassword}
      >
        点击生成专属密码
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>

      {showPassword && (
        <div className="inline-flex items-center bg-gray-100 px-4 py-2 rounded-md shadow-md">
        <span className="text-lg font-mono mr-4">{password}</span>
        <Button variant="ghost" onClick={copyToClipboard} className="flex items-center">
          {copied ? (
            <>
              <Check className="text-green-500 w-5 h-5 mr-1" />
              已复制
            </>
          ) : (
            <>
              <Copy className="w-5 h-5 mr-1" />
              复制
            </>
          )}
        </Button>
      </div>
      )}
    </div>
  );
}
