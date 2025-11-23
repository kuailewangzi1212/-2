import React, { useState } from 'react';
import { Star, ThumbsUp, TrendingUp, MessageCircle, Activity } from 'lucide-react';
import { Review, FeedbackAnalysis } from '../types';
import { analyzeCustomerFeedback } from '../services/geminiService';

const MOCK_REVIEWS: Review[] = [
  { id: 1, customer: "王先生", rating: 5, content: "这次保养体验非常好，通过微信提前预约，到了之后完全不用排队。接待的小李非常热情，AI预估的价格和最后结算几乎一样，透明度很高！", date: "2023-10-05" },
  { id: 2, customer: "张女士", rating: 3, content: "维修技术没问题，但是休息区的咖啡机坏了也没人修，等待时间有点长，希望改进环境设施。", date: "2023-10-06" },
  { id: 3, customer: "李先生", rating: 4, content: "师傅很专业，一眼就看出了异响的问题。不过配件调货等了两天，比预期的慢了一点。", date: "2023-10-08" },
  { id: 4, customer: "赵先生", rating: 2, content: "价格偏贵，工时费比外面修理厂高太多了。虽然服务态度还可以，但是性价比不高。", date: "2023-10-09" },
  { id: 5, customer: "孙女士", rating: 5, content: "非常棒！车漆修复得完美无瑕，完全看不出来。而且还免费帮忙洗了车，很贴心。", date: "2023-10-10" },
];

const FeedbackInsight: React.FC = () => {
  const [analysis, setAnalysis] = useState<FeedbackAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const reviewTexts = MOCK_REVIEWS.map(r => r.content);
      const result = await analyzeCustomerFeedback(reviewTexts);
      setAnalysis(result);
    } catch (e) {
      console.error(e);
      alert("分析失败，请检查 API Key");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
       <header className="mb-6 flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Activity className="text-indigo-600" /> 客诉情感分析
            </h2>
            <p className="text-gray-600 mt-1">AI 自动抓取并分析客户评价，洞察服务短板。</p>
        </div>
        <button 
            onClick={runAnalysis}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white px-6 py-2 rounded-lg shadow transition-colors flex items-center"
        >
            {loading ? <Activity className="animate-spin mr-2" /> : <TrendingUp className="mr-2" />}
            {loading ? "分析中..." : "生成 AI 洞察报告"}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reviews List */}
        <div className="lg:col-span-1 space-y-4 h-[600px] overflow-y-auto pr-2 no-scrollbar">
          <h3 className="font-semibold text-gray-700 mb-2">近期客户评价 ({MOCK_REVIEWS.length})</h3>
          {MOCK_REVIEWS.map(review => (
            <div key={review.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                    <span className="font-bold text-sm text-gray-800 mr-2">{review.customer}</span>
                    <span className="text-xs text-gray-400">{review.date}</span>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-snug">{review.content}</p>
            </div>
          ))}
        </div>

        {/* Analysis Result */}
        <div className="lg:col-span-2">
            {!analysis ? (
                <div className="bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-xl h-full flex flex-col items-center justify-center text-indigo-400">
                    <MessageCircle size={64} className="mb-4 opacity-30" />
                    <p>点击右上角按钮开始 AI 分析</p>
                </div>
            ) : (
                <div className="space-y-6 animate-fade-in">
                    {/* Summary Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-indigo-500">
                        <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">AI 综述</h4>
                        <p className="text-lg text-gray-800 font-medium leading-relaxed">"{analysis.summary}"</p>
                        <div className="mt-4 flex items-center gap-4">
                            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-600">
                                情感倾向: <span className={analysis.sentiment === '正面' ? 'text-green-600' : 'text-orange-600'}>{analysis.sentiment}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Topics */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h4 className="text-sm font-bold text-gray-500 uppercase mb-4">高频话题</h4>
                            <div className="flex flex-wrap gap-2">
                                {analysis.keyTopics.map((topic, i) => (
                                    <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                                        #{topic}
                                    </span>
                                ))}
                            </div>
                        </div>

                         {/* Actions */}
                         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h4 className="text-sm font-bold text-gray-500 uppercase mb-4">改进建议 (Action Items)</h4>
                            <ul className="space-y-3">
                                {analysis.actionItems.map((item, i) => (
                                    <li key={i} className="flex items-start text-sm text-gray-700">
                                        <div className="mt-0.5 mr-2 flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                                            <span className="text-green-600 font-bold text-xs">{i+1}</span>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackInsight;