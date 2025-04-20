const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatbotController");

router.post("/chat", chatbotController.handleChat);

// TEST ROUTE
router.get("/test", (req, res) => {
  res.send("Test route is working!");
});

module.exports = router;
