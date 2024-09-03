import React from 'react';
import { Chat, Chats } from '../../App';
import styles from './Sidebar.module.css';
import { Button } from '../Button/Button';

interface SidebarProps {
  createNewChat: () => void;
  previousChats: Chats;
  handleChatClick: (chat: Chat) => void;
  currentChat: Chat;
}

const Sidebar = ({
  createNewChat,
  previousChats,
  handleChatClick,
  currentChat,
}: SidebarProps) => {
  return (
    <section className={styles.sideBar}>
      <Button onClick={createNewChat}>New Chat +</Button>
      <ul className={styles.chatHistory}>
        {previousChats?.map((chat, index) => (
          <li
            className={
              currentChat.title === chat.title ? styles.currentChat : ''
            }
            key={index + chat.title}
            onClick={() => handleChatClick(chat)}
          >
            {chat.title}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Sidebar;
