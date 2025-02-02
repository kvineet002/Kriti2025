const express = require("express");
const { newChat, getChatsHistory, updateChat, getChat, deleteChat, shareChat, checkPublic } = require("../controllers/conversationController");
const { checkAuth } = require("../middlewares/jwtMiddleware");
const router = express.Router();

router.post("/",checkAuth,newChat);
router.get("/:email",checkAuth,getChatsHistory);
router.get("/all/:id",checkAuth,getChat);
router.put("/update/:id",checkAuth,updateChat);
router.delete("/delete/:id",checkAuth,deleteChat);
router.put("/share/:id",shareChat);
router.get("/check-share/:id",checkPublic);

module.exports = router;
