import React from 'react';

const Message = ({ content, sender }) => {
  return (
    <div className={`message ${sender}`}>
      <p>{content}</p>
    </div>
  );
};

export default Message;
