'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy, Database } from 'lucide-react';

export default function SqlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const formatSQL = () => {
    let formatted = input.trim();
    
    // 关键字大写
    const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN',
                      'ON', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'OFFSET',
                      'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE',
                      'DROP TABLE', 'ALTER TABLE', 'AS', 'DISTINCT', 'COUNT', 'SUM', 'AVG'];
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      formatted = formatted.replace(regex, keyword);
    });
    
    // 添加换行和缩进
    formatted = formatted
      .replace(/\bSELECT\b/g, 'SELECT\n  ')
      .replace(/\bFROM\b/g, '\nFROM\n  ')
      .replace(/\b(LEFT JOIN|RIGHT JOIN|INNER JOIN|JOIN)\b/g, '\n$1\n  ')
      .replace(/\bWHERE\b/g, '\nWHERE\n  ')
      .replace(/\bAND\b/g, '\n  AND ')
      .replace(/\bOR\b/g, '\n  OR ')
      .replace(/\bORDER BY\b/g, '\nORDER BY\n  ')
      .replace(/\bGROUP BY\b/g, '\nGROUP BY\n  ')
      .replace(/\bHAVING\b/g, '\nHAVING\n  ')
      .replace(/\bLIMIT\b/g, '\nLIMIT ')
      .replace(/,/g, ',\n  ');
    
    setOutput(formatted);
  };

  const minifySQL = () => {
    const minified = input.trim().replace(/\s+/g, ' ').replace(/\(\s+/g, '(').replace(/\s+\)/g, ')');
    setOutput(minified);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-4">
      {/* 输入 */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
          输入 SQL
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="SELECT * FROM users WHERE id = 1 AND status = 'active' ORDER BY created_at DESC"
          className="w-full h-32 px-4 py-3 text-sm font-mono bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-2">
        <Button
          onClick={formatSQL}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
        >
          <Database className="mr-2 h-4 w-4" />
          格式化
        </Button>
        <Button onClick={minifySQL} variant="outline">
          压缩
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

      {/* 输出 */}
      {output && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            格式化后的 SQL
          </label>
          <pre className="p-4 bg-gray-900 text-blue-400 rounded-lg overflow-x-auto text-sm font-mono border border-gray-700">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
