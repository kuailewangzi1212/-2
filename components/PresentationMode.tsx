import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const PresentationMode: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const scriptTitle = "主题：智能驱动，服务无界——AI在汽车4S店售后运营中的创新应用";

  const scriptContent = `
各位领导、各位同仁：

大家好！

我是[您的名字]。今天非常荣幸能在这里与大家分享一个极具前瞻性的话题——《AI在汽车4S店售后运营中的应用》。

【痛点引入】
在正式开始之前，我想请大家回想一下我们日常运营中是否经常遇到这些场景：
1. 预约电话接不完，但到了现场客户还是要排队，抱怨声不断。
2. 车辆故障描述不清，车主拍了张照片发过来，我们却得等老师傅空下来才能看。
3. 客户对维修价格不理解，觉得我们“小病大修”，信任度难以建立。
4. 即使我们很努力，网上的差评还是时不时出现，却不知道具体问题出在哪。

这些不仅仅是“麻烦”，它们是我们售后产值流失的黑洞，是客户流失的隐形推手。

【AI解决方案】
那么，人工智能（AI）能为我们做什么？它不是来替代我们的员工，而是来武装我们的团队。今天我为大家带来了一个基于最新AI大模型（Gemini）构建的智能售后运营系统雏形，主要解决三个核心问题：效率、透明度、和洞察力。

【场景一：7x24小时 智能预约与接待】
（展示 "智能预约助手" 界面）
首先是预约。传统的预约依赖人工接听，受限于工作时间。而AI客服可以全天候在线。
大家看这个演示，AI不仅能理解自然语言，还能像一个专业顾问一样，引导客户提供车型、里程，并自动查询工位状况完成预约。它不再是冷冰冰的“按1按2”，而是有温度的对话。这直接释放了我们的前台人力，让他们专注于接待到店客户。

【场景二：视觉智能诊断】
（展示 "视觉智能诊断" 界面）
其次是诊断。这是建立信任的关键。
当客户发来一张仪表盘故障灯的照片，或者车身划痕的照片，我们的AI系统可以瞬间进行图像识别。
大家看屏幕，上传图片后，AI迅速识别出这是“发动机排放系统故障灯”，并给出了“中等”严重等级，预估了维修费用和工时。
这给客户的感觉是什么？是专业，是透明。我们还没拆车，心里就已经有底了。

【场景三：客诉情感分析与决策】
（展示 "客诉情感分析" 界面）
最后是管理。我们每天都在产生大量的评价数据。
利用AI的自然语言处理能力，我们可以瞬间分析上千条客户评论。
在这个演示中，AI不仅告诉我们整体满意度，还敏锐地捕捉到“休息区设施”和“配件等待时间”是主要的扣分项，并直接生成了改进建议。这让管理者的决策不再靠猜，而是靠数据说话。

【总结与展望】
各位，AI时代已经到来。
未来的4S店，拼的不仅是修车的技术，更是数据的算力，和服务的智能化程度。
通过引入AI，我们希望能实现：
1. 运营效率提升 30%
2. 客户等待时间降低 50%
3. 客户满意度显著提升

让我们拥抱技术，让售后服务更懂车，更懂人。

谢谢大家！
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptTitle + "\n\n" + scriptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-sm border border-gray-200 my-8">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">分享演讲稿</h1>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
          {copied ? "已复制" : "复制全文"}
        </button>
      </div>

      <div className="prose prose-slate max-w-none">
        <h3 className="text-xl font-bold text-blue-800 mb-4">{scriptTitle}</h3>
        <div className="space-y-6 text-gray-700 leading-relaxed whitespace-pre-line font-serif text-lg">
          {scriptContent}
        </div>
      </div>
    </div>
  );
};

export default PresentationMode;