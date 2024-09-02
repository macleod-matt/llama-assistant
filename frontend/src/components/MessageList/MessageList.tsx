import React from 'react';
import { Message } from '../../App';
import { ScrollToBottom } from '../ScrollToBottom/ScrollToBottom';
import styles from './MessageList.module.css';

interface MessageListProps {
  messages: Message[];
}

export const MessageList = ({ messages }: MessageListProps) => {
  return (
    <ul className={styles.feed}>
      {messages.map((chatMessage, index) => (
        <li
          key={index}
          className={
            chatMessage.role === 'user'
              ? styles.userMessage
              : styles.jarvisMessage
          }
        >
          <p>
            {chatMessage.role === 'jarvis' && (
              <span className={styles.jarvisLabel}>Jarvis: </span>
            )}
            {chatMessage.content}
          </p>
        </li>
      ))}
      <ScrollToBottom />
    </ul>
  );
};
