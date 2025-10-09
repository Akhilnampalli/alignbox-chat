import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/messages';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [user, setUser] = useState('');
  
  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // auto-refresh every 3s
    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(API_URL);
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const sendMessage = async () => {
    if (!text || !user) return;
    try {
      await axios.post(API_URL, { user, text });
      setText('');
      fetchMessages();
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-header">🎉 Fun Friday Group</div>
      <div className="chat-container">
        {messages.map((msg, index) => {
          const isOwn = msg.user === user;
          const time = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return (
            <div key={index} className={`message-bubble ${isOwn ? 'own' : 'other'}`}>
              <div className="msg-user">{msg.user}</div>
              <div className="msg-text">{msg.text}</div>
              <div className="msg-time">{time}</div>
            </div>
          );
        })}
      </div>
      <div className="chat-input">
        <input 
          type="text" 
          placeholder="username" 
          value={user} 
          onChange={(e) => setUser(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Type a message ..." 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
}

export default Chat;
