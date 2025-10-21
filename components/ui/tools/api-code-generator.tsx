'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy, Code } from 'lucide-react';

type Language = 'curl' | 'javascript' | 'python' | 'java' | 'go';
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export default function ApiCodeGenerator() {
  const [method, setMethod] = useState<Method>('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState('');
  const [body, setBody] = useState('');
  const [language, setLanguage] = useState<Language>('curl');
  const [generated, setGenerated] = useState('');
  const [copied, setCopied] = useState(false);

  const generateCurl = () => {
    let code = `curl -X ${method} "${url}"`;
    
    if (headers) {
      headers.split('\n').forEach(h => {
        const [key, value] = h.split(':').map(s => s.trim());
        if (key && value) code += ` \\\n  -H "${key}: ${value}"`;
      });
    }
    
    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      code += ` \\\n  -d '${body}'`;
    }
    
    return code;
  };

  const generateJavaScript = () => {
    let code = `fetch('${url}', {\n  method: '${method}'`;
    
    if (headers) {
      code += ',\n  headers: {\n';
      headers.split('\n').forEach(h => {
        const [key, value] = h.split(':').map(s => s.trim());
        if (key && value) code += `    '${key}': '${value}',\n`;
      });
      code += '  }';
    }
    
    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      code += `,\n  body: JSON.stringify(${body})`;
    }
    
    code += '\n})\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error(error));';
    return code;
  };

  const generatePython = () => {
    let code = `import requests\n\n`;
    
    if (headers) {
      code += 'headers = {\n';
      headers.split('\n').forEach(h => {
        const [key, value] = h.split(':').map(s => s.trim());
        if (key && value) code += `    '${key}': '${value}',\n`;
      });
      code += '}\n\n';
    }
    
    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      code += `data = ${body}\n\n`;
    }
    
    code += `response = requests.${method.toLowerCase()}('${url}'`;
    if (headers) code += ', headers=headers';
    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      code += ', json=data';
    }
    code += ')\nprint(response.json())';
    
    return code;
  };

  const generateJava = () => {
    let code = `HttpClient client = HttpClient.newHttpClient();\n`;
    code += `HttpRequest.Builder builder = HttpRequest.newBuilder()\n    .uri(URI.create("${url}"))\n    .method("${method}", `;
    
    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      code += `HttpRequest.BodyPublishers.ofString("${body.replace(/"/g, '\\"')}")`;
    } else {
      code += 'HttpRequest.BodyPublishers.noBody()';
    }
    code += ')';
    
    if (headers) {
      headers.split('\n').forEach(h => {
        const [key, value] = h.split(':').map(s => s.trim());
        if (key && value) code += `\n    .header("${key}", "${value}")`;
      });
    }
    
    code += ';\n\nHttpRequest request = builder.build();\nHttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());\nSystem.out.println(response.body());';
    
    return code;
  };

  const generateGo = () => {
    let code = 'package main\n\nimport (\n    "fmt"\n    "net/http"\n';
    if (body) code += '    "bytes"\n';
    code += ')\n\nfunc main() {\n';
    
    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      code += `    jsonData := []byte(\`${body}\`)\n`;
      code += `    req, _ := http.NewRequest("${method}", "${url}", bytes.NewBuffer(jsonData))\n`;
    } else {
      code += `    req, _ := http.NewRequest("${method}", "${url}", nil)\n`;
    }
    
    if (headers) {
      headers.split('\n').forEach(h => {
        const [key, value] = h.split(':').map(s => s.trim());
        if (key && value) code += `    req.Header.Set("${key}", "${value}")\n`;
      });
    }
    
    code += '\n    client := &http.Client{}\n';
    code += '    resp, err := client.Do(req)\n';
    code += '    if err != nil {\n        panic(err)\n    }\n';
    code += '    defer resp.Body.Close()\n';
    code += '    fmt.Println("Status:", resp.Status)\n}';
    
    return code;
  };

  const generate = () => {
    let code = '';
    switch (language) {
      case 'curl':
        code = generateCurl();
        break;
      case 'javascript':
        code = generateJavaScript();
        break;
      case 'python':
        code = generatePython();
        break;
      case 'java':
        code = generateJava();
        break;
      case 'go':
        code = generateGo();
        break;
    }
    setGenerated(code);
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
          { value: 'curl', label: 'cURL' },
          { value: 'javascript', label: 'JavaScript' },
          { value: 'python', label: 'Python' },
          { value: 'java', label: 'Java' },
          { value: 'go', label: 'Go' }
        ].map((lang) => (
          <Button
            key={lang.value}
            onClick={() => setLanguage(lang.value as Language)}
            variant={language === lang.value ? 'default' : 'outline'}
            size="sm"
            className={language === lang.value ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white' : ''}
          >
            {lang.label}
          </Button>
        ))}
      </div>

      {/* HTTP 方法 */}
      <div className="flex gap-2">
        {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map((m) => (
          <Button
            key={m}
            onClick={() => setMethod(m as Method)}
            variant={method === m ? 'default' : 'outline'}
            size="sm"
            className={method === m ? 'bg-blue-600 text-white' : ''}
          >
            {m}
          </Button>
        ))}
      </div>

      {/* URL */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
          API URL
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/users"
          className="w-full px-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Headers */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
          Headers (每行一个，格式: Key: Value)
        </label>
        <textarea
          value={headers}
          onChange={(e) => setHeaders(e.target.value)}
          placeholder="Content-Type: application/json&#10;Authorization: Bearer token123"
          className="w-full h-20 px-4 py-3 text-sm font-mono bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
        />
      </div>

      {/* Body */}
      {(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            Request Body (JSON)
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder='{"name": "John", "email": "john@example.com"}'
            className="w-full h-24 px-4 py-3 text-sm font-mono bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
          />
        </div>
      )}

      {/* 生成按钮 */}
      <Button
        onClick={generate}
        disabled={!url}
        className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white"
      >
        <Code className="mr-2 h-4 w-4" />
        生成代码
      </Button>

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
          <pre className="p-4 bg-gray-900 text-yellow-400 rounded-lg overflow-x-auto text-sm font-mono border border-gray-700">
            {generated}
          </pre>
        </div>
      )}
    </div>
  );
}
