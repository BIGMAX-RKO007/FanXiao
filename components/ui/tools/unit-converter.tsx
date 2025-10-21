'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight } from 'lucide-react';

type ConversionType = 'length' | 'weight' | 'temperature' | 'css';

interface ConversionUnit {
  name: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

export default function UnitConverter() {
  const [type, setType] = useState<ConversionType>('css');
  const [fromUnit, setFromUnit] = useState('px');
  const [toUnit, setToUnit] = useState('rem');
  const [inputValue, setInputValue] = useState('16');
  const [result, setResult] = useState('');

  const conversions: Record<ConversionType, Record<string, ConversionUnit>> = {
    css: {
      px: {
        name: '像素 (px)',
        toBase: (v) => v,
        fromBase: (v) => v
      },
      rem: {
        name: '根元素 (rem)',
        toBase: (v) => v * 16,
        fromBase: (v) => v / 16
      },
      em: {
        name: '相对单位 (em)',
        toBase: (v) => v * 16,
        fromBase: (v) => v / 16
      },
      pt: {
        name: '点 (pt)',
        toBase: (v) => v * 1.333,
        fromBase: (v) => v / 1.333
      },
      '%': {
        name: '百分比 (%)',
        toBase: (v) => v * 0.16,
        fromBase: (v) => v / 0.16
      }
    },
    length: {
      m: {
        name: '米 (m)',
        toBase: (v) => v,
        fromBase: (v) => v
      },
      km: {
        name: '千米 (km)',
        toBase: (v) => v * 1000,
        fromBase: (v) => v / 1000
      },
      cm: {
        name: '厘米 (cm)',
        toBase: (v) => v / 100,
        fromBase: (v) => v * 100
      },
      mm: {
        name: '毫米 (mm)',
        toBase: (v) => v / 1000,
        fromBase: (v) => v * 1000
      },
      mile: {
        name: '英里 (mile)',
        toBase: (v) => v * 1609.34,
        fromBase: (v) => v / 1609.34
      },
      yard: {
        name: '码 (yard)',
        toBase: (v) => v * 0.9144,
        fromBase: (v) => v / 0.9144
      },
      foot: {
        name: '英尺 (ft)',
        toBase: (v) => v * 0.3048,
        fromBase: (v) => v / 0.3048
      },
      inch: {
        name: '英寸 (inch)',
        toBase: (v) => v * 0.0254,
        fromBase: (v) => v / 0.0254
      }
    },
    weight: {
      kg: {
        name: '千克 (kg)',
        toBase: (v) => v,
        fromBase: (v) => v
      },
      g: {
        name: '克 (g)',
        toBase: (v) => v / 1000,
        fromBase: (v) => v * 1000
      },
      mg: {
        name: '毫克 (mg)',
        toBase: (v) => v / 1000000,
        fromBase: (v) => v * 1000000
      },
      ton: {
        name: '吨 (t)',
        toBase: (v) => v * 1000,
        fromBase: (v) => v / 1000
      },
      lb: {
        name: '磅 (lb)',
        toBase: (v) => v * 0.453592,
        fromBase: (v) => v / 0.453592
      },
      oz: {
        name: '盎司 (oz)',
        toBase: (v) => v * 0.0283495,
        fromBase: (v) => v / 0.0283495
      }
    },
    temperature: {
      celsius: {
        name: '摄氏度 (°C)',
        toBase: (v) => v,
        fromBase: (v) => v
      },
      fahrenheit: {
        name: '华氏度 (°F)',
        toBase: (v) => (v - 32) * 5 / 9,
        fromBase: (v) => v * 9 / 5 + 32
      },
      kelvin: {
        name: '开尔文 (K)',
        toBase: (v) => v - 273.15,
        fromBase: (v) => v + 273.15
      }
    }
  };

  const convert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult('请输入有效数字');
      return;
    }

    const fromConversion = conversions[type][fromUnit];
    const toConversion = conversions[type][toUnit];

    const baseValue = fromConversion.toBase(value);
    const convertedValue = toConversion.fromBase(baseValue);

    setResult(convertedValue.toFixed(4));
  };

  const swap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    if (result) {
      setInputValue(result);
      setResult(inputValue);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* 转换类型选择 */}
      <div className="flex gap-2 flex-wrap">
        {[
          { value: 'css', label: 'CSS 单位' },
          { value: 'length', label: '长度' },
          { value: 'weight', label: '重量' },
          { value: 'temperature', label: '温度' }
        ].map((item) => (
          <Button
            key={item.value}
            onClick={() => {
              setType(item.value as ConversionType);
              const units = Object.keys(conversions[item.value as ConversionType]);
              setFromUnit(units[0]);
              setToUnit(units[1]);
              setResult('');
            }}
            variant={type === item.value ? 'default' : 'outline'}
            size="sm"
            className={type === item.value ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white' : ''}
          >
            {item.label}
          </Button>
        ))}
      </div>

      {/* 转换输入 */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入数值..."
            className="flex-1 px-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {Object.entries(conversions[type]).map(([key, unit]) => (
              <option key={key} value={key}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>

        {/* 交换按钮 */}
        <div className="flex justify-center">
          <Button onClick={swap} variant="outline" size="sm">
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={result}
            readOnly
            placeholder="转换结果"
            className="flex-1 px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg"
          />
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {Object.entries(conversions[type]).map(([key, unit]) => (
              <option key={key} value={key}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 转换按钮 */}
      <Button
        onClick={convert}
        disabled={!inputValue}
        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
      >
        <ArrowLeftRight className="mr-2 h-4 w-4" />
        转换
      </Button>
    </div>
  );
}
