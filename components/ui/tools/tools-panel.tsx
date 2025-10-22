'use client';

import React, { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

// 基础工具
import GeneratePasswordButton from './generate-password-button';
import JsonFormatter from './json-formatter';
import Base64Converter from './base64-converter';
import ColorPicker from './color-picker';
import TimestampConverter from './timestamp-converter';
import UuidGenerator from './uuid-generator';
import QrcodeGenerator from './qrcode-generator';
import UrlEncoder from './url-encoder';
import HashCalculator from './hash-calculator';
import MarkdownPreviewer from './markdown-previewer';
import HtmlEntityEncoder from './html-entity-encoder';
import RegexTester from './regex-tester';
import TextDiff from './text-diff';
import ImageCompressor from './image-compressor';
import UnitConverter from './unit-converter';

// 代码生成工具
import SqlGenerator from './sql-generator';
import JsonToType from './json-to-type';
import MockDataGenerator from './mock-data-generator';
import ApiCodeGenerator from './api-code-generator';
import CronGenerator from './cron-generator';
import GitHelper from './git-helper';
import SqlFormatter from './sql-formatter';
import ScriptGenerator from './script-generator';
import CodeSnippets from './code-snippets';
import CommandHelper from './command-helper';
import KeyboardShortcuts from './keyboard-shortcuts';


type ViewMode = 'grid' | 'list';

export default function ToolsPanel() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [expandedTool, setExpandedTool] = useState<string | null>(null);

  const tools = [
    // 基础工具（1-5：高优先级）
    {
      id: 'password',
      name: '密码生成器',
      description: '安全密码快速生成',
      category: '基础工具',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      gradient: 'from-violet-500 to-fuchsia-500',
      component: <GeneratePasswordButton />
    },
    {
      id: 'json',
      name: 'JSON 格式化',
      description: '格式化和压缩 JSON',
      category: '基础工具',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-500',
      component: <JsonFormatter />
    },
    {
      id: 'base64',
      name: 'Base64 编解码',
      description: '文本 Base64 转换',
      category: '基础工具',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      gradient: 'from-green-500 to-emerald-500',
      component: <Base64Converter />
    },
    {
      id: 'color',
      name: '颜色选择器',
      description: '色值转换和取色',
      category: '基础工具',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500',
      component: <ColorPicker />
    },
    {
      id: 'timestamp',
      name: '时间戳转换',
      description: '时间戳与日期互转',
      category: '基础工具',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-orange-500 to-amber-500',
      component: <TimestampConverter />
    },

    // 基础工具（6-10：中优先级）
    {
      id: 'uuid',
      name: 'UUID 生成器',
      description: '生成唯一标识符',
      category: '基础工具',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      ),
      gradient: 'from-indigo-500 to-purple-500',
      component: <UuidGenerator />
    },
    {
      id: 'qrcode',
      name: '二维码生成器',
      description: '生成 QR Code',
      category: '基础工具',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      ),
      gradient: 'from-teal-500 to-cyan-500',
      component: <QrcodeGenerator />
    },
    {
      id: 'url',
      name: 'URL 编解码',
      description: 'URL 编码和解码',
      category: '基础工具',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      gradient: 'from-sky-500 to-blue-500',
      component: <UrlEncoder />
    },
    {
      id: 'hash',
      name: '哈希计算器',
      description: 'SHA 哈希计算',
      category: '基础工具',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      ),
      gradient: 'from-red-500 to-rose-500',
      component: <HashCalculator />
    },
    {
      id: 'markdown',
      name: 'Markdown 预览',
      description: '实时预览 Markdown',
      category: '基础工具',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      gradient: 'from-slate-500 to-gray-500',
      component: <MarkdownPreviewer />
    },

    // 基础工具（11-15：低优先级）
    {
      id: 'html',
      name: 'HTML 实体编解码',
      description: 'HTML 特殊字符转换',
      category: '基础工具',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      gradient: 'from-lime-500 to-green-500',
      component: <HtmlEntityEncoder />
    },
    {
      id: 'regex',
      name: '正则表达式测试',
      description: '测试正则表达式匹配',
      category: '基础工具',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      gradient: 'from-rose-500 to-pink-500',
      component: <RegexTester />
    },
    {
      id: 'diff',
      name: '文本差异对比',
      description: '对比两段文本差异',
      category: '基础工具',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      gradient: 'from-cyan-500 to-blue-500',
      component: <TextDiff />
    },
    {
      id: 'image',
      name: '图片压缩',
      description: '在线压缩图片',
      category: '基础工具',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-indigo-500',
      component: <ImageCompressor />
    },
    {
      id: 'unit',
      name: '单位转换',
      description: 'CSS/长度/重量转换',
      category: '基础工具',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      ),
      gradient: 'from-amber-500 to-orange-500',
      component: <UnitConverter />
    },

    // 代码生成工具（16-22）
    {
      id: 'sql-generator',
      name: 'SQL 查询生成器',
      description: '可视化生成 SQL 语句',
      category: '代码生成',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      gradient: 'from-blue-600 to-cyan-600',
      component: <SqlGenerator />
    },
    {
      id: 'json-to-type',
      name: 'JSON 转类型',
      description: '生成类型定义代码',
      category: '代码生成',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      gradient: 'from-emerald-600 to-teal-600',
      component: <JsonToType />
    },
    {
      id: 'mock-data',
      name: 'Mock 数据生成',
      description: '生成测试数据',
      category: '代码生成',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      gradient: 'from-pink-600 to-rose-600',
      component: <MockDataGenerator />
    },
    {
      id: 'api-code',
      name: 'API 请求代码',
      description: '生成 HTTP 请求代码',
      category: '代码生成',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      gradient: 'from-yellow-600 to-orange-600',
      component: <ApiCodeGenerator />
    },
    {
      id: 'cron',
      name: 'Cron 表达式',
      description: '生成定时任务表达式',
      category: '代码生成',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-orange-600 to-red-600',
      component: <CronGenerator />
    },
    {
      id: 'git',
      name: 'Git 命令助手',
      description: '快速查询 Git 命令',
      category: '代码生成',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      gradient: 'from-gray-700 to-slate-700',
      component: <GitHelper />
    },
    {
      id: 'sql-formatter',
      name: 'SQL 格式化',
      description: '格式化和压缩 SQL',
      category: '代码生成',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      ),
      gradient: 'from-blue-700 to-indigo-700',
      component: <SqlFormatter />
    },
    // 🆕 新增：脚本生成器
    {
      id: 'script-generator',
      name: '脚本生成器',
      description: 'Shell/Python/PowerShell 脚本',
      category: '代码生成',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      gradient: 'from-green-600 to-teal-600',
      component: <ScriptGenerator />
    },
    {
      id: 'code-snippets',
      name: '代码片段',
      description: '常用代码模板和设计模式',
      category: '代码生成',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      gradient: 'from-indigo-600 to-purple-600',
      component: <CodeSnippets />
    },
    {
      id: 'command-helper',
      name: '系统命令助手',
      description: 'Docker/Linux/K8s 常用命令',
      category: '代码生成',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      gradient: 'from-slate-700 to-gray-700',
      component: <CommandHelper />
    },
    {
      id: 'keyboard-shortcuts',
      name: '快捷键助手',
      description: 'VS Code/IDEA/Office 快捷键',
      category: '基础工具',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      gradient: 'from-purple-600 to-pink-600',
      component: <KeyboardShortcuts />
    }
  ];

  return (
    <section className="w-full">
      <div className="w-full">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-fuchsia-900/20 p-8 md:p-12 shadow-2xl border border-purple-100 dark:border-purple-800">
          
          {/* 装饰性背景元素 */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-400/20 to-fuchsia-400/20 rounded-full blur-3xl -z-0"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl -z-0"></div>
          
          {/* 内容区 */}
          <div className="relative z-10">
            {/* 标题区域和视图切换 */}
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-violet-600 to-fuchsia-600 rounded-full"></div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                    工具箱
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 ml-3">Tool Box - {tools.length} 个实用工具</p>
              </div>

              {/* 视图切换按钮 */}
              <div className="flex gap-2 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-md">
                <Button
                  onClick={() => setViewMode('grid')}
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  className={viewMode === 'grid' ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white' : ''}
                >
                  <LayoutGrid className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">卡片</span>
                </Button>
                <Button
                  onClick={() => setViewMode('list')}
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  className={viewMode === 'list' ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white' : ''}
                >
                  <List className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">列表</span>
                </Button>
              </div>
            </div>

            {/* 网格视图 */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {tools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => setExpandedTool(expandedTool === tool.id ? null : tool.id)}
                    className="group relative cursor-pointer"
                  >
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${tool.gradient} rounded-xl opacity-0 group-hover:opacity-30 blur transition duration-300`}></div>
                    
                    <div className="relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center h-full">
                      <div className="relative mb-3">
                        <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} rounded-lg blur-sm opacity-50`}></div>
                        <div className={`relative w-12 h-12 bg-gradient-to-br ${tool.gradient} rounded-lg flex items-center justify-center shadow-md`}>
                          {tool.icon}
                        </div>
                      </div>
                      <h3 className="font-bold text-sm text-gray-800 dark:text-gray-100 mb-1">{tool.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{tool.description}</p>
                      <span className="mt-2 px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                        {tool.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 列表视图（展开详情） */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {tools.map((tool) => (
                  <div key={tool.id} className="group relative">
                    <div className={`absolute -inset-1 bg-gradient-to-r ${tool.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500`}></div>
                    
                    <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-start gap-5">
                        {/* 左侧：图标和标题 */}
                        <div className="flex items-center gap-4 min-w-[180px] pt-2">
                          <div className="relative">
                            <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} rounded-xl blur-md opacity-50`}></div>
                            <div className={`relative w-12 h-12 bg-gradient-to-br ${tool.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                              {tool.icon}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{tool.name}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{tool.description}</p>
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                              {tool.category}
                            </span>
                          </div>
                        </div>
                        
                        {/* 右侧：功能区域 */}
                        <div className="flex-1 border-l border-gray-200 dark:border-gray-700 pl-5">
                          {tool.component}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 工具详情弹窗（网格视图点击后展开） */}
            {viewMode === 'grid' && expandedTool && (
              <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
                onClick={() => setExpandedTool(null)}
              >
                <div 
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-4 duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  {(() => {
                    const tool = tools.find(t => t.id === expandedTool);
                    if (!tool) return null;
                    
                    return (
                      <>
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} rounded-xl blur-md opacity-50`}></div>
                              <div className={`relative w-12 h-12 bg-gradient-to-br ${tool.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                                {tool.icon}
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100">{tool.name}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{tool.description}</p>
                              <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                                {tool.category}
                              </span>
                            </div>
                          </div>
                          <Button
                            onClick={() => setExpandedTool(null)}
                            variant="ghost"
                            size="sm"
                            className="rounded-full"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </Button>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                          {tool.component}
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
