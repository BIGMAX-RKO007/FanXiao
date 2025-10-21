'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy, FileJson, AlertCircle } from 'lucide-react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
    } catch (e) {
      setError('JSON 格式错误，请检查输入');
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
    } catch (e) {
      setError('JSON 格式错误，请检查输入');
      setOutput('');
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
    setError('');
    setCopied(false);
  };

  return (
    <div className="w-full space-y-4">
      {/* 输入区域 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          输入 JSON
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"name": "example", "value": 123}'
          className="w-full h-32 px-4 py-3 text-sm font-mono bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={formatJson}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
        >
          <FileJson className="mr-2 h-4 w-4" />
          格式化
        </Button>
        <Button
          onClick={minifyJson}
          variant="outline"
          className="border-blue-300 text-blue-600 hover:bg-blue-50"
        >
          压缩
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
                复制结果
              </>
            )}
          </Button>
        )}
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
        </div>
      )}

      {/* 输出区域 */}
      {output && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            输出结果
          </label>
          <pre className="w-full h-32 px-4 py-3 text-sm font-mono bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
