import React, { useState } from 'react';
import { sendMessage } from '../../services/api';
import MessageInput from '../MessageInput/MessageInput';
import styles from './ChatWindow.module.css';

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );

  const handleSend = async (text: string) => {
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    const response = await sendMessage(text);
    setMessages((prev) => [...prev, { sender: 'bot', text: response.reply }]);
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <div key={index} className={styles[msg.sender]}>
            {msg.text}
          </div>
        ))}
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;
