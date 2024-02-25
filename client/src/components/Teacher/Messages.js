import React, { useState, useEffect } from 'react';

const MessageCard = ({ senderName, messageContent, sentDate }) => (
  <div className="flex flex-col sm:flex-row justify-between items-center gap-5 py-6 px-8 mt-4 bg-white rounded-xl border border-gray-200 shadow-lg w-full max-w-4xl">
    <div className="flex-grow">
      <h3 className="text-xl font-semibold">{senderName}</h3>
      <p className="text-gray-600 mt-2">{messageContent}</p>
    </div>
    <div className="text-sm text-gray-500">{sentDate}</div>
  </div>
);

const MessagesSection = ({ messages }) => (
  <div>
    {messages.length > 0 ? (
      messages.map((message, index) => (
        <MessageCard key={index} {...message} />
      ))
    ) : (
      <p className="text-center mt-4">No messages found</p>
    )}
  </div>
);

const Messages_Teacher = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
     // Replace this URL with your actual endpoint to fetch messages
     fetch('/api/messages.json')
       .then(response => response.json())
       .then(data => setMessages(data))
       .catch(error => console.error("Failed to load messages:", error));
  }, []);

  return (
    <div className="block !important">
      <div className="min-h-screen flex flex-col items-center pb-12 px-4 bg-zinc-100">
        <div className="w-full max-w-4xl mt-8">
          <h2 className="text-2xl font-bold text-center mb-6">Your Messages</h2>
          <MessagesSection messages={messages} />
        </div>
      </div>
    </div>
  );
};

export default Messages_Teacher;
