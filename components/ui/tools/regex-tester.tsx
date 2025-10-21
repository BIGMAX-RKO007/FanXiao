'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, AlertCircle, CheckCircle } from 'lucide-react';

export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<RegExpMatchArray | null>(null);
  const [error, setError] = useState('');

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, flags);
      const result = testString.match(regex);
      setMatches(result);
      setError('');
    } catch (e) {
      setError('正则表达式格式错误');
      setMatches(null);
    }
  };

  const highlightMatches = () => {
    if (!matches || matches.length === 0) return testString;
    
    let highlighted = testString;
    const regex = new RegExp(pattern, flags);
    
    if (flags.includes('g')) {
      highlighted = testString.replace(regex, (match) => `<mark class="bg-yellow-300 dark:bg-yellow-600 px-1 rounded">${match}</mark>`);
    } else {
      const match = regex.exec(testString);
      if (match) {
        const index = match.index;
        highlighted = testString.substring(0, index) + 
          `<mark class="bg-yellow-300 dark:bg-yellow-600 px-1 rounded">${match[0]}</mark>` +
          testString.substring(index + match[0].length);
      }
    }
    
    return highlighted;
  };

  return (
    <div className="w-full space-y-4">
      {/* 正则表达式输入 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          正则表达式
        </label>
        <div className="flex gap-2">
          <span className="flex items-center px-3 text-gray-500 bg-gray-50 dark:bg-gray-800 border border-r-0 border-gray-200 dark:border-gray-700 rounded-l-lg">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="输入正则表达式..."
            className="flex-1 px-4 py-2 text-sm font-mono bg-gray-50 dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          <span className="flex items-center px-3 text-gray-500 bg-gray-50 dark:bg-gray-800 border border-l-0 border-gray-200 dark:border-gray-700 rounded-r-lg">/</span>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="flags"
            className="w-20 px-3 py-2 text-sm font-mono bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          常用标志：g (全局), i (忽略大小写), m (多行)
        </p>
      </div>

      {/* 测试文本 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          测试文本
        </label>
        <textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="输入要测试的文本..."
          className="w-full h-32 px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
        />
      </div>

      {/* 测试按钮 */}
      <Button
        onClick={testRegex}
        disabled={!pattern || !testString}
        className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white"
      >
        <Search className="mr-2 h-4 w-4" />
        测试匹配
      </Button>

      {/* 错误提示 */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
        </div>
      )}

      {/* 匹配结果 */}
      {!error && matches !== null && (
        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-600 dark:text-green-400">
              找到 {matches?.length || 0} 个匹配项
            </span>
          </div>

          {/* 高亮显示 */}
          {matches && matches.length > 0 && (
            <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">匹配高亮</p>
              <div 
                className="text-sm whitespace-pre-wrap break-all"
                dangerouslySetInnerHTML={{ __html: highlightMatches() }}
              />
            </div>
          )}

          {/* 匹配列表 */}
          {matches && matches.length > 0 && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">匹配项</p>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {matches.map((match, index) => (
                  <div key={index} className="text-sm font-mono bg-white dark:bg-gray-700 px-3 py-2 rounded border border-gray-200 dark:border-gray-600">
                    <span className="text-gray-500 dark:text-gray-400 mr-2">[{index}]</span>
                    <span className="text-gray-800 dark:text-gray-100">{match}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
