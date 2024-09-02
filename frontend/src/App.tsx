import React, { useState, useEffect, useRef, FormEvent } from 'react';

interface Message {
  role: string;
  content: string;
}

interface Chat {
  title: string;
  messages: Message[];
}

type Chats = Chat[];

const App: React.FC = () => {
  const fakeChats: Chats = [
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
  const [messages, setMessages] = useState<Message[]>(fakeChats[1].messages);
  const [previousChats, setPreviousChats] = useState<Chat[]>(fakeChats);
  const [currentChat, setCurrentChat] = useState<Chat>(fakeChats[1]);

  const [currentChatTitle, setCurrentChatTitle] = useState<string | null>(
    fakeChats[0].title
  );
  const loader = document.querySelector<HTMLDivElement>('#loading');

  // update input on change
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  // clear input after submit
  const onClear = () => {
    setValue('');
  };

  // showing loading
  function displayLoading() {
    if (loader) loader.classList.add('display');
  }

  // hiding loading
  function hideLoading() {
    if (loader) loader.classList.remove('display');
  }

  // always scroll to the bottom/latest message
  const AlwaysScrollToBottom: React.FC = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (elementRef.current) elementRef.current.scrollIntoView();
    });
    return <div ref={elementRef} />;
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

  const getMessages = async () => {
    // const options = {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     message: value,
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };
    // try {
    //   displayLoading();
    //   const response = await fetch('/chatgpt-clone-react', options);
    //   const data = await response.json();
    //   if (data.choices && data.choices.length > 0) {
    //     setMessages(data.choices[0].message);
    //   } else {
    //     console.error(
    //       'Invalid response data: choices array is empty or undefined'
    //     );
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    // hideLoading();
    console.log('Fetch messages from server');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      getMessages();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      console.log('Messages are ', messages);
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

  return (
    <div className='app'>
      <section className='side-bar'>
        <img src='/jarvis-logo2.jpg' className='jarvis-logo' />
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className='history'>
          {previousChats?.map((chat, index) => (
            <li key={index} onClick={() => handleChatClick(chat)}>
              {chat.title}
            </li>
          ))}
        </ul>
      </section>
      <section className='main'>
        <img src='/jarvis-logo.png' className='jarvis-top-logo' />
        <ul className='feed'>
          {messages.map((chatMessage, index) => (
            <li
              key={index}
              className={
                chatMessage.role === 'user' ? 'user-message' : 'jarvis-message'
              }
            >
              {chatMessage.role === 'jarvis' && <p className='role'>Jarvis:</p>}
              <p>{chatMessage.content}</p>
            </li>
          ))}
          <AlwaysScrollToBottom />
        </ul>
        <div className='bottom-section'>
          <form
            className='input-container'
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
          >
            <div className='input-wrap'>
              <input id='inputId' value={value} onChange={onInput} />
            </div>
            <div id='submit'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='32'
                height='32'
                fill='none'
                viewBox='0 0 32 32'
                className='submit-icon'
              >
                <path
                  fill='currentColor'
                  fillRule='evenodd'
                  d='M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
          </form>
          <p className='info'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Consectetur accusantium libero dicta quas magnam voluptates soluta
            maxime corporis! Eius, asperiores?
          </p>
        </div>
      </section>
    </div>
  );
};

export default App;
