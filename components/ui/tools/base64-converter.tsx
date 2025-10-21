'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy, ArrowDown, ArrowUp } from 'lucide-react';

export default function Base64Converter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const encode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
    } catch (e) {
      setOutput('编码失败，请检查输入');
    }
  };

  const decode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
    } catch (e) {
      setOutput('解码失败，请检查 Base64 格式');
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setCopied(false);
  };

  return (
    <div className="w-full space-y-4">
      {/* 输入区域 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          输入内容
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入文本或 Base64 编码..."
          className="w-full h-24 px-4 py-3 text-sm font-mono bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
        />
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={encode}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
        >
          <ArrowDown className="mr-2 h-4 w-4" />
          编码
        </Button>
        <Button
          onClick={decode}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
        >
          <ArrowUp className="mr-2 h-4 w-4" />
          解码
        </Button>
        <Button onClick={clearAll} variant="outline">
          清空
        </Button>
        {output && (
          <Button onClick={copyToClipboard} variant="outline">
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-green-600">已复制</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                复制
              </>
            )}
          </Button>
        )}
      </div>

      {/* 输出区域 */}
      {output && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            输出结果
          </label>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <code className="text-sm font-mono text-gray-800 dark:text-gray-100 break-all">
              {output}
            </code>
          </div>
        </div>
      )}
    </div>
  );
}
