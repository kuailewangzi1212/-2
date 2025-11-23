import React, { useState } from 'react';
import { Upload, AlertTriangle, Wrench, Clock, CheckCircle, AlertCircle, Camera } from 'lucide-react';
import { analyzeVehicleImage } from '../services/geminiService';
import { AnalysisResult } from '../types';

const VisualDiagnosis: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Extract base64 data part
        const base64Data = base64String.split(',')[1];
        setSelectedImage(base64Data);
        setMimeType(file.type);
        setResult(null); // Reset previous result
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalysis = async () => {
    if (!selectedImage) return;
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeVehicleImage(selectedImage, mimeType);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("AI 诊断服务暂时不可用，请检查网络或 API Key。");
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 md:p-8">
       <header className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Camera className="text-teal-600" /> 视觉智能诊断
        </h2>
        <p className="text-gray-600 mt-1">上传仪表盘报警灯或车身损伤照片，AI 将自动生成预诊断报告。</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">上传车辆图片</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors relative overflow-hidden">
                {selectedImage ? (
                   <img 
                    src={`data:${mimeType};base64,${selectedImage}`} 
                    alt="Preview" 
                    className="absolute inset-0 w-full h-full object-contain p-2" 
                   />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">点击上传</span> 或拖拽文件至此</p>
                    <p className="text-xs text-gray-500">PNG, JPG (最大 5MB)</p>
                  </div>
                )}
                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
              </label>
            </div>
          </div>
          
          <button
            onClick={handleAnalysis}
            disabled={!selectedImage || loading}
            className={`w-full py-3 rounded-lg font-medium text-white flex items-center justify-center gap-2 transition-all ${
              !selectedImage || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 shadow-md hover:shadow-lg'
            }`}
          >
            {loading ? (
              <>Processing...</>
            ) : (
              <>开始 AI 诊断</>
            )}
          </button>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center">
              <AlertCircle size={16} className="mr-2"/> {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">诊断报告</h3>
          
          {!result ? (
             <div className="h-64 flex flex-col items-center justify-center text-gray-400">
               <Wrench size={48} className="mb-4 opacity-20" />
               <p>暂无数据，请先上传图片进行分析</p>
             </div>
          ) : (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">识别问题</label>
                <div className="text-xl font-bold text-gray-900 mt-1 flex items-center justify-between">
                  {result.issue}
                  <span className={`text-xs px-2 py-1 rounded border ${getSeverityColor(result.severity)}`}>
                    {result.severity} Severity
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                   <div className="flex items-center text-gray-500 text-xs mb-1">
                     <AlertTriangle size={12} className="mr-1"/> 预估费用
                   </div>
                   <div className="text-lg font-semibold text-gray-800">{result.estimatedCost}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                   <div className="flex items-center text-gray-500 text-xs mb-1">
                     <Clock size={12} className="mr-1"/> 预估工时
                   </div>
                   <div className="text-lg font-semibold text-gray-800">{result.timeRequired}</div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                <div className="flex items-start">
                  <CheckCircle className="text-blue-600 w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 text-sm">维修建议</h4>
                    <p className="text-blue-800 text-sm mt-1 leading-relaxed">
                      {result.recommendation}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-center text-gray-400 mt-6">
                * 此报告由 AI 生成仅供参考，具体情况需专业技师现场检测。
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisualDiagnosis;