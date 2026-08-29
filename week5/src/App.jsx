import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "안녕하세요! 무엇이든 물어보세요 👋",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const model = "gemini-3.6-flash";

      if (!apiKey) {
        throw new Error(
          "API Key를 찾을 수 없습니다. .env 파일을 확인해주세요."
        );
      }

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;


      console.log("REQUEST MODEL:", model);
      console.log("REQUEST URL:", url);

      const response = await fetch(url, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: userMessage,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();

      console.log("HTTP STATUS:", response.status);
      console.log("Gemini Response:", data);

      if (!response.ok) {
        throw new Error(
          data?.error?.message ||
            `Gemini API 요청에 실패했습니다. (${response.status})`
        );
      }

      const aiText =
        data?.candidates?.[0]?.content?.parts
          ?.map((part) => part.text)
          .filter(Boolean)
          .join("\n") ||
        "응답을 가져오지 못했습니다.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: aiText,
        },
      ]);
    } catch (error) {
      console.error("Gemini API Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `오류가 발생했습니다.\n${error.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app">
      <div className="page-wrapper">
      <div className="chat-container">

        <header className="chat-header">
          <div>
            <h1>CECOM CAU Chatbot</h1>
            <p>week5 AI API 실습</p>
          </div>

          <div className="status">
            <span />
            Online
          </div>
        </header>

        <main className="chat-body">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-row ${
                message.role === "user"
                  ? "user-row"
                  : "assistant-row"
              }`}
            >
              {message.role === "assistant" && (
                <div className="avatar">
                  세코미
                </div>
              )}

              <div
                className={`message ${
                  message.role === "user"
                    ? "user-message"
                    : "assistant-message"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="message-row assistant-row">
              <div className="avatar">
                세코미
              </div>

              <div className="message assistant-message loading-message">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </main>

        <div className="chat-input-area">
          <textarea
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요..."
            rows={1}
          />

          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
          >
            {loading ? "전송 중..." : "보내기"}
          </button>
        </div>
      </div>

    <p className="developer-text">
        Developed by <strong>Chu Seoyeon</strong>
      </p>
    </div>
    </div>
  );
}

export default App;