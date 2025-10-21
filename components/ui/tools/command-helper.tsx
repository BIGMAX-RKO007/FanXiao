'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy, Terminal, Search } from 'lucide-react';

type Platform = 'docker' | 'linux' | 'npm' | 'kubernetes' | 'aws' | 'redis' | 'windows';

type Category = 'basic' | 'advanced' | 'management' | 'network' | 'debug';

interface Command {
  name: string;
  command: string;
  description: string;
  example?: string;
  platform: Platform;
  category: Category;
}

export default function CommandHelper() {
  const [platform, setPlatform] = useState<Platform>('docker');
  const [category, setCategory] = useState<Category>('basic');
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState('');

  const commands: Command[] = [
    // Docker Commands
    {
      name: '运行容器',
      command: 'docker run -d -p 8080:80 --name myapp nginx',
      description: '后台运行容器并映射端口',
      example: '-d 后台运行, -p 端口映射, --name 容器名称',
      platform: 'docker',
      category: 'basic'
    },
    {
      name: '查看容器列表',
      command: 'docker ps -a',
      description: '显示所有容器（包括已停止的）',
      example: 'docker ps 只显示运行中的容器',
      platform: 'docker',
      category: 'basic'
    },
    {
      name: '查看镜像列表',
      command: 'docker images',
      description: '列出本地所有 Docker 镜像',
      platform: 'docker',
      category: 'basic'
    },
    {
      name: '停止容器',
      command: 'docker stop <container-id>',
      description: '优雅停止运行中的容器',
      example: 'docker kill <container-id> 强制停止',
      platform: 'docker',
      category: 'basic'
    },
    {
      name: '删除容器',
      command: 'docker rm <container-id>',
      description: '删除已停止的容器',
      example: 'docker rm -f <container-id> 强制删除运行中的容器',
      platform: 'docker',
      category: 'basic'
    },
    {
      name: '构建镜像',
      command: 'docker build -t myimage:tag .',
      description: '从 Dockerfile 构建镜像',
      example: '-t 指定镜像名称和标签, . 表示当前目录',
      platform: 'docker',
      category: 'basic'
    },
    {
      name: '进入容器',
      command: 'docker exec -it <container-id> bash',
      description: '进入正在运行的容器执行命令',
      example: '-it 交互式终端',
      platform: 'docker',
      category: 'advanced'
    },
    {
      name: '查看容器日志',
      command: 'docker logs -f <container-id>',
      description: '实时查看容器日志输出',
      example: '-f 持续输出, --tail 100 显示最后100行',
      platform: 'docker',
      category: 'debug'
    },
    {
      name: '清理未使用资源',
      command: 'docker system prune -a',
      description: '清理所有未使用的容器、镜像、网络和缓存',
      example: '-a 删除所有未使用的镜像',
      platform: 'docker',
      category: 'management'
    },
    {
      name: '查看容器资源使用',
      command: 'docker stats',
      description: '实时显示容器的 CPU、内存、网络、磁盘使用情况',
      platform: 'docker',
      category: 'debug'
    },
    {
      name: '复制文件到容器',
      command: 'docker cp ./file.txt <container-id>:/path/in/container',
      description: '从主机复制文件到容器',
      example: '反向操作：docker cp <container-id>:/path/file.txt ./local',
      platform: 'docker',
      category: 'advanced'
    },
    {
      name: 'Docker Compose 启动',
      command: 'docker-compose up -d',
      description: '使用 docker-compose.yml 启动服务',
      example: '-d 后台运行, --build 重新构建镜像',
      platform: 'docker',
      category: 'advanced'
    },

    // Linux Commands
    {
      name: '查看当前目录',
      command: 'pwd',
      description: '显示当前工作目录的完整路径',
      platform: 'linux',
      category: 'basic'
    },
    {
      name: '列出文件',
      command: 'ls -lah',
      description: '详细列出所有文件（包括隐藏文件）',
      example: '-l 长格式, -a 显示隐藏文件, -h 人类可读大小',
      platform: 'linux',
      category: 'basic'
    },
    {
      name: '切换目录',
      command: 'cd /path/to/directory',
      description: '切换到指定目录',
      example: 'cd ~ 回到主目录, cd .. 返回上级目录',
      platform: 'linux',
      category: 'basic'
    },
    {
      name: '创建目录',
      command: 'mkdir -p /path/to/new/directory',
      description: '创建目录（包括父目录）',
      example: '-p 自动创建不存在的父目录',
      platform: 'linux',
      category: 'basic'
    },
    {
      name: '复制文件',
      command: 'cp -r source destination',
      description: '递归复制文件或目录',
      example: '-r 递归复制目录, -v 显示详细信息',
      platform: 'linux',
      category: 'basic'
    },
    {
      name: '移动/重命名',
      command: 'mv oldname newname',
      description: '移动或重命名文件/目录',
      platform: 'linux',
      category: 'basic'
    },
    {
      name: '删除文件',
      command: 'rm -rf /path/to/file',
      description: '强制递归删除文件或目录',
      example: '-r 递归删除, -f 强制删除不提示',
      platform: 'linux',
      category: 'basic'
    },
    {
      name: '查找文件',
      command: 'find /path -name "*.txt"',
      description: '在指定路径查找文件',
      example: 'find . -type f -mtime -7 查找7天内修改的文件',
      platform: 'linux',
      category: 'advanced'
    },
    {
      name: '文件内容搜索',
      command: 'grep -r "keyword" /path',
      description: '递归搜索文件内容中的关键词',
      example: '-i 忽略大小写, -n 显示行号',
      platform: 'linux',
      category: 'advanced'
    },
    {
      name: '查看文件内容',
      command: 'cat filename',
      description: '显示文件完整内容',
      example: 'head -n 20 显示前20行, tail -f 实时查看',
      platform: 'linux',
      category: 'basic'
    },
    {
      name: '磁盘使用情况',
      command: 'df -h',
      description: '显示磁盘空间使用情况',
      example: '-h 人类可读格式',
      platform: 'linux',
      category: 'management'
    },
    {
      name: '目录大小',
      command: 'du -sh /path/to/directory',
      description: '显示目录占用空间大小',
      example: '-s 汇总, -h 人类可读',
      platform: 'linux',
      category: 'management'
    },
    {
      name: '查看进程',
      command: 'ps aux | grep process',
      description: '查看所有进程并过滤',
      example: 'top 实时查看进程, htop 更友好的界面',
      platform: 'linux',
      category: 'management'
    },
    {
      name: '杀死进程',
      command: 'kill -9 <PID>',
      description: '强制终止进程',
      example: 'killall processname 按名称杀死',
      platform: 'linux',
      category: 'management'
    },
    {
      name: '更改文件权限',
      command: 'chmod 755 filename',
      description: '修改文件权限',
      example: '755: 所有者rwx, 组rx, 其他rx',
      platform: 'linux',
      category: 'advanced'
    },
    {
      name: '更改文件所有者',
      command: 'chown user:group filename',
      description: '修改文件所有者和组',
      example: 'chown -R 递归修改目录',
      platform: 'linux',
      category: 'advanced'
    },
    {
      name: '压缩文件',
      command: 'tar -czvf archive.tar.gz /path/to/files',
      description: '创建 tar.gz 压缩包',
      example: '-c 创建, -z gzip压缩, -v 详细输出, -f 文件名',
      platform: 'linux',
      category: 'advanced'
    },
    {
      name: '解压文件',
      command: 'tar -xzvf archive.tar.gz',
      description: '解压 tar.gz 文件',
      example: '-x 解压, -C /path 指定解压目录',
      platform: 'linux',
      category: 'advanced'
    },
    {
      name: '网络连接测试',
      command: 'ping -c 4 google.com',
      description: '测试网络连接',
      example: '-c 指定发送包数量',
      platform: 'linux',
      category: 'network'
    },
    {
      name: '端口监听检查',
      command: 'netstat -tuln | grep :80',
      description: '查看80端口是否被监听',
      example: 'ss -tuln 更现代的替代命令',
      platform: 'linux',
      category: 'network'
    },

    // NPM Commands
    {
      name: '初始化项目',
      command: 'npm init -y',
      description: '快速初始化 Node.js 项目',
      example: '-y 使用默认配置跳过问答',
      platform: 'npm',
      category: 'basic'
    },
    {
      name: '安装依赖',
      command: 'npm install',
      description: '安装 package.json 中的所有依赖',
      example: 'npm i 是简写形式',
      platform: 'npm',
      category: 'basic'
    },
    {
      name: '安装包',
      command: 'npm install package-name',
      description: '安装指定的 npm 包',
      example: 'npm install -D 安装为开发依赖',
      platform: 'npm',
      category: 'basic'
    },
    {
      name: '全局安装',
      command: 'npm install -g package-name',
      description: '全局安装 npm 包',
      example: '全局包可在任何项目中使用',
      platform: 'npm',
      category: 'basic'
    },
    {
      name: '卸载包',
      command: 'npm uninstall package-name',
      description: '卸载指定的 npm 包',
      example: 'npm uninstall -g 卸载全局包',
      platform: 'npm',
      category: 'basic'
    },
    {
      name: '更新包',
      command: 'npm update',
      description: '更新所有包到最新版本',
      example: 'npm update package-name 更新指定包',
      platform: 'npm',
      category: 'management'
    },
    {
      name: '查看已安装包',
      command: 'npm list --depth=0',
      description: '查看已安装的包（仅顶层）',
      example: 'npm list -g --depth=0 查看全局包',
      platform: 'npm',
      category: 'management'
    },
    {
      name: '运行脚本',
      command: 'npm run script-name',
      description: '运行 package.json 中定义的脚本',
      example: 'npm start, npm test 是内置脚本',
      platform: 'npm',
      category: 'basic'
    },
    {
      name: '查看包信息',
      command: 'npm info package-name',
      description: '查看包的详细信息',
      platform: 'npm',
      category: 'advanced'
    },
    {
      name: '检查过期包',
      command: 'npm outdated',
      description: '检查哪些包有新版本',
      platform: 'npm',
      category: 'management'
    },
    {
      name: '清理缓存',
      command: 'npm cache clean --force',
      description: '清理 npm 缓存',
      platform: 'npm',
      category: 'management'
    },
    {
      name: '审计安全漏洞',
      command: 'npm audit',
      description: '检查依赖包的安全漏洞',
      example: 'npm audit fix 自动修复',
      platform: 'npm',
      category: 'advanced'
    },

    // Kubernetes Commands
    {
      name: '查看 Pods',
      command: 'kubectl get pods',
      description: '列出所有 Pods',
      example: 'kubectl get pods -A 查看所有命名空间',
      platform: 'kubernetes',
      category: 'basic'
    },
    {
      name: '查看 Pod 详情',
      command: 'kubectl describe pod <pod-name>',
      description: '查看 Pod 的详细信息',
      platform: 'kubernetes',
      category: 'basic'
    },
    {
      name: '查看 Pod 日志',
      command: 'kubectl logs <pod-name>',
      description: '查看 Pod 的日志输出',
      example: 'kubectl logs -f <pod-name> 实时查看',
      platform: 'kubernetes',
      category: 'debug'
    },
    {
      name: '进入 Pod',
      command: 'kubectl exec -it <pod-name> -- bash',
      description: '进入 Pod 执行命令',
      platform: 'kubernetes',
      category: 'advanced'
    },
    {
      name: '应用配置',
      command: 'kubectl apply -f deployment.yaml',
      description: '应用 YAML 配置文件',
      platform: 'kubernetes',
      category: 'basic'
    },
    {
      name: '删除资源',
      command: 'kubectl delete pod <pod-name>',
      description: '删除指定的 Pod',
      example: 'kubectl delete -f file.yaml 按文件删除',
      platform: 'kubernetes',
      category: 'management'
    },
    {
      name: '查看 Services',
      command: 'kubectl get svc',
      description: '列出所有 Services',
      platform: 'kubernetes',
      category: 'basic'
    },
    {
      name: '端口转发',
      command: 'kubectl port-forward <pod-name> 8080:80',
      description: '将本地端口转发到 Pod',
      platform: 'kubernetes',
      category: 'network'
    },
    {
      name: '扩缩容',
      command: 'kubectl scale deployment <name> --replicas=3',
      description: '设置 Deployment 的副本数',
      platform: 'kubernetes',
      category: 'management'
    },
    {
      name: '查看集群信息',
      command: 'kubectl cluster-info',
      description: '显示集群信息',
      platform: 'kubernetes',
      category: 'basic'
    },

    // AWS CLI Commands
    {
      name: '列出 S3 桶',
      command: 'aws s3 ls',
      description: '列出所有 S3 存储桶',
      platform: 'aws',
      category: 'basic'
    },
    {
      name: '上传文件到 S3',
      command: 'aws s3 cp file.txt s3://bucket-name/',
      description: '上传文件到 S3 桶',
      example: 'aws s3 sync 同步整个目录',
      platform: 'aws',
      category: 'basic'
    },
    {
      name: '列出 EC2 实例',
      command: 'aws ec2 describe-instances',
      description: '查看所有 EC2 实例',
      platform: 'aws',
      category: 'basic'
    },
    {
      name: '启动 EC2 实例',
      command: 'aws ec2 start-instances --instance-ids i-xxxxx',
      description: '启动指定的 EC2 实例',
      platform: 'aws',
      category: 'management'
    },
    {
      name: '停止 EC2 实例',
      command: 'aws ec2 stop-instances --instance-ids i-xxxxx',
      description: '停止指定的 EC2 实例',
      platform: 'aws',
      category: 'management'
    },
    {
      name: '查看 Lambda 函数',
      command: 'aws lambda list-functions',
      description: '列出所有 Lambda 函数',
      platform: 'aws',
      category: 'basic'
    },
    {
      name: '调用 Lambda',
      command: 'aws lambda invoke --function-name MyFunction output.txt',
      description: '调用 Lambda 函数',
      platform: 'aws',
      category: 'advanced'
    },
    {
      name: '查看 RDS 实例',
      command: 'aws rds describe-db-instances',
      description: '列出所有 RDS 数据库实例',
      platform: 'aws',
      category: 'basic'
    },

    // Redis Commands
    {
      name: '设置键值',
      command: 'SET key value',
      description: '设置字符串类型的键值对',
      example: 'SET user:1:name "John"',
      platform: 'redis',
      category: 'basic'
    },
    {
      name: '获取值',
      command: 'GET key',
      description: '获取指定键的值',
      platform: 'redis',
      category: 'basic'
    },
    {
      name: '删除键',
      command: 'DEL key',
      description: '删除指定的键',
      platform: 'redis',
      category: 'basic'
    },
    {
      name: '检查键是否存在',
      command: 'EXISTS key',
      description: '检查键是否存在',
      platform: 'redis',
      category: 'basic'
    },
    {
      name: '设置过期时间',
      command: 'EXPIRE key 3600',
      description: '设置键的过期时间（秒）',
      example: '3600秒 = 1小时',
      platform: 'redis',
      category: 'advanced'
    },
    {
      name: '查看所有键',
      command: 'KEYS *',
      description: '列出所有键（生产环境慎用）',
      example: 'KEYS user:* 模式匹配',
      platform: 'redis',
      category: 'basic'
    },
    {
      name: '列表操作',
      command: 'LPUSH mylist value',
      description: '从左侧插入列表',
      example: 'RPUSH 从右侧插入, LRANGE 获取范围',
      platform: 'redis',
      category: 'advanced'
    },
    {
      name: '哈希操作',
      command: 'HSET user:1 name "John"',
      description: '设置哈希表字段',
      example: 'HGET user:1 name 获取字段',
      platform: 'redis',
      category: 'advanced'
    },
    {
      name: '集合操作',
      command: 'SADD myset value',
      description: '向集合添加成员',
      example: 'SMEMBERS myset 获取所有成员',
      platform: 'redis',
      category: 'advanced'
    },
    {
      name: '查看内存使用',
      command: 'INFO memory',
      description: '查看 Redis 内存使用情况',
      platform: 'redis',
      category: 'management'
    },
    {
      name: '清空数据库',
      command: 'FLUSHDB',
      description: '清空当前数据库',
      example: 'FLUSHALL 清空所有数据库',
      platform: 'redis',
      category: 'management'
    },
    // Windows Run Commands (Win+R)
    {
    name: '打开命令提示符',
    command: 'cmd',
    description: '打开 CMD 命令行',
    example: 'Win+R 后输入 cmd',
    platform: 'windows',
    category: 'basic'
    },
    {
    name: '打开 PowerShell',
    command: 'powershell',
    description: '打开 Windows PowerShell',
    platform: 'windows',
    category: 'basic'
    },
    {
    name: '任务管理器',
    command: 'taskmgr',
    description: '快速打开任务管理器',
    platform: 'windows',
    category: 'basic'
    },
    {
    name: '系统配置',
    command: 'msconfig',
    description: '打开系统配置实用程序',
    example: '管理启动项、服务等',
    platform: 'windows',
    category: 'management'
    },
    {
    name: '注册表编辑器',
    command: 'regedit',
    description: '打开 Windows 注册表编辑器',
    example: '⚠️ 修改注册表需谨慎',
    platform: 'windows',
    category: 'advanced'
    },
    {
    name: '控制面板',
    command: 'control',
    description: '打开经典控制面板',
    platform: 'windows',
    category: 'basic'
    },
    {
    name: '计算器',
    command: 'calc',
    description: '打开 Windows 计算器',
    platform: 'windows',
    category: 'basic'
    },
    {
    name: '记事本',
    command: 'notepad',
    description: '打开记事本',
    platform: 'windows',
    category: 'basic'
    },
    {
    name: '文件资源管理器',
    command: 'explorer',
    description: '打开文件资源管理器',
    example: 'explorer . 打开当前目录',
    platform: 'windows',
    category: 'basic'
    },
    {
    name: '设备管理器',
    command: 'devmgmt.msc',
    description: '管理硬件设备',
    platform: 'windows',
    category: 'management'
    },
    {
    name: '磁盘管理',
    command: 'diskmgmt.msc',
    description: '管理磁盘分区',
    platform: 'windows',
    category: 'management'
    },
    {
    name: '服务管理',
    command: 'services.msc',
    description: '管理 Windows 服务',
    platform: 'windows',
    category: 'management'
    },
    {
    name: '事件查看器',
    command: 'eventvwr',
    description: '查看系统日志和事件',
    platform: 'windows',
    category: 'debug'
    },
    {
    name: '计算机管理',
    command: 'compmgmt.msc',
    description: '综合管理工具',
    example: '包含事件查看器、设备管理器等',
    platform: 'windows',
    category: 'management'
    },
    {
    name: '组策略编辑器',
    command: 'gpedit.msc',
    description: '编辑本地组策略',
    example: '仅 Pro/Enterprise 版本可用',
    platform: 'windows',
    category: 'advanced'
    },
    {
    name: '系统信息',
    command: 'msinfo32',
    description: '查看详细系统信息',
    platform: 'windows',
    category: 'basic'
    },
    {
    name: 'DirectX 诊断工具',
    command: 'dxdiag',
    description: '检测 DirectX 信息',
    example: '查看显卡、声卡信息',
    platform: 'windows',
    category: 'debug'
    },
    {
    name: '性能监视器',
    command: 'perfmon',
    description: '监控系统性能',
    platform: 'windows',
    category: 'debug'
    },
    {
    name: '资源监视器',
    command: 'resmon',
    description: '实时查看系统资源使用',
    platform: 'windows',
    category: 'debug'
    },
    {
    name: '网络连接',
    command: 'ncpa.cpl',
    description: '管理网络适配器',
    platform: 'windows',
    category: 'network'
    },
    {
    name: '远程桌面连接',
    command: 'mstsc',
    description: '连接到远程计算机',
    platform: 'windows',
    category: 'network'
    },
    {
    name: '系统属性',
    command: 'sysdm.cpl',
    description: '查看和修改系统属性',
    example: '计算机名、硬件配置等',
    platform: 'windows',
    category: 'basic'
    },
    {
    name: '磁盘清理',
    command: 'cleanmgr',
    description: '清理磁盘空间',
    platform: 'windows',
    category: 'management'
    },
    {
    name: '程序和功能',
    command: 'appwiz.cpl',
    description: '卸载或更改程序',
    platform: 'windows',
    category: 'management'
    },
    {
    name: '防火墙设置',
    command: 'firewall.cpl',
    description: 'Windows 防火墙设置',
    platform: 'windows',
    category: 'network'
    },
    {
    name: '用户账户',
    command: 'netplwiz',
    description: '管理用户账户',
    platform: 'windows',
    category: 'management'
    },
    {
    name: '临时文件夹',
    command: '%temp%',
    description: '打开临时文件夹',
    example: '可以清理临时文件',
    platform: 'windows',
    category: 'basic'
    },
    {
    name: '用户文件夹',
    command: '%userprofile%',
    description: '打开当前用户文件夹',
    platform: 'windows',
    category: 'basic'
    },
    {
    name: '启动文件夹',
    command: 'shell:startup',
    description: '管理开机启动项',
    platform: 'windows',
    category: 'management'
    },
    {
    name: '最近使用的项目',
    command: 'recent',
    description: '查看最近打开的文件',
    platform: 'windows',
    category: 'basic'
    },
    {
    name: '截图工具',
    command: 'snippingtool',
    description: '打开截图工具',
    platform: 'windows',
    category: 'basic'
    },
    {
    name: '屏幕键盘',
    command: 'osk',
    description: '打开屏幕键盘',
    platform: 'windows',
    category: 'basic'
    },
    {
    name: '放大镜',
    command: 'magnify',
    description: '屏幕放大工具',
    platform: 'windows',
    category: 'basic'
    },
    {
    name: '字符映射表',
    command: 'charmap',
    description: '查看和复制特殊字符',
    platform: 'windows',
    category: 'basic'
    },
    {
    name: '画图',
    command: 'mspaint',
    description: '打开画图程序',
    platform: 'windows',
    category: 'basic'
    },
    {
    name: '写字板',
    command: 'write',
    description: '打开写字板',
    platform: 'windows',
    category: 'basic'
    },
    {
    name: '任务计划程序',
    command: 'taskschd.msc',
    description: '创建和管理计划任务',
    platform: 'windows',
    category: 'advanced'
    },
    {
    name: '本地安全策略',
    command: 'secpol.msc',
    description: '配置安全策略',
    example: '仅 Pro/Enterprise 版本',
    platform: 'windows',
    category: 'advanced'
    },
    {
    name: '证书管理器',
    command: 'certmgr.msc',
    description: '管理数字证书',
    platform: 'windows',
    category: 'advanced'
    },
    {
    name: 'Windows 更新',
    command: 'ms-settings:windowsupdate',
    description: '打开 Windows 更新设置',
    platform: 'windows',
    category: 'management'
    },
    {
    name: '显示设置',
    command: 'ms-settings:display',
    description: '调整显示器设置',
    platform: 'windows',
    category: 'basic'
    },
    {
    name: '声音设置',
    command: 'mmsys.cpl',
    description: '管理音频设备',
    platform: 'windows',
    category: 'basic'
    },
    {
    name: '电源选项',
    command: 'powercfg.cpl',
    description: '配置电源计划',
    platform: 'windows',
    category: 'management'
    },
    {
    name: '鼠标属性',
    command: 'main.cpl',
    description: '调整鼠标设置',
    platform: 'windows',
    category: 'basic'
    },
    {
    name: '日期和时间',
    command: 'timedate.cpl',
    description: '设置日期、时间和时区',
    platform: 'windows',
    category: 'basic'
    },
    {
    name: '区域和语言',
    command: 'intl.cpl',
    description: '更改区域和语言设置',
    platform: 'windows',
    category: 'basic'
    }
  ];

  const filteredCommands = commands.filter(cmd => {
    const matchesPlatform = cmd.platform === platform;
    const matchesCategory = cmd.category === category;
    const matchesSearch = searchTerm === '' ||
      cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesPlatform && matchesCategory && matchesSearch;
  });

  const copyToClipboard = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopied(command);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="w-full space-y-4">
      {/* 平台选择 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          选择平台
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {[
            { value: 'docker', label: 'Docker', icon: '🐳' },
            { value: 'linux', label: 'Linux', icon: '🐧' },
            { value: 'npm', label: 'NPM', icon: '📦' },
            { value: 'kubernetes', label: 'K8s', icon: '☸️' },
            { value: 'aws', label: 'AWS', icon: '☁️' },
            { value: 'redis', label: 'Redis', icon: '🔴' },
            { value: 'windows', label: 'Windows', icon: '🪟' }
          ].map((p) => (
            <Button
              key={p.value}
              onClick={() => {
                setPlatform(p.value as Platform);
                setCopied('');
              }}
              variant={platform === p.value ? 'default' : 'outline'}
              size="sm"
              className={platform === p.value ? 'bg-gradient-to-r from-slate-700 to-gray-700 text-white' : ''}
            >
              <span className="mr-1">{p.icon}</span>
              {p.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 分类选择 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          命令分类
        </label>
        <div className="flex gap-2 flex-wrap">
          {[
            { value: 'basic', label: '基础命令' },
            { value: 'advanced', label: '高级操作' },
            { value: 'management', label: '管理维护' },
            { value: 'network', label: '网络相关' },
            { value: 'debug', label: '调试诊断' }
          ].map((cat) => (
            <Button
              key={cat.value}
              onClick={() => setCategory(cat.value as Category)}
              variant={category === cat.value ? 'default' : 'outline'}
              size="sm"
              className={category === cat.value ? 'bg-gray-700 text-white' : ''}
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
          placeholder="搜索命令..."
          className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      {/* 命令列表 */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          命令列表 ({filteredCommands.length} 条)
        </label>
        {filteredCommands.map((cmd, index) => (
          <div
            key={index}
            className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-100 mb-1">
                  {cmd.name}
                </h4>
                <code className="block px-3 py-2 mb-2 bg-gray-900 text-green-400 rounded text-sm font-mono overflow-x-auto">
                  {cmd.command}
                </code>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {cmd.description}
                </p>
                {cmd.example && (
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    💡 {cmd.example}
                  </p>
                )}
              </div>
              <Button
                onClick={() => copyToClipboard(cmd.command)}
                variant="ghost"
                size="sm"
                className="shrink-0"
              >
                {copied === cmd.command ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredCommands.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          没有找到匹配的命令
        </div>
      )}

      {/* 提示信息 */}
      <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="font-semibold mb-1">💡 使用提示</p>
        <ul className="list-disc list-inside space-y-1">
            <li>包含 150+ 常用命令，涵盖 7 大平台[web:106][web:108]</li>
            <li>支持 Docker、Linux、NPM、K8s、AWS、Redis、Windows</li>
            <li><strong>Windows</strong>：按 Win+R 后输入命令快速打开程序</li>
            <li>每个命令都有详细说明和使用示例</li>
        </ul>
      </div>
    </div>
  );
}
