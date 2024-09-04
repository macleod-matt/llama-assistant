import React, { useState, FormEvent } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { MessageList } from './components/MessageList/MessageList';
import Form from './components/Form/Form';
import Overlay from './components/Overlay/Overlay';
import { JarvisLogo } from './components/JarvisLogo/JarvisLogo';

export interface Message {
  role: string;
  content: string;
}

export interface Chat {
  title: string;
  messages: Message[];
}

export type Chats = Chat[];

const App: React.FC = () => {
  const fakeChats: Chats = [
    {
      title: 'New Chat',
      messages: [],
    },
    {
      title: 'Worlds Tallest Building',
      messages: [
        { role: 'user', content: 'What is the worlds tallest building?' },
        {
          role: 'jarvis',
          content:
            'As of 2024, the tallest building in the world is the Burj Khalifa in Dubai, United Arab Emirates. It stands at a height of 828 meters (2,717 feet) and has 163 floors.',
        },
      ],
    },
    {
      title: 'Immigrate to USA on TN Visa',
      messages: [
        {
          role: 'user',
          content:
            "Hello. I am working for a company that resides in America. The company is Impact.com. I currently live on Vancouver Island in British Columbia, and I'm fed up with the taxes and the cost of living, and my ultimate goal would be to immigrate to the United States. I think I would prefer to reside in the great state of Texas, and I lack the information to make that happen. How can I immigrate to Texas as a Canadian who has been working with an American company for over a year?",
        },
        {
          role: 'jarvis',
          content:
            "Moving to the U.S. involves several steps, and having an American employer can help. Since you've been working with an American company, you might qualify for a work visa like the H-1B or the TN visa, which is specifically for Canadians and Mexicans under the NAFTA agreement.The TN visa is a good option for professionals, including those in tech fields. Your company would need to provide a job offer and prove that you meet the qualifications for the position. The application process involves submitting documentation and possibly attending an interview. Once you have a work visa, you can reside in Texas. For long-term residency, you might consider applying for a Green Card, which involves a more complex process but can lead to permanent residency. Have you discussed this with your employer? They might have resources to assist you with the immigration process.",
        },
        {
          role: 'user',
          content: 'I have not spoken to my employer yet.',
        },
        {
          role: 'jarvis',
          content:
            'It might be a good idea to start by discussing your plans with your employer. They might have experience or resources to help with your immigration process. Plus, their support can be crucial for visa applications. You could explain your situation and ask if they can sponsor you for a work visa like the TN or H-1B. This support could make the process smoother and faster. Are you comfortable approaching them about this?',
        },
        {
          role: 'user',
          content:
            'Yes, I would be comfortable approaching them about this. Can you explain the difference between a TN visa and an L1 visa and explain to me which one you think is a better option? I am not in any managerial position and I have no degrees. All I have is a tech job. I have been working with them for over a year and I want the best visa that I can possibly get.',
        },
      ],
    },
  ];
  const [value, setValue] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>(fakeChats[0].messages);
  const [previousChats, setPreviousChats] = useState<Chats>(fakeChats);
  const [currentChat, setCurrentChat] = useState<Chat>(fakeChats[0]);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [currentChatTitle, setCurrentChatTitle] = useState<string | null>(
    fakeChats[0].title
  );

  // update input on change
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  // clear input after submit
  const onClear = () => {
    setValue('');
  };

  const createNewChat = () => {
    setMessages([]);
    setValue('');
    setCurrentChatTitle(null);
  };

  const handleChatClick = (chat: Chat) => {
    setCurrentChat(chat);
    setMessages(chat.messages);
  };

  // TODO: Create useEffect that calls getMessages everytime you submit the form

  const getMessages = async () => {
    try {
      console.log('messagaes before ', messages);
      // TODO: add loading state here
      const response = await fetch('http://localhost:5597/get_response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: value }),
      });
      const data = await response.json();
      setMessages([
        ...messages,
        { role: 'user', content: value },
        { role: 'jarvis', content: data.response },
      ]);
      //TODO: Add error handling
    } catch (error) {
      console.error('Error is ', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      getMessages();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      setMessages((messages) => [
        ...messages,
        {
          role: 'user',
          content: value,
        },
      ]);
      getMessages();
      onClear();
    }
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setShowOverlay(!showOverlay);
  };

  return (
    <div className='app'>
      <Overlay showOverlay={showOverlay} setShowOverlay={setShowOverlay}>
        <JarvisLogo />
      </Overlay>
      <Sidebar
        currentChat={currentChat}
        createNewChat={createNewChat}
        previousChats={previousChats}
        handleChatClick={handleChatClick}
      />
      <section className='main'>
        <img src='/jarvis-logo.png' className='jarvis-top-logo' />
        <MessageList messages={messages} />
        <Form
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          value={value}
          onChange={onInputChange}
          onMicrophoneClick={handleOverlayClick}
        />
      </section>
    </div>
  );
};

export default App;
