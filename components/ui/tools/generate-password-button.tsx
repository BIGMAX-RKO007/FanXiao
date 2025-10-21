'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Copy, Check, Eye, EyeOff } from 'lucide-react';

export default function GeneratePasswordButton() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // 密码选项
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false); // 排除相似字符 (0,O,l,1,I)
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false); // 排除易混淆符号 ({,},[,],\,|)
  
  // 密码强度
  const [strength, setStrength] = useState<'weak' | 'medium' | 'strong' | 'very-strong'>('medium');

  const generatePassword = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      let chars = '';
      
      // 基础字符集
      const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowercase = 'abcdefghijklmnopqrstuvwxyz';
      const numbers = '0123456789';
      const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      
      // 相似字符
      const similarChars = '0Ol1I';
      const ambiguousChars = '{}[]\\|';
      
      // 构建字符集
      if (includeUppercase) chars += uppercase;
      if (includeLowercase) chars += lowercase;
      if (includeNumbers) chars += numbers;
      if (includeSymbols) chars += symbols;
      
      // 排除相似或易混淆字符
      if (excludeSimilar) {
        chars = chars.split('').filter(c => !similarChars.includes(c)).join('');
      }
      if (excludeAmbiguous) {
        chars = chars.split('').filter(c => !ambiguousChars.includes(c)).join('');
      }
      
      // 如果没有选择任何字符集，使用默认
      if (!chars) {
        chars = uppercase + lowercase + numbers;
      }
      
      // 生成密码
      let pass = '';
      const array = new Uint32Array(length);
      crypto.getRandomValues(array);
      
      for (let i = 0; i < length; i++) {
        pass += chars.charAt(array[i] % chars.length);
      }
      
      // 确保至少包含每种选中的字符类型
      pass = ensureCharacterTypes(pass, chars, uppercase, lowercase, numbers, symbols);
      
      setPassword(pass);
      setShowPassword(true);
      setCopied(false);
      calculateStrength(pass);
      setIsGenerating(false);
    }, 300);
  };

  const ensureCharacterTypes = (
    pass: string,
    chars: string,
    uppercase: string,
    lowercase: string,
    numbers: string,
    symbols: string
  ) => {
    let result = pass;
    const positions = Array.from({ length: result.length }, (_, i) => i);
    
    // 打乱位置数组
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    
    let posIndex = 0;
    
    // 确保包含大写字母
    if (includeUppercase && !/[A-Z]/.test(result)) {
      const char = uppercase.charAt(Math.floor(Math.random() * uppercase.length));
      result = result.substring(0, positions[posIndex]) + char + result.substring(positions[posIndex] + 1);
      posIndex++;
    }
    
    // 确保包含小写字母
    if (includeLowercase && !/[a-z]/.test(result)) {
      const char = lowercase.charAt(Math.floor(Math.random() * lowercase.length));
      result = result.substring(0, positions[posIndex]) + char + result.substring(positions[posIndex] + 1);
      posIndex++;
    }
    
    // 确保包含数字
    if (includeNumbers && !/[0-9]/.test(result)) {
      const char = numbers.charAt(Math.floor(Math.random() * numbers.length));
      result = result.substring(0, positions[posIndex]) + char + result.substring(positions[posIndex] + 1);
      posIndex++;
    }
    
    // 确保包含符号
    if (includeSymbols && !/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(result)) {
      const char = symbols.charAt(Math.floor(Math.random() * symbols.length));
      result = result.substring(0, positions[posIndex]) + char + result.substring(positions[posIndex] + 1);
    }
    
    return result;
  };

  const calculateStrength = (pass: string) => {
    let score = 0;
    
    // 长度评分
    if (pass.length >= 8) score += 1;
    if (pass.length >= 12) score += 1;
    if (pass.length >= 16) score += 1;
    
    // 字符类型评分
    if (/[a-z]/.test(pass)) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    
    // 复杂度评分
    const uniqueChars = new Set(pass).size;
    if (uniqueChars >= pass.length * 0.6) score += 1;
    
    if (score <= 3) setStrength('weak');
    else if (score <= 5) setStrength('medium');
    else if (score <= 7) setStrength('strong');
    else setStrength('very-strong');
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStrengthColor = () => {
    switch (strength) {
      case 'weak': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'strong': return 'bg-blue-500';
      case 'very-strong': return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };

  const getStrengthText = () => {
    switch (strength) {
      case 'weak': return '弱';
      case 'medium': return '中等';
      case 'strong': return '强';
      case 'very-strong': return '非常强';
      default: return '';
    }
  };

  const getStrengthWidth = () => {
    switch (strength) {
      case 'weak': return 'w-1/4';
      case 'medium': return 'w-2/4';
      case 'strong': return 'w-3/4';
      case 'very-strong': return 'w-full';
      default: return 'w-0';
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* 密码长度滑块 */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            密码长度
          </label>
          <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">
            {length} 字符
          </span>
        </div>
        <input
          type="range"
          min="4"
          max="64"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-violet-600"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>4</span>
          <span>16</span>
          <span>32</span>
          <span>64</span>
        </div>
      </div>

      {/* 字符类型选项 */}
      <div className="grid grid-cols-2 gap-3">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
            className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-violet-600">
            大写字母 (A-Z)
          </span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
            className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-violet-600">
            小写字母 (a-z)
          </span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
            className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-violet-600">
            数字 (0-9)
          </span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
            className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-violet-600">
            符号 (!@#$%...)
          </span>
        </label>
      </div>

      {/* 高级选项 */}
      <div className="space-y-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">高级选项</p>
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={excludeSimilar}
            onChange={(e) => setExcludeSimilar(e.target.checked)}
            className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
          />
          <span className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-violet-600">
            排除相似字符 (0, O, l, 1, I)
          </span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={excludeAmbiguous}
            onChange={(e) => setExcludeAmbiguous(e.target.checked)}
            className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
          />
          <span className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-violet-600">
            排除易混淆符号 ({`{, }, [, ], \\, |`})
          </span>
        </label>
      </div>

      {/* 生成按钮 */}
      <Button
        onClick={generatePassword}
        disabled={isGenerating}
        className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white"
      >
        {isGenerating ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            生成中...
          </>
        ) : (
          <>
            <RefreshCw className="mr-2 h-4 w-4" />
            生成密码
          </>
        )}
      </Button>

      {/* 生成的密码 */}
      {password && showPassword && (
        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
          {/* 密码强度指示器 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                密码强度
              </span>
              <span className={`text-xs font-semibold ${
                strength === 'weak' ? 'text-red-600' :
                strength === 'medium' ? 'text-yellow-600' :
                strength === 'strong' ? 'text-blue-600' :
                'text-green-600'
              }`}>
                {getStrengthText()}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full ${getStrengthColor()} ${getStrengthWidth()} transition-all duration-500`}
              />
            </div>
          </div>

          {/* 密码显示 */}
          <div className="relative">
            <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/20 border-2 border-violet-200 dark:border-violet-800 rounded-lg">
              <code className="flex-1 text-lg font-mono font-bold text-violet-700 dark:text-violet-300 break-all select-all">
                {password}
              </code>
              <div className="flex gap-1">
                <Button
                  onClick={() => setShowPassword(!showPassword)}
                  variant="ghost"
                  size="sm"
                  className="shrink-0"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  onClick={copyToClipboard}
                  variant="ghost"
                  size="sm"
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* 密码信息 */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-center">
              <p className="text-gray-500 dark:text-gray-400">长度</p>
              <p className="font-semibold text-gray-800 dark:text-gray-100">{password.length}</p>
            </div>
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-center">
              <p className="text-gray-500 dark:text-gray-400">字符类型</p>
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {[includeUppercase, includeLowercase, includeNumbers, includeSymbols].filter(Boolean).length}
              </p>
            </div>
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-center">
              <p className="text-gray-500 dark:text-gray-400">唯一字符</p>
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {new Set(password).size}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
