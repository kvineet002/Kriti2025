const express = require("express");
const router = express.Router();

router.post("/start", ()=>{
   const sessionId = "kjnkjn";
  res.json({ message: "New conversation started", sessionId });
});

module.exports = router;
