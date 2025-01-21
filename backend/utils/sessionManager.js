const { createNewConversationChain } = require("../services/langchainService");
const sessions = {};

// Create a new conversation session
const createConversation = () => {
  const sessionId = require("uuid").v4();
  sessions[sessionId] = createNewConversationChain();
  return sessionId;
};

// Get an active conversation session
const getConversation = (sessionId) => sessions[sessionId];

// Delete a conversation session
const deleteConversation = (sessionId) => {
  delete sessions[sessionId];
};

module.exports = { createConversation, getConversation, deleteConversation };
