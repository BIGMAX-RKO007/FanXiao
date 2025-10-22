import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: '所有字段都是必填的' }, { status: 400 });
    }

    const fs = require('fs');
    const path = require('path');
    
    const dataDir = path.join(process.cwd(), 'data');
    const jsonPath = path.join(dataDir, 'contacts.json');  // 👈 JSON 格式
    
    // 确保文件夹存在
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // 创建新消息对象
    const newContact = {
      id: Date.now(),
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Tokyo' })
    };
    
    // 读取现有数据
    let contacts = [];
    if (fs.existsSync(jsonPath)) {
      try {
        const fileContent = fs.readFileSync(jsonPath, 'utf-8');
        contacts = JSON.parse(fileContent);
      } catch (err) {
        console.warn('⚠️ JSON 文件损坏，重新创建');
        contacts = [];
      }
    }
    
    // 添加新消息
    contacts.push(newContact);
    
    // 保存为 JSON（格式化，方便阅读）
    fs.writeFileSync(jsonPath, JSON.stringify(contacts, null, 2), 'utf-8');

    console.log(`✅ 消息已保存! 总计 ${contacts.length} 条`);

    return NextResponse.json({ 
      success: true, 
      message: '消息发送成功！',
      total: contacts.length
    });

  } catch (error) {
    console.error('❌ 错误:', error);
    return NextResponse.json(
      { error: '服务器错误', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
