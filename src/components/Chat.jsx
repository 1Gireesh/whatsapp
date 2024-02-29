// Chat.js
import React, { useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import "../styles/chat.css";
import ChatInput from './ChatInput';

const sendMessage = async (message) => {
  axios.post('https://graph.facebook.com/v19.0/248003835064714/messages', {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: "916360621591",
    type: "text",
    text: {
      preview_url: false,
      body: message
    }
  }, {
    headers: {
      'Authorization': 'Bearer EAAN8EuPSBUsBOx93l7qFZBVyuI2oty1P7wtxiXtTgntepYCLj864nZBsK5R6n1CCY7xX1EJnSZBnltY0XgorEgB2BXgRsTz6kN1A0dj7aVlPc26fwGxzaL0oOw9ZCpaVBdeiyrnkEeHBSOfJUe9JIZAgNKARmVedMb4UveytkUiBNxytdHFwWkIZBrBdpgOL5WrLrtyqWPfsRLgoYh2egZD',
      'Content-Type': 'application/json'
    }
  }).then(response => {
    console.log(response);
  }).catch(error => {
    console.error(error);
  });
}

const Chat = ({ chats, addChat, selectedUser, draft, setDraft }) => {

  const inputRef = React.useRef(null);
  const handleAddChat = (id) => {
    const message = inputRef.current.value;
    addChat(id, { date: new Date(), message: message })
    sendMessage(message);
    inputRef.current.value = '';
  }

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.value = draft[selectedUser] || '';
    console.log(draft[selectedUser], selectedUser)
  }, [chats]);

  return (
    <div className="chat_box">
      <div className="chat_content">
        {chats.map((chat, index) => (
          <div key={index} className="chat_card">
            <div className="chat_card_div">
              <p className="">{chat.name}</p>
            </div>
            <div className="chat_message_div">
              <p className="">{chat.message}</p>
            </div>
            <p className="chat_time">{moment(chat.date).fromNow()}</p>
          </div>
        ))}
      </div>
      <ChatInput inputRef={inputRef} handleAddChat={handleAddChat} selectedUser={selectedUser} draft={draft} setDraft={setDraft} />
    </div>
  );
};

export default Chat;
