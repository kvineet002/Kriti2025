const express = require("express");
const { newChat, getChatsHistory, updateChat, getChat, deleteChat } = require("../controllers/conversationController");
const { checkAuth } = require("../middlewares/jwtMiddleware");
const router = express.Router();

router.post("/",checkAuth,newChat);
router.get("/:email",checkAuth,getChatsHistory);
router.get("/all/:id",checkAuth,getChat);
router.put("/update/:id",checkAuth,updateChat);
router.delete("/delete/:id",checkAuth,deleteChat);

module.exports = router;
