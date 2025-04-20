const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Function to generate SQL
async function generateSQLFromPrompt(message) {
  const prompt = `
Convert the following natural language request into a safe SQL query.

Input: "${message}"

Rules:
- Only return the SQL query.
- Do not include explanations.
- Do not perform destructive actions like DROP, DELETE, etc.
  `.trim();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are an assistant that only responds with safe SQL queries." },
      { role: "user", content: prompt }
    ],
    temperature: 0,
  });

  const sql = response.choices[0].message.content.trim();
  return sql;
}

// (Optional) stub for summary — comment out if not used
async function generateSummaryFromResult(result) {
  return `Returned ${result.length} rows.`;
}

module.exports = {
  generateSQLFromPrompt,
  generateSummaryFromResult, // ✅ optional, remove from controller if not using
};
