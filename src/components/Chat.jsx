// Chat.js
import React from 'react';
import moment from 'moment';
import axios from 'axios';

// curl -X  POST \
// 'https://graph.facebook.com/v19.0/FROM_PHONE_NUMBER_ID/messages' \
// -H 'Authorization: Bearer ACCESS_TOKEN' \
// -H 'Content-Type: application/json' \
// -d '
//     {
//       "messaging_product": "whatsapp",
//       "recipient_type": "individual",
//       "to": "PHONE_NUMBER",
//       "type": "text",
//       "text": { // the text object
//         "preview_url": false,
//         "body": "MESSAGE_CONTENT"
//         }
//     }'

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

const Chat = ({ chats, addChat, selectedUser }) => {

  const inputRef = React.useRef(null);
  const handleAddChat = (id) => {
    const message = inputRef.current.value;
    addChat(id, { date: new Date(), message: message })
    sendMessage(message);
    inputRef.current.value = '';
  }

  return (
    <div className="flex flex-col w-full justify-between bg-gray-100 p-4">
      <div className="bg-white mt-4 p-4 rounded-lg shadow">
        {chats.map((chat, index) => (
          <div key={index} className="flex flex-col mb-2">
            <div className="flex items-center mb-1">
              <p className="ml-2 text-sm font-semibold">{chat.name}</p>
            </div>
            <div className="bg-gray-200 rounded-lg p-2">
              <p className="text-sm">{chat.message}</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">{moment(chat.date).fromNow()}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-5">
        <input ref={inputRef}
          type="text"
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddChat(selectedUser);
            }
          }
          }
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <button className="bg-blue-500 text-white p-2 rounded-lg w-[100px]"
          onClick={() => handleAddChat(selectedUser)}
        >Send</button>
      </div>
    </div>
  );
};

export default Chat;
