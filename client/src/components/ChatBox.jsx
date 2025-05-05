import React from 'react';
import Message from './Message';

const ChatBox = ({ messages }) => {
  return (
    <div className="chat-box">
      {messages.map((msg, index) => (
        <Message key={index} content={msg.content} sender={msg.sender} />
      ))}
    </div>
  );
};

export default ChatBox;
