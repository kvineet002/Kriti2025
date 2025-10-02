const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY =
  process.env.REACT_APP_GOOGLE_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const systemPrompt = `You are a title provider to my prompt. When given a prompt, provide a title that is relevant to the prompt not more 3-4 words.`;
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: systemPrompt,
});

// model.setSystemPrompt(systemPrompt);
module.exports = {model};
