'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy, Hash } from 'lucide-react';

export default function HashCalculator() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<{ [key: string]: string }>({});
  const [copied, setCopied] = useState('');

  // 简单的 MD5 实现（生产环境建议使用 crypto-js 库）
  const calculateHash = async (text: string, algorithm: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    
    let hashAlgorithm = algorithm.toLowerCase();
    if (hashAlgorithm === 'md5') {
      // MD5 需要使用第三方库，这里用 SHA-256 代替演示
      // 实际项目中使用: import MD5 from 'crypto-js/md5';
      return 'MD5 需要额外库支持';
    }
    
    const hashBuffer = await crypto.subtle.digest(hashAlgorithm.toUpperCase(), data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const calculate = async () => {
    if (!input) return;
    
    const results: { [key: string]: string } = {};
    
    try {
      results['SHA-1'] = await calculateHash(input, 'SHA-1');
      results['SHA-256'] = await calculateHash(input, 'SHA-256');
      results['SHA-384'] = await calculateHash(input, 'SHA-384');
      results['SHA-512'] = await calculateHash(input, 'SHA-512');
      setHashes(results);
    } catch (e) {
      console.error('Hash calculation failed', e);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="w-full space-y-4">
      {/* 输入区域 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          输入文本
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入要计算哈希的文本..."
          className="w-full h-24 px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
        />
      </div>

      {/* 操作按钮 */}
      <Button
        onClick={calculate}
        disabled={!input}
        className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white"
      >
        <Hash className="mr-2 h-4 w-4" />
        计算哈希
      </Button>

      {/* 哈希结果 */}
      {Object.keys(hashes).length > 0 && (
        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
          {Object.entries(hashes).map(([algorithm, hash]) => (
            <div
              key={algorithm}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex-1 mr-3">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">
                  {algorithm}
                </span>
                <code className="text-xs font-mono text-gray-800 dark:text-gray-100 break-all">
                  {hash}
                </code>
              </div>
              <Button
                onClick={() => copyToClipboard(hash, algorithm)}
                variant="ghost"
                size="sm"
              >
                {copied === algorithm ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
