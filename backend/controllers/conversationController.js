const { createConversation, getConversation, deleteConversation } = require("../utils/sessionManager");
const langchainService = require("../services/langchainService");

// Start a new conversation
const startConversation = (req, res) => {
  const sessionId = createConversation();
  res.json({ message: "New conversation started", sessionId });
};

// Continue a conversation
const chat = async (req, res) => {
  const { sessionId, input } = req.body;

  if (!sessionId || !getConversation(sessionId)) {
    return res.status(400).json({ error: "Invalid or expired session ID" });
  }

  try {
    const conversationChain = getConversation(sessionId);
    const response = await langchainService.runConversation(conversationChain, input);
    res.json({ response });
  } catch (error) {
    console.error("Error processing chat:", error);
    res.status(500).json({ error: "Failed to process your request" });
  }
};

// End a conversation
const endConversation = (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId || !getConversation(sessionId)) {
    return res.status(400).json({ error: "Invalid or expired session ID" });
  }

  deleteConversation(sessionId);
  res.json({ message: "Conversation ended successfully" });
};

module.exports = { startConversation, chat, endConversation };
