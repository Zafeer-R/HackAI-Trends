require('dotenv').config();
const express = require('express');
const cors = require("cors");

const app = express(); // ✅ must come before app.use()
const chatbotRoutes = require('./routes/chatbotRoutes'); // ✅ import AFTER express()

app.use(cors());
app.use(express.json());

// ✅ This means all chatbot routes are available under /api/chatbot
app.use('/api/chatbot', chatbotRoutes);

app.get('/', (req, res) => {
  res.send('HackAI backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
