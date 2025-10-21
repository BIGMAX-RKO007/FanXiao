'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy, GitBranch } from 'lucide-react';

type Category = 'basic' | 'branch' | 'remote' | 'advanced';

interface Command {
  name: string;
  command: string;
  description: string;
}

export default function GitHelper() {
  const [category, setCategory] = useState<Category>('basic');
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState('');

  const commands: Record<Category, Command[]> = {
    basic: [
      { name: '初始化仓库', command: 'git init', description: '在当前目录创建新的 Git 仓库' },
      { name: '克隆仓库', command: 'git clone <url>', description: '克隆远程仓库到本地' },
      { name: '查看状态', command: 'git status', description: '查看工作区和暂存区状态' },
      { name: '添加文件', command: 'git add .', description: '将所有更改添加到暂存区' },
      { name: '提交更改', command: 'git commit -m "message"', description: '提交暂存区的更改' },
      { name: '查看日志', command: 'git log', description: '查看提交历史' },
      { name: '查看差异', command: 'git diff', description: '查看工作区与暂存区的差异' }
    ],
    branch: [
      { name: '查看分支', command: 'git branch', description: '列出所有本地分支' },
      { name: '创建分支', command: 'git branch <branch-name>', description: '创建新分支' },
      { name: '切换分支', command: 'git checkout <branch-name>', description: '切换到指定分支' },
      { name: '创建并切换', command: 'git checkout -b <branch-name>', description: '创建新分支并立即切换' },
      { name: '合并分支', command: 'git merge <branch-name>', description: '将指定分支合并到当前分支' },
      { name: '删除分支', command: 'git branch -d <branch-name>', description: '删除本地分支' },
      { name: '重命名分支', command: 'git branch -m <old> <new>', description: '重命名分支' }
    ],
    remote: [
      { name: '查看远程', command: 'git remote -v', description: '查看远程仓库信息' },
      { name: '添加远程', command: 'git remote add origin <url>', description: '添加远程仓库' },
      { name: '拉取更新', command: 'git pull origin main', description: '从远程拉取并合并更新' },
      { name: '推送更改', command: 'git push origin main', description: '推送本地更改到远程' },
      { name: '推送分支', command: 'git push -u origin <branch>', description: '推送新分支到远程' },
      { name: '获取远程', command: 'git fetch origin', description: '获取远程更新但不合并' }
    ],
    advanced: [
      { name: '暂存更改', command: 'git stash', description: '临时保存工作区更改' },
      { name: '恢复暂存', command: 'git stash pop', description: '恢复最近的暂存更改' },
      { name: '重置提交', command: 'git reset --soft HEAD~1', description: '撤销最近的提交但保留更改' },
      { name: '强制重置', command: 'git reset --hard HEAD~1', description: '撤销最近的提交并丢弃更改' },
      { name: '修改提交', command: 'git commit --amend', description: '修改最近的提交信息' },
      { name: '变基', command: 'git rebase main', description: '将当前分支变基到 main' },
      { name: '挑选提交', command: 'git cherry-pick <commit>', description: '应用指定提交到当前分支' },
      { name: '查看引用日志', command: 'git reflog', description: '查看 HEAD 的历史记录' }
    ]
  };

  const filteredCommands = commands[category].filter(cmd =>
    cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cmd.command.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopied(command);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="w-full space-y-4">
      {/* 分类选择 */}
      <div className="flex gap-2 flex-wrap">
        {[
          { value: 'basic', label: '基础操作' },
          { value: 'branch', label: '分支管理' },
          { value: 'remote', label: '远程操作' },
          { value: 'advanced', label: '高级命令' }
        ].map((cat) => (
          <Button
            key={cat.value}
            onClick={() => setCategory(cat.value as Category)}
            variant={category === cat.value ? 'default' : 'outline'}
            size="sm"
            className={category === cat.value ? 'bg-gradient-to-r from-gray-700 to-slate-700 text-white' : ''}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* 搜索 */}
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="搜索命令..."
          className="w-full px-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      {/* 命令列表 */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
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
                <code className="block px-3 py-2 mb-2 bg-gray-900 text-green-400 rounded text-sm font-mono">
                  {cmd.command}
                </code>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {cmd.description}
                </p>
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
    </div>
  );
}
