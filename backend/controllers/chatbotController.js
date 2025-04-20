const { generateSQLFromPrompt, generateSummaryFromResult } = require('../services/openaiService');
const { executeSQLQuery } = require('../services/dbService');

const handleChat = async (req, res) => {
  try {
    const { message } = req.body;
    console.log("User message:", message);

    // Step 1: Generate SQL from user's natural language
    const sql = await generateSQLFromPrompt(message);
    console.log("Generated SQL:", sql);

    // Step 2: Check for potentially dangerous SQL keywords
    const forbiddenKeywords = ["DROP", "DELETE", "TRUNCATE", "ALTER", "UPDATE", "INSERT"];
    if (forbiddenKeywords.some(keyword => sql.toUpperCase().includes(keyword))) {
      return res.status(400).json({
        sql,
        result: [{ error: "Blocked potentially destructive SQL." }],
        summary: "Your request was blocked for safety reasons.",
      });
    }

    // Step 3: Execute SQL query
    const result = await executeSQLQuery(sql);
    console.log("DB Result:", result);

    // Step 4 (optional): Summarize the result using OpenAI
    let summary = "Query executed successfully.";
    if (generateSummaryFromResult) {
      summary = await generateSummaryFromResult(result);
    }

    // Final Response
    res.json({
      sql,
      result,
      summary,
    });
  } catch (error) {
    console.error("Error in handleChat:", error.message);
    res.status(500).json({
      sql: "",
      result: [{ error: error.message }],
      summary: "Something went wrong while processing your request.",
    });
  }
};

module.exports = {
  handleChat,
};
