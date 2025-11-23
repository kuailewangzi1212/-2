import React from 'react';
import { LayoutDashboard, MessageSquare, FileText, Search, Presentation } from 'lucide-react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { view: AppView.DASHBOARD, label: '运营总览', icon: LayoutDashboard },
    { view: AppView.BOOKING, label: '智能预约', icon: MessageSquare },
    { view: AppView.DIAGNOSIS, label: '视觉诊断', icon: Search },
    { view: AppView.FEEDBACK, label: '客诉分析', icon: FileText },
    { view: AppView.SCRIPT, label: '演讲文案', icon: Presentation },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2 font-bold text-xl tracking-wider text-blue-400">
            <span>AUTO</span><span className="text-white">GENIUS</span>
        </div>
        <div className="text-xs text-slate-400 mt-1">AI 4S店售后管理系统</div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onChangeView(item.view)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              currentView === item.view
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-lg p-3 flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-xs font-bold">
            AD
          </div>
          <div>
            <div className="text-sm font-medium">管理员</div>
            <div className="text-xs text-slate-400">Admin Mode</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;