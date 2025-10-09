import React, { useState, useEffect, useRef } from "react";
import "./index.css";

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/messages";

  const fetchMessages = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setMessages(data);
      scrollToBottom();
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const sendMessage = async () => {
    if (!username.trim() || !message.trim()) return;

    const newMessage = {
      username,
      text: message,
      timestamp: new Date().toISOString()
    };

    try {
      console.log("Sending message:", newMessage);
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage)
      });
      if (res.ok) {
        console.log("Message sent successfully");
        setMessage("");
        fetchMessages();
      } else {
        console.error("Failed to send message", res.status);
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Fun Friday Group</h2>
      </div>

      <div className="chat-messages">
        {messages.map((m, index) => (
          <div
            key={index}
            className={`message ${m.username === username ? "own" : "other"}`}
          >
            <span className="username">{m.username}:</span> {m.text}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
