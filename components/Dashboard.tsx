import React from 'react';
import { Car, MessageSquare, PenTool, TrendingUp } from 'lucide-react';
import { AppView } from '../types';

interface DashboardProps {
  onChangeView: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onChangeView }) => {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">4S 智能售后运营中心</h1>
        <p className="text-gray-600 mt-2">AI 驱动的客户服务与维修管理平台</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
            <MessageSquare size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">今日智能接待</p>
            <p className="text-2xl font-bold text-gray-800">128 人</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-lg text-green-600">
            <Car size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">AI 预诊断准确率</p>
            <p className="text-2xl font-bold text-gray-800">94.5%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">客户满意度提升</p>
            <p className="text-2xl font-bold text-gray-800">+18%</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-6">功能模块体验</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Feature Card 1 */}
        <div 
          onClick={() => onChangeView(AppView.BOOKING)}
          className="group bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-200 p-6 rounded-xl cursor-pointer transition-all duration-200"
        >
          <div className="h-12 w-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
            <MessageSquare size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">7x24h 智能客服</h3>
          <p className="text-gray-500 text-sm">利用 NLP 技术处理客户预约、保养咨询，自动生成工单。</p>
        </div>

        {/* Feature Card 2 */}
        <div 
          onClick={() => onChangeView(AppView.DIAGNOSIS)}
          className="group bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-200 p-6 rounded-xl cursor-pointer transition-all duration-200"
        >
          <div className="h-12 w-12 bg-teal-600 text-white rounded-lg flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
            <Car size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">视觉智能诊断</h3>
          <p className="text-gray-500 text-sm">基于计算机视觉识别仪表盘故障灯或车损情况，快速定损报价。</p>
        </div>

        {/* Feature Card 3 */}
        <div 
          onClick={() => onChangeView(AppView.FEEDBACK)}
          className="group bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-200 p-6 rounded-xl cursor-pointer transition-all duration-200"
        >
          <div className="h-12 w-12 bg-indigo-600 text-white rounded-lg flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
            <TrendingUp size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">客诉情感分析</h3>
          <p className="text-gray-500 text-sm">分析海量客户评价，提取关键痛点与改进建议，提升运营质量。</p>
        </div>
        
         {/* Feature Card 4 */}
        <div 
          onClick={() => onChangeView(AppView.SCRIPT)}
          className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-6 rounded-xl cursor-pointer transition-all duration-200"
        >
          <div className="h-12 w-12 bg-white/10 text-white rounded-lg flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
            <PenTool size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">演讲文案生成</h3>
          <p className="text-slate-300 text-sm">为您的“AI在4S店应用”分享会准备的完整演讲稿。</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;