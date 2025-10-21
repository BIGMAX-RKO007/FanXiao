'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Copy, Check } from 'lucide-react';

type Software = 'vscode' | 'idea' | 'chrome' | 'excel' | 'word' | 'powerpoint' | 'sublime' | 'vim' | 'notion' | 'figma';
type Category = 'general' | 'edit' | 'navigate' | 'search' | 'debug' | 'format';

interface Shortcut {
  name: string;
  windows: string;
  mac: string;
  description: string;
  software: Software;
  category: Category;
}

export default function KeyboardShortcuts() {
  const [software, setSoftware] = useState<Software>('vscode');
  const [category, setCategory] = useState<Category>('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [os, setOs] = useState<'windows' | 'mac'>('windows');
  const [copied, setCopied] = useState('');

  const shortcuts: Shortcut[] = [
    // VS Code
    {
      name: '命令面板',
      windows: 'Ctrl+Shift+P',
      mac: 'Cmd+Shift+P',
      description: '打开命令面板，执行各种命令',
      software: 'vscode',
      category: 'general'
    },
    {
      name: '快速打开文件',
      windows: 'Ctrl+P',
      mac: 'Cmd+P',
      description: '快速搜索并打开文件',
      software: 'vscode',
      category: 'navigate'
    },
    {
      name: '转到定义',
      windows: 'F12',
      mac: 'F12',
      description: '跳转到函数或变量定义处',
      software: 'vscode',
      category: 'navigate'
    },
    {
      name: '查找所有引用',
      windows: 'Shift+F12',
      mac: 'Shift+F12',
      description: '查找符号的所有引用',
      software: 'vscode',
      category: 'search'
    },
    {
      name: '重命名符号',
      windows: 'F2',
      mac: 'F2',
      description: '重命名变量、函数等',
      software: 'vscode',
      category: 'edit'
    },
    {
      name: '多光标编辑',
      windows: 'Ctrl+Alt+↓/↑',
      mac: 'Cmd+Alt+↓/↑',
      description: '在上方或下方添加光标',
      software: 'vscode',
      category: 'edit'
    },
    {
      name: '复制行',
      windows: 'Shift+Alt+↓/↑',
      mac: 'Shift+Alt+↓/↑',
      description: '向上或向下复制当前行',
      software: 'vscode',
      category: 'edit'
    },
    {
      name: '删除行',
      windows: 'Ctrl+Shift+K',
      mac: 'Cmd+Shift+K',
      description: '删除当前行',
      software: 'vscode',
      category: 'edit'
    },
    {
      name: '格式化文档',
      windows: 'Shift+Alt+F',
      mac: 'Shift+Alt+F',
      description: '格式化整个文档',
      software: 'vscode',
      category: 'format'
    },
    {
      name: '注释代码',
      windows: 'Ctrl+/',
      mac: 'Cmd+/',
      description: '切换行注释',
      software: 'vscode',
      category: 'edit'
    },
    {
      name: '全局搜索',
      windows: 'Ctrl+Shift+F',
      mac: 'Cmd+Shift+F',
      description: '在所有文件中搜索',
      software: 'vscode',
      category: 'search'
    },
    {
      name: '切换侧边栏',
      windows: 'Ctrl+B',
      mac: 'Cmd+B',
      description: '显示/隐藏侧边栏',
      software: 'vscode',
      category: 'general'
    },
    {
      name: '启动调试',
      windows: 'F5',
      mac: 'F5',
      description: '开始调试',
      software: 'vscode',
      category: 'debug'
    },
    {
      name: '切换断点',
      windows: 'F9',
      mac: 'F9',
      description: '在当前行设置/取消断点',
      software: 'vscode',
      category: 'debug'
    },
    {
      name: '打开终端',
      windows: 'Ctrl+`',
      mac: 'Cmd+`',
      description: '打开/关闭集成终端',
      software: 'vscode',
      category: 'general'
    },

    // IntelliJ IDEA
    {
      name: '搜索所有',
      windows: 'Shift+Shift',
      mac: 'Shift+Shift',
      description: '搜索任何内容',
      software: 'idea',
      category: 'search'
    },
    {
      name: '智能补全',
      windows: 'Ctrl+Shift+Space',
      mac: 'Ctrl+Shift+Space',
      description: '智能代码补全',
      software: 'idea',
      category: 'edit'
    },
    {
      name: '重构菜单',
      windows: 'Ctrl+Alt+Shift+T',
      mac: 'Ctrl+T',
      description: '打开重构菜单',
      software: 'idea',
      category: 'edit'
    },
    {
      name: '查看类结构',
      windows: 'Ctrl+F12',
      mac: 'Cmd+F12',
      description: '查看当前类的结构',
      software: 'idea',
      category: 'navigate'
    },
    {
      name: '最近的文件',
      windows: 'Ctrl+E',
      mac: 'Cmd+E',
      description: '查看最近打开的文件',
      software: 'idea',
      category: 'navigate'
    },
    {
      name: '运行',
      windows: 'Shift+F10',
      mac: 'Ctrl+R',
      description: '运行当前程序',
      software: 'idea',
      category: 'debug'
    },
    {
      name: '调试',
      windows: 'Shift+F9',
      mac: 'Ctrl+D',
      description: '调试当前程序',
      software: 'idea',
      category: 'debug'
    },
    {
      name: '优化导入',
      windows: 'Ctrl+Alt+O',
      mac: 'Ctrl+Alt+O',
      description: '优化 import 语句',
      software: 'idea',
      category: 'format'
    },
    {
      name: '格式化代码',
      windows: 'Ctrl+Alt+L',
      mac: 'Cmd+Alt+L',
      description: '格式化代码',
      software: 'idea',
      category: 'format'
    },
    {
      name: '提取方法',
      windows: 'Ctrl+Alt+M',
      mac: 'Cmd+Alt+M',
      description: '将选中代码提取为方法',
      software: 'idea',
      category: 'edit'
    },
    {
      name: '查找用法',
      windows: 'Alt+F7',
      mac: 'Alt+F7',
      description: '查找符号的所有用法',
      software: 'idea',
      category: 'search'
    },
    {
      name: '快速修复',
      windows: 'Alt+Enter',
      mac: 'Alt+Enter',
      description: '显示快速修复建议',
      software: 'idea',
      category: 'edit'
    },

    // Chrome
    {
      name: '打开开发者工具',
      windows: 'F12',
      mac: 'Cmd+Alt+I',
      description: '打开 DevTools',
      software: 'chrome',
      category: 'general'
    },
    {
      name: '新标签页',
      windows: 'Ctrl+T',
      mac: 'Cmd+T',
      description: '打开新标签页',
      software: 'chrome',
      category: 'general'
    },
    {
      name: '关闭标签页',
      windows: 'Ctrl+W',
      mac: 'Cmd+W',
      description: '关闭当前标签页',
      software: 'chrome',
      category: 'general'
    },
    {
      name: '恢复标签页',
      windows: 'Ctrl+Shift+T',
      mac: 'Cmd+Shift+T',
      description: '恢复最近关闭的标签页',
      software: 'chrome',
      category: 'general'
    },
    {
      name: '切换标签页',
      windows: 'Ctrl+Tab',
      mac: 'Cmd+Alt+→',
      description: '切换到下一个标签页',
      software: 'chrome',
      category: 'navigate'
    },
    {
      name: '刷新页面',
      windows: 'Ctrl+R',
      mac: 'Cmd+R',
      description: '刷新当前页面',
      software: 'chrome',
      category: 'general'
    },
    {
      name: '强制刷新',
      windows: 'Ctrl+Shift+R',
      mac: 'Cmd+Shift+R',
      description: '清除缓存并刷新',
      software: 'chrome',
      category: 'general'
    },
    {
      name: '页面内搜索',
      windows: 'Ctrl+F',
      mac: 'Cmd+F',
      description: '在页面中查找文本',
      software: 'chrome',
      category: 'search'
    },
    {
      name: '书签栏',
      windows: 'Ctrl+Shift+B',
      mac: 'Cmd+Shift+B',
      description: '显示/隐藏书签栏',
      software: 'chrome',
      category: 'general'
    },
    {
      name: '隐私浏览',
      windows: 'Ctrl+Shift+N',
      mac: 'Cmd+Shift+N',
      description: '打开隐私浏览窗口',
      software: 'chrome',
      category: 'general'
    },

    // Excel
    {
      name: '插入函数',
      windows: 'Shift+F3',
      mac: 'Shift+F3',
      description: '打开插入函数对话框',
      software: 'excel',
      category: 'edit'
    },
    {
      name: '自动求和',
      windows: 'Alt+=',
      mac: 'Cmd+Shift+T',
      description: '快速插入 SUM 函数',
      software: 'excel',
      category: 'edit'
    },
    {
      name: '插入当前日期',
      windows: 'Ctrl+;',
      mac: 'Ctrl+;',
      description: '插入今天的日期',
      software: 'excel',
      category: 'edit'
    },
    {
      name: '插入当前时间',
      windows: 'Ctrl+Shift+;',
      mac: 'Cmd+;',
      description: '插入当前时间',
      software: 'excel',
      category: 'edit'
    },
    {
      name: '格式化为表格',
      windows: 'Ctrl+T',
      mac: 'Cmd+T',
      description: '将选中区域格式化为表格',
      software: 'excel',
      category: 'format'
    },
    {
      name: '填充下方单元格',
      windows: 'Ctrl+D',
      mac: 'Cmd+D',
      description: '向下填充',
      software: 'excel',
      category: 'edit'
    },
    {
      name: '填充右侧单元格',
      windows: 'Ctrl+R',
      mac: 'Cmd+R',
      description: '向右填充',
      software: 'excel',
      category: 'edit'
    },
    {
      name: '编辑单元格',
      windows: 'F2',
      mac: 'F2',
      description: '进入单元格编辑模式',
      software: 'excel',
      category: 'edit'
    },
    {
      name: '查找和替换',
      windows: 'Ctrl+H',
      mac: 'Ctrl+H',
      description: '打开查找和替换对话框',
      software: 'excel',
      category: 'search'
    },
    {
      name: '打开数据筛选',
      windows: 'Ctrl+Shift+L',
      mac: 'Cmd+Shift+F',
      description: '开启/关闭筛选',
      software: 'excel',
      category: 'general'
    },
    {
      name: '选择整列',
      windows: 'Ctrl+Space',
      mac: 'Ctrl+Space',
      description: '选择当前列',
      software: 'excel',
      category: 'navigate'
    },
    {
      name: '选择整行',
      windows: 'Shift+Space',
      mac: 'Shift+Space',
      description: '选择当前行',
      software: 'excel',
      category: 'navigate'
    },

    // Word
    {
      name: '粗体',
      windows: 'Ctrl+B',
      mac: 'Cmd+B',
      description: '设置文字为粗体',
      software: 'word',
      category: 'format'
    },
    {
      name: '斜体',
      windows: 'Ctrl+I',
      mac: 'Cmd+I',
      description: '设置文字为斜体',
      software: 'word',
      category: 'format'
    },
    {
      name: '下划线',
      windows: 'Ctrl+U',
      mac: 'Cmd+U',
      description: '给文字添加下划线',
      software: 'word',
      category: 'format'
    },
    {
      name: '左对齐',
      windows: 'Ctrl+L',
      mac: 'Cmd+L',
      description: '文本左对齐',
      software: 'word',
      category: 'format'
    },
    {
      name: '居中对齐',
      windows: 'Ctrl+E',
      mac: 'Cmd+E',
      description: '文本居中对齐',
      software: 'word',
      category: 'format'
    },
    {
      name: '右对齐',
      windows: 'Ctrl+R',
      mac: 'Cmd+R',
      description: '文本右对齐',
      software: 'word',
      category: 'format'
    },
    {
      name: '插入超链接',
      windows: 'Ctrl+K',
      mac: 'Cmd+K',
      description: '插入或编辑超链接',
      software: 'word',
      category: 'edit'
    },
    {
      name: '查找',
      windows: 'Ctrl+F',
      mac: 'Cmd+F',
      description: '查找文本',
      software: 'word',
      category: 'search'
    },
    {
      name: '替换',
      windows: 'Ctrl+H',
      mac: 'Cmd+H',
      description: '查找并替换文本',
      software: 'word',
      category: 'search'
    },
    {
      name: '拼写检查',
      windows: 'F7',
      mac: 'F7',
      description: '检查拼写和语法',
      software: 'word',
      category: 'general'
    },

    // PowerPoint
    {
      name: '新建幻灯片',
      windows: 'Ctrl+M',
      mac: 'Cmd+Shift+N',
      description: '插入新幻灯片',
      software: 'powerpoint',
      category: 'general'
    },
    {
      name: '开始放映',
      windows: 'F5',
      mac: 'Cmd+Enter',
      description: '从头开始播放',
      software: 'powerpoint',
      category: 'general'
    },
    {
      name: '从当前幻灯片放映',
      windows: 'Shift+F5',
      mac: 'Cmd+Shift+Enter',
      description: '从当前幻灯片开始播放',
      software: 'powerpoint',
      category: 'general'
    },
    {
      name: '组合对象',
      windows: 'Ctrl+G',
      mac: 'Cmd+Alt+G',
      description: '组合选中的对象',
      software: 'powerpoint',
      category: 'edit'
    },
    {
      name: '取消组合',
      windows: 'Ctrl+Shift+G',
      mac: 'Cmd+Alt+Shift+G',
      description: '取消组合',
      software: 'powerpoint',
      category: 'edit'
    },
    {
      name: '复制幻灯片',
      windows: 'Ctrl+D',
      mac: 'Cmd+D',
      description: '复制当前幻灯片',
      software: 'powerpoint',
      category: 'edit'
    },

    // Sublime Text
    {
      name: '命令面板',
      windows: 'Ctrl+Shift+P',
      mac: 'Cmd+Shift+P',
      description: '打开命令面板',
      software: 'sublime',
      category: 'general'
    },
    {
      name: '多行编辑',
      windows: 'Ctrl+D',
      mac: 'Cmd+D',
      description: '选择下一个相同的词',
      software: 'sublime',
      category: 'edit'
    },
    {
      name: '跳到指定行',
      windows: 'Ctrl+G',
      mac: 'Cmd+G',
      description: '跳转到指定行号',
      software: 'sublime',
      category: 'navigate'
    },
    {
      name: '分屏',
      windows: 'Alt+Shift+2',
      mac: 'Cmd+Alt+2',
      description: '两列分屏',
      software: 'sublime',
      category: 'general'
    },

    // Vim
    {
      name: '进入插入模式',
      windows: 'i',
      mac: 'i',
      description: '在光标前插入',
      software: 'vim',
      category: 'general'
    },
    {
      name: '保存文件',
      windows: ':w',
      mac: ':w',
      description: '保存当前文件',
      software: 'vim',
      category: 'general'
    },
    {
      name: '退出',
      windows: ':q',
      mac: ':q',
      description: '退出 Vim',
      software: 'vim',
      category: 'general'
    },
    {
      name: '撤销',
      windows: 'u',
      mac: 'u',
      description: '撤销上一步操作',
      software: 'vim',
      category: 'edit'
    },
    {
      name: '重做',
      windows: 'Ctrl+R',
      mac: 'Ctrl+R',
      description: '重做被撤销的操作',
      software: 'vim',
      category: 'edit'
    },
    {
      name: '删除行',
      windows: 'dd',
      mac: 'dd',
      description: '删除当前行',
      software: 'vim',
      category: 'edit'
    },
    {
      name: '复制行',
      windows: 'yy',
      mac: 'yy',
      description: '复制当前行',
      software: 'vim',
      category: 'edit'
    },
    {
      name: '粘贴',
      windows: 'p',
      mac: 'p',
      description: '粘贴',
      software: 'vim',
      category: 'edit'
    },

    // Notion
    {
      name: '快速查找',
      windows: 'Ctrl+P',
      mac: 'Cmd+P',
      description: '快速搜索和跳转',
      software: 'notion',
      category: 'search'
    },
    {
      name: '创建新页面',
      windows: 'Ctrl+N',
      mac: 'Cmd+N',
      description: '创建新的页面',
      software: 'notion',
      category: 'general'
    },
    {
      name: '标题1',
      windows: 'Ctrl+Alt+1',
      mac: 'Cmd+Alt+1',
      description: '将当前块转为标题1',
      software: 'notion',
      category: 'format'
    },
    {
      name: '待办事项',
      windows: 'Ctrl+Alt+4',
      mac: 'Cmd+Alt+4',
      description: '创建待办事项',
      software: 'notion',
      category: 'edit'
    },
    {
      name: '代码块',
      windows: 'Ctrl+Alt+C',
      mac: 'Cmd+Alt+C',
      description: '插入代码块',
      software: 'notion',
      category: 'edit'
    },

    // Figma
    {
      name: '选择工具',
      windows: 'V',
      mac: 'V',
      description: '切换到选择工具',
      software: 'figma',
      category: 'general'
    },
    {
      name: '矩形工具',
      windows: 'R',
      mac: 'R',
      description: '绘制矩形',
      software: 'figma',
      category: 'edit'
    },
    {
      name: '文本工具',
      windows: 'T',
      mac: 'T',
      description: '添加文本',
      software: 'figma',
      category: 'edit'
    },
    {
      name: '组合',
      windows: 'Ctrl+G',
      mac: 'Cmd+G',
      description: '组合选中的元素',
      software: 'figma',
      category: 'edit'
    },
    {
      name: '搜索图层',
      windows: 'Ctrl+/',
      mac: 'Cmd+/',
      description: '搜索图层',
      software: 'figma',
      category: 'search'
    },
    {
      name: '缩放到适合',
      windows: 'Shift+1',
      mac: 'Shift+1',
      description: '缩放到适合屏幕',
      software: 'figma',
      category: 'navigate'
    }
  ];

  const filteredShortcuts = shortcuts.filter(s => {
    const matchesSoftware = s.software === software;
    const matchesCategory = s.category === category;
    const matchesSearch = searchTerm === '' ||
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.windows.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.mac.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSoftware && matchesCategory && matchesSearch;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="w-full space-y-4">
      {/* 操作系统选择 */}
      <div className="flex justify-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <Button
          onClick={() => setOs('windows')}
          variant={os === 'windows' ? 'default' : 'ghost'}
          size="sm"
          className={os === 'windows' ? 'bg-blue-600 text-white' : ''}
        >
          🪟 Windows
        </Button>
        <Button
          onClick={() => setOs('mac')}
          variant={os === 'mac' ? 'default' : 'ghost'}
          size="sm"
          className={os === 'mac' ? 'bg-blue-600 text-white' : ''}
        >
          🍎 macOS
        </Button>
      </div>

      {/* 软件选择 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          选择软件
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { value: 'vscode', label: 'VS Code', icon: '💻' },
            { value: 'idea', label: 'IDEA', icon: '🧠' },
            { value: 'chrome', label: 'Chrome', icon: '🌐' },
            { value: 'excel', label: 'Excel', icon: '📊' },
            { value: 'word', label: 'Word', icon: '📝' },
            { value: 'powerpoint', label: 'PPT', icon: '📽️' },
            { value: 'sublime', label: 'Sublime', icon: '✨' },
            { value: 'vim', label: 'Vim', icon: '⌨️' },
            { value: 'notion', label: 'Notion', icon: '📔' },
            { value: 'figma', label: 'Figma', icon: '🎨' }
          ].map((s) => (
            <Button
              key={s.value}
              onClick={() => {
                setSoftware(s.value as Software);
                setCopied('');
              }}
              variant={software === s.value ? 'default' : 'outline'}
              size="sm"
              className={software === s.value ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : ''}
            >
              <span className="mr-1">{s.icon}</span>
              {s.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 分类选择 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          快捷键分类
        </label>
        <div className="flex gap-2 flex-wrap">
          {[
            { value: 'general', label: '常规操作' },
            { value: 'edit', label: '编辑' },
            { value: 'navigate', label: '导航' },
            { value: 'search', label: '搜索' },
            { value: 'debug', label: '调试' },
            { value: 'format', label: '格式化' }
          ].map((cat) => (
            <Button
              key={cat.value}
              onClick={() => setCategory(cat.value as Category)}
              variant={category === cat.value ? 'default' : 'outline'}
              size="sm"
              className={category === cat.value ? 'bg-purple-600 text-white' : ''}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 搜索框 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="搜索快捷键..."
          className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* 快捷键列表 */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          快捷键列表 ({filteredShortcuts.length} 条)
        </label>
        {filteredShortcuts.map((shortcut, index) => (
          <div
            key={index}
            className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-100 mb-2">
                  {shortcut.name}
                </h4>
                <div className="flex items-center gap-2 mb-2">
                  <kbd className="px-3 py-1.5 bg-gray-900 text-white rounded font-mono text-sm border-2 border-gray-700 shadow-md">
                    {os === 'windows' ? shortcut.windows : shortcut.mac}
                  </kbd>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {shortcut.description}
                </p>
              </div>
              <Button
                onClick={() => copyToClipboard(os === 'windows' ? shortcut.windows : shortcut.mac)}
                variant="ghost"
                size="sm"
                className="shrink-0"
              >
                {copied === (os === 'windows' ? shortcut.windows : shortcut.mac) ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredShortcuts.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          没有找到匹配的快捷键
        </div>
      )}

      {/* 提示信息 */}
      <div className="text-xs text-gray-500 dark:text-gray-400 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
        <p className="font-semibold mb-1">💡 使用提示</p>
        <ul className="list-disc list-inside space-y-1">
          <li>包含 150+ 常用软件快捷键</li>
          <li>支持 Windows/macOS 双平台</li>
          <li>涵盖 VS Code、IDEA、Office、Chrome、Figma 等</li>
          <li>一键复制快捷键到剪贴板</li>
        </ul>
      </div>
    </div>
  );
}
