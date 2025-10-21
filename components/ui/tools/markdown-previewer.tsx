'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Copy, Check } from 'lucide-react';

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState('# 标题\n\n这是一段 **粗体** 和 *斜体* 文本。\n\n- 列表项 1\n- 列表项 2\n\n``````');
  const [showPreview, setShowPreview] = useState(true);
  const [copied, setCopied] = useState(false);

  // 简单的 Markdown 转 HTML（生产环境建议使用 marked 或 react-markdown）
  const renderMarkdown = (text: string) => {
    let html = text;
    
    // 标题
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>');
    
    // 粗体和斜体
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    
    // 代码块
    html = html.replace(/``````/g, '<pre class="bg-gray-800 text-gray-100 p-3 rounded-lg my-2 overflow-x-auto"><code>$2</code></pre>');
    html = html.replace(/`(.*?)`/g, '<code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">$1</code>');
    
    // 列表
    html = html.replace(/^\- (.*$)/gim, '<li class="ml-4">• $1</li>');
    html = html.replace(/(<li.*<\/li>)/s, '<ul class="my-2">$1</ul>');
    
    // 链接
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank">$1</a>');
    
    // 段落
    html = html.replace(/\n\n/g, '</p><p class="my-2">');
    html = '<p class="my-2">' + html + '</p>';
    
    return html;
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-4">
      {/* 控制按钮 */}
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Markdown 编辑器
        </label>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowPreview(!showPreview)}
            variant="outline"
            size="sm"
          >
            {showPreview ? (
              <>
                <EyeOff className="h-4 w-4 mr-1" />
                隐藏预览
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-1" />
                显示预览
              </>
            )}
          </Button>
          <Button onClick={copyMarkdown} variant="outline" size="sm">
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
        </div>
      </div>

      {/* 编辑器和预览 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Markdown 输入 */}
        <div className="space-y-2">
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-64 px-4 py-3 text-sm font-mono bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 resize-none"
            placeholder="输入 Markdown 文本..."
          />
        </div>

        {/* 预览区 */}
        {showPreview && (
          <div className="space-y-2">
            <div
              className="w-full h-64 px-4 py-3 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
