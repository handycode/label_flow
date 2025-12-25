'use client'

import { Circle, MousePointer2, Square } from 'lucide-react'

interface Props {
  currentTool: 'select' | 'rect' | 'ellipse';
  onToolChange: (tool: 'select' | 'rect' | 'ellipse') => void;
}

export default function Toolbar({ currentTool, onToolChange }: Props) {
  const tools = [
    { id: 'select' as const, icon: MousePointer2, label: '选择' },
    { id: 'rect' as const, icon: Square, label: '矩形' },
    { id: 'ellipse' as const, icon: Circle, label: '椭圆' },
  ]

  return (
    <div className="flex items-center gap-1 p-2 bg-base-100 rounded-lg shadow mb-4">
      <span className="text-sm font-medium mr-2">工具:</span>
      {tools.map((tool) => (
        <button
          key={tool.id}
          className={`btn btn-sm gap-1 ${currentTool === tool.id ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => onToolChange(tool.id)}
        >
          <tool.icon size={16} />
          {tool.label}
        </button>
      ))}

      <div className="divider divider-horizontal mx-2"></div>

      <div className="text-sm text-base-content/60">
        提示: 选择工具后在画布上拖拽绘制，滚轮缩放
      </div>
    </div>
  )
}
