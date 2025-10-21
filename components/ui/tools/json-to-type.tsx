'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy, Code2 } from 'lucide-react';

type Language = 'typescript' | 'java' | 'go' | 'python';

export default function JsonToType() {
  const [json, setJson] = useState('');
  const [language, setLanguage] = useState<Language>('typescript');
  const [typeName, setTypeName] = useState('MyType');
  const [generated, setGenerated] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const jsonToTypescript = (obj: any, name: string): string => {
    let result = `interface ${name} {\n`;
    for (const [key, value] of Object.entries(obj)) {
      const type = Array.isArray(value) ? `${typeof value[0]}[]` : 
                   typeof value === 'object' ? 'object' : typeof value;
      result += `  ${key}: ${type};\n`;
    }
    result += '}';
    return result;
  };

  const jsonToJava = (obj: any, name: string): string => {
    let result = `public class ${name} {\n`;
    for (const [key, value] of Object.entries(obj)) {
      const javaType = typeof value === 'number' ? 'int' :
                       typeof value === 'boolean' ? 'boolean' :
                       Array.isArray(value) ? 'List<String>' : 'String';
      result += `  private ${javaType} ${key};\n`;
    }
    result += '}';
    return result;
  };

  const jsonToGo = (obj: any, name: string): string => {
    let result = `type ${name} struct {\n`;
    for (const [key, value] of Object.entries(obj)) {
      const goType = typeof value === 'number' ? 'int' :
                     typeof value === 'boolean' ? 'bool' :
                     Array.isArray(value) ? '[]string' : 'string';
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      result += `  ${capitalizedKey} ${goType} \`json:"${key}"\`\n`;
    }
    result += '}';
    return result;
  };

  const jsonToPython = (obj: any, name: string): string => {
    let result = `from dataclasses import dataclass\nfrom typing import List\n\n@dataclass\nclass ${name}:\n`;
    for (const [key, value] of Object.entries(obj)) {
      const pyType = typeof value === 'number' ? 'int' :
                     typeof value === 'boolean' ? 'bool' :
                     Array.isArray(value) ? 'List[str]' : 'str';
      result += `    ${key}: ${pyType}\n`;
    }
    return result;
  };

  const generate = () => {
    try {
      const parsed = JSON.parse(json);
      let result = '';
      
      switch (language) {
        case 'typescript':
          result = jsonToTypescript(parsed, typeName);
          break;
        case 'java':
          result = jsonToJava(parsed, typeName);
          break;
        case 'go':
          result = jsonToGo(parsed, typeName);
          break;
        case 'python':
          result = jsonToPython(parsed, typeName);
          break;
      }
      
      setGenerated(result);
      setError('');
    } catch (e) {
      setError('JSON 格式错误');
      setGenerated('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-4">
      {/* 语言选择 */}
      <div className="flex gap-2 flex-wrap">
        {[
          { value: 'typescript', label: 'TypeScript' },
          { value: 'java', label: 'Java' },
          { value: 'go', label: 'Go' },
          { value: 'python', label: 'Python' }
        ].map((lang) => (
          <Button
            key={lang.value}
            onClick={() => setLanguage(lang.value as Language)}
            variant={language === lang.value ? 'default' : 'outline'}
            size="sm"
            className={language === lang.value ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white' : ''}
          >
            {lang.label}
          </Button>
        ))}
      </div>

      {/* 类型名称 */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
          类型名称
        </label>
        <input
          type="text"
          value={typeName}
          onChange={(e) => setTypeName(e.target.value)}
          className="w-full px-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* JSON 输入 */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
          输入 JSON
        </label>
        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          placeholder='{"name": "John", "age": 30, "email": "john@example.com"}'
          className="w-full h-32 px-4 py-3 text-sm font-mono bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
        />
      </div>

      {/* 生成按钮 */}
      <Button
        onClick={generate}
        disabled={!json || !typeName}
        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
      >
        <Code2 className="mr-2 h-4 w-4" />
        生成类型定义
      </Button>

      {/* 错误提示 */}
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      {/* 生成结果 */}
      {generated && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              生成的代码
            </label>
            <Button onClick={copyToClipboard} variant="outline" size="sm">
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
          <pre className="p-4 bg-gray-900 text-cyan-400 rounded-lg overflow-x-auto text-sm font-mono border border-gray-700">
            {generated}
          </pre>
        </div>
      )}
    </div>
  );
}
