const express = require("express");
const { newChat, getChatsHistory, updateChat, getChat } = require("../controllers/conversationController");
const router = express.Router();

router.post("/",newChat);
router.get("/:email",getChatsHistory);
router.get("/all/:id",getChat);
router.put("/update/:id",updateChat);

module.exports = router;
