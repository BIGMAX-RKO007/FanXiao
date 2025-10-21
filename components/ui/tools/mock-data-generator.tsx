'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy, Users } from 'lucide-react';

type DataType = 'user' | 'product' | 'order' | 'address';

export default function MockDataGenerator() {
  const [dataType, setDataType] = useState<DataType>('user');
  const [count, setCount] = useState(5);
  const [generated, setGenerated] = useState('');
  const [copied, setCopied] = useState(false);

  const generateRandomUser = () => ({
    id: Math.floor(Math.random() * 10000),
    name: ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams', 'Charlie Brown'][Math.floor(Math.random() * 5)],
    email: `user${Math.floor(Math.random() * 1000)}@example.com`,
    age: Math.floor(Math.random() * 50) + 18,
    phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    isActive: Math.random() > 0.5
  });

  const generateRandomProduct = () => ({
    id: Math.floor(Math.random() * 10000),
    name: ['Laptop', 'Phone', 'Tablet', 'Monitor', 'Keyboard', 'Mouse'][Math.floor(Math.random() * 6)],
    price: +(Math.random() * 1000 + 50).toFixed(2),
    category: ['Electronics', 'Accessories', 'Software'][Math.floor(Math.random() * 3)],
    stock: Math.floor(Math.random() * 100),
    rating: +(Math.random() * 2 + 3).toFixed(1)
  });

  const generateRandomOrder = () => ({
    orderId: `ORD-${Math.floor(Math.random() * 100000)}`,
    customerId: Math.floor(Math.random() * 10000),
    total: +(Math.random() * 500 + 20).toFixed(2),
    status: ['pending', 'shipped', 'delivered', 'cancelled'][Math.floor(Math.random() * 4)],
    items: Math.floor(Math.random() * 5) + 1,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  });

  const generateRandomAddress = () => ({
    street: `${Math.floor(Math.random() * 9999) + 1} ${['Main', 'Oak', 'Pine', 'Maple', 'Cedar'][Math.floor(Math.random() * 5)]} Street`,
    city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 5)],
    state: ['NY', 'CA', 'IL', 'TX', 'AZ'][Math.floor(Math.random() * 5)],
    zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
    country: 'USA'
  });

  const generate = () => {
    const data = [];
    for (let i = 0; i < count; i++) {
      switch (dataType) {
        case 'user':
          data.push(generateRandomUser());
          break;
        case 'product':
          data.push(generateRandomProduct());
          break;
        case 'order':
          data.push(generateRandomOrder());
          break;
        case 'address':
          data.push(generateRandomAddress());
          break;
      }
    }
    setGenerated(JSON.stringify(data, null, 2));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-4">
      {/* 数据类型选择 */}
      <div className="flex gap-2 flex-wrap">
        {[
          { value: 'user', label: '用户' },
          { value: 'product', label: '商品' },
          { value: 'order', label: '订单' },
          { value: 'address', label: '地址' }
        ].map((type) => (
          <Button
            key={type.value}
            onClick={() => setDataType(type.value as DataType)}
            variant={dataType === type.value ? 'default' : 'outline'}
            size="sm"
            className={dataType === type.value ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white' : ''}
          >
            {type.label}
          </Button>
        ))}
      </div>

      {/* 数量选择 */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
          生成数量 ({count})
        </label>
        <input
          type="range"
          min="1"
          max="20"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>

      {/* 生成按钮 */}
      <Button
        onClick={generate}
        className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white"
      >
        <Users className="mr-2 h-4 w-4" />
        生成 Mock 数据
      </Button>

      {/* 生成结果 */}
      {generated && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              生成的数据 (JSON)
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
          <pre className="p-4 bg-gray-900 text-pink-400 rounded-lg overflow-x-auto text-sm font-mono border border-gray-700 max-h-96 overflow-y-auto">
            {generated}
          </pre>
        </div>
      )}
    </div>
  );
}
