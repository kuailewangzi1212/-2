import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult, FeedbackAnalysis } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateChatResponse = async (history: { role: string; text: string }[], newMessage: string) => {
  const ai = getClient();
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `你是一个专业的汽车4S店售后服务AI助手。
      你的职责包括：
      1. 协助客户预约保养或维修（询问车型、当前里程、方便的时间）。
      2. 解答关于车辆保养的基本问题。
      3. 语气要专业、热情、耐心，始终以“尊贵的车主”相称。
      4. 如果用户确认预约，请最后输出格式化的【预约确认单】。
      `,
    },
    history: history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
    }))
  });

  const result = await chat.sendMessage({ message: newMessage });
  return result.text;
};

export const analyzeVehicleImage = async (base64Image: string, mimeType: string): Promise<AnalysisResult> => {
  const ai = getClient();

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      issue: { type: Type.STRING, description: "诊断出的车辆问题或零件名称" },
      severity: { type: Type.STRING, enum: ["Low", "Medium", "High", "Critical"], description: "问题的严重程度" },
      estimatedCost: { type: Type.STRING, description: "预估维修费用范围（人民币）" },
      timeRequired: { type: Type.STRING, description: "预估工时" },
      recommendation: { type: Type.STRING, description: "给车主的维修建议" },
    },
    required: ["issue", "severity", "estimatedCost", "timeRequired", "recommendation"]
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType
          }
        },
        {
          text: "请作为一名资深汽车维修专家分析这张图片。识别仪表盘故障灯、车辆外观损伤或机械零件问题。请用中文回答。"
        }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
      temperature: 0.4
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text) as AnalysisResult;
};

export const analyzeCustomerFeedback = async (reviews: string[]): Promise<FeedbackAnalysis> => {
  const ai = getClient();
  
  const reviewsText = reviews.join("\n---\n");

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      sentiment: { type: Type.STRING, description: "整体情感倾向 (正面/中性/负面)" },
      keyTopics: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: "客户提到的主要话题（如服务态度、价格、技术等）" 
      },
      summary: { type: Type.STRING, description: "对这些评论的简要总结 (50字以内)" },
      actionItems: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "针对4S店管理的具体改进建议 (3条)"
      }
    },
    required: ["sentiment", "keyTopics", "summary", "actionItems"]
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `分析以下汽车4S店的客户评价:\n${reviewsText}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text) as FeedbackAnalysis;
};
