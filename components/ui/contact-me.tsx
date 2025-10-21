'use client';

import { useState } from 'react';

export default function ContactMeEnhanced() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模拟提交
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // 重置表单
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="p-8 space-y-6">
      {/* 标题 */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          发送消息
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          我会尽快回复你 📬
        </p>
      </div>

      {/* 表单 */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 姓名 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            姓名
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            placeholder="你的名字"
          />
        </div>

        {/* 邮箱 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            邮箱
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            placeholder="your@email.com"
          />
        </div>

        {/* 消息 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            消息
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            rows={4}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
            placeholder="想说点什么..."
          />
        </div>

        {/* 提交按钮 */}
        <button
          type="submit"
          disabled={isSubmitting || submitted}
          className="group relative w-full py-4 overflow-hidden"
        >
          {/* 按钮背景 */}
          <div className={`absolute inset-0 rounded-xl transition-all ${
            submitted 
              ? 'bg-gradient-to-r from-green-600 to-emerald-600' 
              : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
          }`}></div>
          
          {/* 按钮光晕 */}
          <div className={`absolute inset-0 rounded-xl blur-lg opacity-75 transition-all ${
            submitted 
              ? 'bg-gradient-to-r from-green-600 to-emerald-600' 
              : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 group-hover:opacity-100'
          }`}></div>
          
          {/* 按钮文字 */}
          <span className="relative flex items-center justify-center gap-2 text-white font-bold">
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                发送中...
              </>
            ) : submitted ? (
              <>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                已发送！
              </>
            ) : (
              <>
                发送消息
                <svg className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </span>
        </button>
      </form>
    </div>
  );
}
