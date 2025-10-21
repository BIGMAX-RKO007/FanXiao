'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy, Code2, Search } from 'lucide-react';

type Language = 'javascript' | 'typescript' | 'python' | 'java' | 'go' | 'react';
type Category = 'class' | 'function' | 'pattern' | 'async' | 'data-structure' | 'react';

interface Snippet {
  name: string;
  language: Language;
  category: Category;
  description: string;
  code: string;
  tags: string[];
}

export default function CodeSnippets() {
  const [language, setLanguage] = useState<Language>('javascript');
  const [category, setCategory] = useState<Category>('class');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);
  const [copied, setCopied] = useState(false);

  const snippets: Snippet[] = [
    // JavaScript/TypeScript - 类相关
    {
      name: 'ES6 类基础模板',
      language: 'javascript',
      category: 'class',
      description: 'ES6 类的基本结构',
      tags: ['class', 'constructor', 'method'],
      code: `class ClassName {
  constructor(param1, param2) {
    this.param1 = param1;
    this.param2 = param2;
    this._privateVar = null;
  }

  // Getter
  get privateVar() {
    return this._privateVar;
  }

  // Setter
  set privateVar(value) {
    this._privateVar = value;
  }

  // 公共方法
  publicMethod() {
    console.log('Public method called');
    return this._privateMethod();
  }

  // 私有方法
  _privateMethod() {
    return 'Private method result';
  }

  // 静态方法
  static staticMethod() {
    return 'Static method called';
  }
}

// 使用示例
const instance = new ClassName('value1', 'value2');
instance.publicMethod();
ClassName.staticMethod();`
    },
    {
      name: '类继承',
      language: 'javascript',
      category: 'class',
      description: '类的继承和方法重写',
      tags: ['extends', 'super', 'inheritance'],
      code: `class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(\`\${this.name} makes a sound.\`);
  }

  move(distance = 0) {
    console.log(\`\${this.name} moved \${distance}m.\`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 调用父类构造函数
    this.breed = breed;
  }

  // 重写父类方法
  speak() {
    console.log(\`\${this.name} barks.\`);
  }

  // 新增方法
  fetch() {
    console.log(\`\${this.name} is fetching!\`);
  }
}

// 使用示例
const dog = new Dog('Max', 'Golden Retriever');
dog.speak();  // Max barks.
dog.move(10); // Max moved 10m.
dog.fetch();  // Max is fetching!`
    },

    // TypeScript - 接口和类型
    {
      name: 'TypeScript 接口定义',
      language: 'typescript',
      category: 'class',
      description: 'TypeScript 接口和类型定义',
      tags: ['interface', 'type', 'generic'],
      code: `// 基础接口
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // 可选属性
  readonly createdAt: Date; // 只读属性
}

// 接口继承
interface Admin extends User {
  role: 'admin' | 'superadmin';
  permissions: string[];
}

// 函数接口
interface SearchFunc {
  (source: string, subString: string): boolean;
}

// 泛型接口
interface GenericResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// 类型别名
type ID = string | number;
type Callback = (data: any) => void;

// 联合类型
type Status = 'pending' | 'approved' | 'rejected';

// 交叉类型
type Employee = User & {
  employeeId: string;
  department: string;
};

// 使用示例
const user: User = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  createdAt: new Date()
};

const response: GenericResponse<User> = {
  success: true,
  data: user
};`
    },
    {
      name: 'TypeScript 泛型类',
      language: 'typescript',
      category: 'class',
      description: '使用泛型的 TypeScript 类',
      tags: ['generic', 'class', 'typescript'],
      code: `class DataStore<T> {
  private data: T[] = [];

  add(item: T): void {
    this.data.push(item);
  }

  remove(item: T): void {
    const index = this.data.indexOf(item);
    if (index > -1) {
      this.data.splice(index, 1);
    }
  }

  get(index: number): T | undefined {
    return this.data[index];
  }

  getAll(): T[] {
    return [...this.data];
  }

  find(predicate: (item: T) => boolean): T | undefined {
    return this.data.find(predicate);
  }

  filter(predicate: (item: T) => boolean): T[] {
    return this.data.filter(predicate);
  }

  clear(): void {
    this.data = [];
  }

  get length(): number {
    return this.data.length;
  }
}

// 使用示例
interface Product {
  id: number;
  name: string;
  price: number;
}

const productStore = new DataStore<Product>();
productStore.add({ id: 1, name: 'Laptop', price: 999 });
productStore.add({ id: 2, name: 'Mouse', price: 29 });

const expensive = productStore.filter(p => p.price > 100);
console.log(expensive);`
    },

    // 异步编程
    {
      name: 'Promise 封装',
      language: 'javascript',
      category: 'async',
      description: 'Promise 的常用封装模式',
      tags: ['promise', 'async', 'error-handling'],
      code: `// Promise 封装函数
function asyncOperation(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data) {
        resolve({ success: true, data });
      } else {
        reject(new Error('No data provided'));
      }
    }, 1000);
  });
}

// Promise.all - 并行执行
async function fetchMultipleData() {
  try {
    const [users, posts, comments] = await Promise.all([
      fetch('/api/users').then(r => r.json()),
      fetch('/api/posts').then(r => r.json()),
      fetch('/api/comments').then(r => r.json())
    ]);
    
    return { users, posts, comments };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}

// Promise.race - 超时控制
function fetchWithTimeout(url, timeout = 5000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ]);
}

// 重试机制
async function retryOperation(fn, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
      console.log(\`Retry \${i + 1}/\${maxRetries}\`);
    }
  }
}

// 使用示例
async function main() {
  try {
    const result = await retryOperation(
      () => asyncOperation('test data'),
      3,
      1000
    );
    console.log('Success:', result);
  } catch (error) {
    console.error('Failed:', error);
  }
}`
    },
    {
      name: 'Async/Await 模式',
      language: 'javascript',
      category: 'async',
      description: 'async/await 的最佳实践',
      tags: ['async', 'await', 'try-catch'],
      code: `// 基础 async/await
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// 串行执行
async function processInSequence(items) {
  const results = [];
  
  for (const item of items) {
    const result = await processItem(item);
    results.push(result);
  }
  
  return results;
}

// 并行执行（受限并发）
async function processWithConcurrency(items, concurrency = 5) {
  const results = [];
  
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map(item => processItem(item))
    );
    results.push(...batchResults);
  }
  
  return results;
}

// 错误处理包装
async function safeAsync(fn, fallbackValue = null) {
  try {
    return await fn();
  } catch (error) {
    console.error('Error in async operation:', error);
    return fallbackValue;
  }
}

// 使用示例
async function main() {
  // 串行执行
  const user = await fetchUserData(1);
  const posts = await fetchUserPosts(user.id);
  
  // 并行执行
  const [userData, postData, commentData] = await Promise.all([
    fetchUserData(1),
    fetchPosts(),
    fetchComments()
  ]);
  
  // 安全执行
  const result = await safeAsync(
    () => riskyOperation(),
    { default: 'value' }
  );
}`
    },

    // 设计模式
    {
      name: '单例模式',
      language: 'javascript',
      category: 'pattern',
      description: 'Singleton 单例模式实现',
      tags: ['singleton', 'pattern', 'design-pattern'],
      code: `// 方法1：闭包实现
const Singleton = (function() {
  let instance;

  function createInstance() {
    const object = {
      name: 'Singleton Instance',
      data: [],
      
      addData(item) {
        this.data.push(item);
      },
      
      getData() {
        return this.data;
      }
    };
    return object;
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

// 方法2：类实现
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    
    this.connection = null;
    this.isConnected = false;
    Database.instance = this;
  }

  connect() {
    if (!this.isConnected) {
      console.log('Connecting to database...');
      this.connection = { /* connection object */ };
      this.isConnected = true;
    }
    return this.connection;
  }

  disconnect() {
    if (this.isConnected) {
      console.log('Disconnecting from database...');
      this.connection = null;
      this.isConnected = false;
    }
  }
}

// 使用示例
const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true

const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();
console.log(singleton1 === singleton2); // true`
    },
    {
      name: '工厂模式',
      language: 'javascript',
      category: 'pattern',
      description: 'Factory 工厂模式实现',
      tags: ['factory', 'pattern', 'design-pattern'],
      code: `// 简单工厂模式
class Car {
  constructor(model, year) {
    this.model = model;
    this.year = year;
  }

  getInfo() {
    return \`\${this.year} \${this.model}\`;
  }
}

class Truck {
  constructor(model, year, capacity) {
    this.model = model;
    this.year = year;
    this.capacity = capacity;
  }

  getInfo() {
    return \`\${this.year} \${this.model} (\${this.capacity}t)\`;
  }
}

class VehicleFactory {
  static createVehicle(type, options) {
    switch(type) {
      case 'car':
        return new Car(options.model, options.year);
      case 'truck':
        return new Truck(options.model, options.year, options.capacity);
      default:
        throw new Error(\`Unknown vehicle type: \${type}\`);
    }
  }
}

// 抽象工厂模式
class Button {
  render() { throw new Error('Must implement render'); }
}

class WindowsButton extends Button {
  render() {
    return '<button class="windows-btn">Windows Button</button>';
  }
}

class MacButton extends Button {
  render() {
    return '<button class="mac-btn">Mac Button</button>';
  }
}

class UIFactory {
  static createButton(os) {
    switch(os) {
      case 'windows':
        return new WindowsButton();
      case 'mac':
        return new MacButton();
      default:
        throw new Error(\`Unknown OS: \${os}\`);
    }
  }
}

// 使用示例
const myCar = VehicleFactory.createVehicle('car', {
  model: 'Tesla Model 3',
  year: 2024
});

const myTruck = VehicleFactory.createVehicle('truck', {
  model: 'Ford F-150',
  year: 2024,
  capacity: 1.5
});

const winButton = UIFactory.createButton('windows');
console.log(winButton.render());`
    },
    {
      name: '观察者模式',
      language: 'javascript',
      category: 'pattern',
      description: 'Observer 观察者模式实现',
      tags: ['observer', 'pattern', 'event'],
      code: `// 观察者模式实现
class EventEmitter {
  constructor() {
    this.events = {};
  }

  // 订阅事件
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return () => this.off(event, listener);
  }

  // 一次性订阅
  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }

  // 取消订阅
  off(event, listenerToRemove) {
    if (!this.events[event]) return;
    
    this.events[event] = this.events[event].filter(
      listener => listener !== listenerToRemove
    );
  }

  // 触发事件
  emit(event, ...args) {
    if (!this.events[event]) return;
    
    this.events[event].forEach(listener => {
      listener(...args);
    });
  }

  // 清除所有监听器
  removeAllListeners(event) {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
  }
}

// 具体应用示例
class UserService extends EventEmitter {
  constructor() {
    super();
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
    this.emit('userAdded', user);
  }

  removeUser(userId) {
    const user = this.users.find(u => u.id === userId);
    this.users = this.users.filter(u => u.id !== userId);
    this.emit('userRemoved', user);
  }
}

// 使用示例
const userService = new UserService();

// 订阅事件
userService.on('userAdded', (user) => {
  console.log('User added:', user);
  // 发送欢迎邮件
});

userService.on('userRemoved', (user) => {
  console.log('User removed:', user);
  // 清理用户数据
});

// 一次性订阅
userService.once('userAdded', (user) => {
  console.log('First user added:', user);
});

// 触发事件
userService.addUser({ id: 1, name: 'John' });
userService.removeUser(1);`
    },

    // Python
    {
      name: 'Python 类模板',
      language: 'python',
      category: 'class',
      description: 'Python 类的基本结构',
      tags: ['class', 'property', 'magic-method'],
      code: `class Person:
    """Person 类示例"""
    
    # 类变量
    species = "Homo sapiens"
    
    def __init__(self, name, age):
        """构造函数"""
        self.name = name
        self.age = age
        self._private_var = None
    
    # Property 装饰器
    @property
    def private_var(self):
        """Getter"""
        return self._private_var
    
    @private_var.setter
    def private_var(self, value):
        """Setter"""
        if value < 0:
            raise ValueError("Value must be positive")
        self._private_var = value
    
    # 实例方法
    def introduce(self):
        """介绍自己"""
        return f"Hi, I'm {self.name}, {self.age} years old"
    
    # 类方法
    @classmethod
    def from_birth_year(cls, name, birth_year):
        """从出生年份创建实例"""
        from datetime import datetime
        age = datetime.now().year - birth_year
        return cls(name, age)
    
    # 静态方法
    @staticmethod
    def is_adult(age):
        """判断是否成年"""
        return age >= 18
    
    # 魔术方法
    def __str__(self):
        """字符串表示"""
        return f"Person({self.name}, {self.age})"
    
    def __repr__(self):
        """开发者表示"""
        return f"Person(name='{self.name}', age={self.age})"
    
    def __eq__(self, other):
        """相等比较"""
        if not isinstance(other, Person):
            return False
        return self.name == other.name and self.age == other.age

# 使用示例
person1 = Person("Alice", 30)
person2 = Person.from_birth_year("Bob", 1995)

print(person1.introduce())
print(Person.is_adult(person1.age))
print(person1)`
    },
    {
      name: 'Python 装饰器',
      language: 'python',
      category: 'function',
      description: 'Python 装饰器模式',
      tags: ['decorator', 'function', 'wrapper'],
      code: `import functools
import time
from typing import Callable, Any

# 简单装饰器
def timer(func):
    """计时装饰器"""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.4f}s")
        return result
    return wrapper

# 带参数的装饰器
def retry(max_attempts=3, delay=1):
    """重试装饰器"""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
                    print(f"Attempt {attempt + 1} failed: {e}")
                    time.sleep(delay)
        return wrapper
    return decorator

# 类装饰器
class Memoize:
    """缓存装饰器"""
    def __init__(self, func):
        self.func = func
        self.cache = {}
    
    def __call__(self, *args):
        if args not in self.cache:
            self.cache[args] = self.func(*args)
        return self.cache[args]

# 多装饰器组合
@timer
@retry(max_attempts=3, delay=1)
@Memoize
def expensive_operation(n):
    """耗时操作"""
    if n < 0:
        raise ValueError("n must be positive")
    time.sleep(0.1)
    return n ** 2

# 使用示例
result = expensive_operation(5)
print(f"Result: {result}")`
    },

    // React 组件
    {
      name: 'React 函数组件模板',
      language: 'react',
      category: 'react',
      description: 'React 函数组件最佳实践',
      tags: ['react', 'hooks', 'component'],
      code: `import React, { useState, useEffect, useCallback, useMemo } from 'react';

interface MyComponentProps {
  title: string;
  initialCount?: number;
  onCountChange?: (count: number) => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ 
  title, 
  initialCount = 0,
  onCountChange 
}) => {
  // State
  const [count, setCount] = useState(initialCount);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Effects
  useEffect(() => {
    // 组件挂载时执行
    console.log('Component mounted');
    
    return () => {
      // 组件卸载时清理
      console.log('Component unmounted');
    };
  }, []); // 空依赖数组，只执行一次

  useEffect(() => {
    // count 变化时通知父组件
    onCountChange?.(count);
  }, [count, onCountChange]);

  // Memoized 计算
  const expensiveValue = useMemo(() => {
    console.log('Computing expensive value...');
    return count * 2;
  }, [count]);

  // Callbacks
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const handleDecrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  // Conditional rendering
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="my-component">
      <h2>{title}</h2>
      <div>
        <p>Count: {count}</p>
        <p>Double: {expensiveValue}</p>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleIncrement}>+</button>
        <button onClick={fetchData}>Fetch Data</button>
      </div>
      <ul>
        {data.map((item, index) => (
          <li key={item.id || index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;`
    },
    {
      name: 'React 自定义 Hook',
      language: 'react',
      category: 'react',
      description: 'React 自定义 Hook 模板',
      tags: ['react', 'hook', 'custom-hook'],
      code: `import { useState, useEffect, useCallback, useRef } from 'react';

// 数据获取 Hook
export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// 本地存储 Hook
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
}

// 防抖 Hook
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// 前一个值 Hook
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

// 窗口尺寸 Hook
export function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// 使用示例
function MyComponent() {
  const { data, loading, error } = useFetch<User[]>('/api/users');
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const searchTerm = useDebounce(inputValue, 500);
  const previousCount = usePrevious(count);
  const { width, height } = useWindowSize();

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <UserList users={data} />}
    </div>
  );
}`
    },

    // Java
    {
      name: 'Java 类模板',
      language: 'java',
      category: 'class',
      description: 'Java 类的标准结构',
      tags: ['java', 'class', 'pojo'],
      code: `package com.example.model;

import java.io.Serializable;
import java.util.Objects;

/**
 * User 实体类
 * 
 * @author Your Name
 * @version 1.0
 */
public class User implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    // 字段
    private Long id;
    private String name;
    private String email;
    private Integer age;
    
    // 构造函数
    public User() {
    }
    
    public User(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public Integer getAge() {
        return age;
    }
    
    public void setAge(Integer age) {
        this.age = age;
    }
    
    // equals 和 hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) &&
               Objects.equals(email, user.email);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id, email);
    }
    
    // toString
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\\'' +
                ", email='" + email + '\\'' +
                ", age=" + age +
                '}';
    }
    
    // Builder 模式
    public static Builder builder() {
        return new Builder();
    }
    
    public static class Builder {
        private Long id;
        private String name;
        private String email;
        private Integer age;
        
        public Builder id(Long id) {
            this.id = id;
            return this;
        }
        
        public Builder name(String name) {
            this.name = name;
            return this;
        }
        
        public Builder email(String email) {
            this.email = email;
            return this;
        }
        
        public Builder age(Integer age) {
            this.age = age;
            return this;
        }
        
        public User build() {
            User user = new User();
            user.id = this.id;
            user.name = this.name;
            user.email = this.email;
            user.age = this.age;
            return user;
        }
    }
}

// 使用示例
// User user = User.builder()
//     .id(1L)
//     .name("John")
//     .email("john@example.com")
//     .age(30)
//     .build();`
    },

    // Go
    {
      name: 'Go 结构体模板',
      language: 'go',
      category: 'class',
      description: 'Go 结构体和方法',
      tags: ['go', 'struct', 'method'],
      code: `package main

import (
    "fmt"
    "time"
)

// User 结构体定义
type User struct {
    ID        int64
    Name      string
    Email     string
    Age       int
    CreatedAt time.Time
}

// 构造函数
func NewUser(name, email string, age int) *User {
    return &User{
        Name:      name,
        Email:     email,
        Age:       age,
        CreatedAt: time.Now(),
    }
}

// 值接收者方法
func (u User) GetInfo() string {
    return fmt.Sprintf("%s (%s)", u.Name, u.Email)
}

// 指针接收者方法
func (u *User) UpdateEmail(email string) {
    u.Email = email
}

// 接口定义
type Greeter interface {
    Greet() string
}

// 实现接口
func (u User) Greet() string {
    return fmt.Sprintf("Hello, I'm %s", u.Name)
}

// 嵌入式结构体
type Employee struct {
    User                // 嵌入 User
    EmployeeID string
    Department string
}

// 方法重写
func (e Employee) GetInfo() string {
    return fmt.Sprintf("%s - %s (%s)", 
        e.Name, e.EmployeeID, e.Department)
}

// 使用示例
func main() {
    // 创建用户
    user := NewUser("Alice", "alice@example.com", 30)
    fmt.Println(user.GetInfo())
    
    // 更新邮箱
    user.UpdateEmail("newemail@example.com")
    
    // 接口使用
    var greeter Greeter = user
    fmt.Println(greeter.Greet())
    
    // 嵌入式结构体
    emp := Employee{
        User:       *user,
        EmployeeID: "E001",
        Department: "Engineering",
    }
    fmt.Println(emp.GetInfo())
}`
    }
  ];

  const filteredSnippets = snippets.filter(s => {
    const matchesLanguage = s.language === language;
    const matchesCategory = s.category === category;
    const matchesSearch = searchTerm === '' || 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesLanguage && matchesCategory && matchesSearch;
  });

  const copyToClipboard = () => {
    if (selectedSnippet) {
      navigator.clipboard.writeText(selectedSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* 语言选择 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          编程语言
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {[
            { value: 'javascript', label: 'JavaScript' },
            { value: 'typescript', label: 'TypeScript' },
            { value: 'python', label: 'Python' },
            { value: 'java', label: 'Java' },
            { value: 'go', label: 'Go' },
            { value: 'react', label: 'React' }
          ].map((lang) => (
            <Button
              key={lang.value}
              onClick={() => {
                setLanguage(lang.value as Language);
                setSelectedSnippet(null);
              }}
              variant={language === lang.value ? 'default' : 'outline'}
              size="sm"
              className={language === lang.value ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' : ''}
            >
              {lang.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 分类选择 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          代码分类
        </label>
        <div className="flex gap-2 flex-wrap">
          {[
            { value: 'class', label: '类与对象' },
            { value: 'function', label: '函数方法' },
            { value: 'pattern', label: '设计模式' },
            { value: 'async', label: '异步编程' },
            { value: 'data-structure', label: '数据结构' },
            { value: 'react', label: 'React' }
          ].map((cat) => (
            <Button
              key={cat.value}
              onClick={() => {
                setCategory(cat.value as Category);
                setSelectedSnippet(null);
              }}
              variant={category === cat.value ? 'default' : 'outline'}
              size="sm"
              className={category === cat.value ? 'bg-indigo-600 text-white' : ''}
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
          placeholder="搜索代码片段..."
          className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* 代码片段列表 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          代码片段 ({filteredSnippets.length} 个)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          {filteredSnippets.map((snippet, index) => (
            <button
              key={index}
              onClick={() => setSelectedSnippet(snippet)}
              className={`text-left p-3 rounded-lg border-2 transition-all ${
                selectedSnippet?.name === snippet.name
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500'
                  : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-indigo-300'
              }`}
            >
              <div className="font-semibold text-sm text-gray-800 dark:text-gray-100 mb-1">
                {snippet.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {snippet.description}
              </div>
              <div className="flex gap-1 flex-wrap">
                {snippet.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
          {filteredSnippets.length === 0 && (
            <div className="col-span-2 text-center py-8 text-gray-500">
              未找到匹配的代码片段
            </div>
          )}
        </div>
      </div>

      {/* 代码显示 */}
      {selectedSnippet && (
        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-100">
                {selectedSnippet.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedSnippet.description}
              </p>
              <div className="flex gap-1 mt-1">
                {selectedSnippet.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
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

          <pre className="p-4 bg-gray-900 text-cyan-400 rounded-lg overflow-x-auto text-xs font-mono border border-gray-700 max-h-96 overflow-y-auto">
            {selectedSnippet.code}
          </pre>
        </div>
      )}

      {/* 提示信息 */}
      <div className="text-xs text-gray-500 dark:text-gray-400 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg border border-indigo-200 dark:border-indigo-800">
        <p className="font-semibold mb-1">💡 使用提示</p>
        <ul className="list-disc list-inside space-y-1">
          <li>包含常用类模板、设计模式、异步编程等代码片段</li>
          <li>支持 JavaScript、TypeScript、Python、Java、Go、React</li>
          <li>可通过关键词搜索快速找到需要的代码</li>
          <li>所有代码都包含详细注释和使用示例</li>
        </ul>
      </div>
    </div>
  );
}
