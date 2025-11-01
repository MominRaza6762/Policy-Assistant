import ChatSession from "../models/ChatSession.js";
import { askQuestion } from "../langchain/chatChain.js";

export const chatAsk = async (req, res) => {
  const { userId, query, docId, k } = req.body;
  if (!userId || !query) {
    return res.status(400).json({ status: "error", message: "userId and query are required" });
  }

  const { answer, citations } = await askQuestion({ userId, query, docId, k });

  // Save to chat history
  let session = await ChatSession.findOne({ userId });
  if (!session) session = await ChatSession.create({ userId, messages: [] });
  session.messages.push({ role: "user", content: query });
  session.messages.push({ role: "assistant", content: answer, citations });
  await session.save();

  res.json({ status: "ok", answer, citations });
};