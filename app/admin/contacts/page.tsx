import { readFile } from 'fs/promises';
import path from 'path';

// 🎯 定义联系人类型
interface Contact {
  id?: number;
  name: string;
  email: string;
  message: string;
  timestamp?: string;
  date: string;
}

export default async function AdminContactsPage() {
  let contacts: Contact[] = [];  // 👈 添加类型
  
  try {
    const filePath = path.join(process.cwd(), 'data', 'contacts.json');
    const fileContent = await readFile(filePath, 'utf-8');
    contacts = JSON.parse(fileContent);
  } catch (error) {
    console.error('读取失败:', error);
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          收到的消息 ({contacts.length})
        </h1>
        
        <div className="space-y-4">
          {contacts.reverse().map((contact: Contact, index: number) => (  // 👈 添加类型
            <div key={contact.id || index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {contact.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {contact.email}
                  </p>
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {contact.date}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {contact.message}
              </p>
            </div>
          ))}

          {/* 空状态 */}
          {contacts.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p className="text-lg">还没有收到消息</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
