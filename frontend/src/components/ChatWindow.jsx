import { useState } from "react";
import axios from "axios";

const ChatWindow = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setHistory((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post("http://localhost:5000/api/chatbot/chat", {
        message: input,
      });    

      const { result } = res.data;

      let content = "";
      
      // Format single row results nicely
      if (result.length === 1 && typeof result[0] === "object") {
        const row = result[0];
        content = Object.entries(row)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n");
      } else if (result.length > 1) {
        content = result.map((row, index) => `Row ${index + 1}: ${JSON.stringify(row)}`).join("\n");
      } else {
        content = "No results found.";
      }
      
      const botMessage = {
        role: "bot",
        content,
      };
      

      setHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      setHistory((prev) => [
        ...prev,
        { role: "bot", content: "❌ Error reaching the server." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="p-4 w-full mx-5">
      <div className="rounded p-4 h-96 w-full overflow-y-scroll bg-white shadow">
        {history.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}
          >
            <p
              className={`p-2 inline-block rounded ${
                msg.role === "user" ? "bg-blue-500" : "bg-gray-800"
              }`}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: msg.content.replace(/\n/g, "<br/>"),
                }}
              />
            </p>
          </div>
        ))}
      </div>
      <div className="flex h-1/4 m-auto">
        <input
          class="w-3/4 h-1/2 m-auto border rounded-l p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button
          className="h-1/2 right-4 m-auto bg-blue-500 text-white px-4 rounded-r"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
