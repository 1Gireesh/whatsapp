import React, { useEffect, useState } from 'react';
import Sidebar from './SideBar';
import Chat from './Chat';
import '../styles/main.css';
import Popup from './Popup';

export default function Main() {
    const [contactsAndMessages, setContactsAndMessages] = useState([
        {
            id: 1,
            name: "John Doe",
            messages: [
                {
                    date: "2024-02-27T10:00:00Z",
                    message: ["Hello!", "How are you?"]
                }
            ],
            phoneNumber: "916360621591"
        }
    ]);

    const [isPopup, setIsPopup] = useState(false);
    const popupRef = React.useRef(null);
    const inputRef = React.useRef(null);
    const [draft, setDraft] = useState({});

    useEffect(() => {
        const data = localStorage.getItem('wbData');
        if (data) {
            try {
                const parsedData = JSON.parse(data);
                setContactsAndMessages(parsedData.contactsAndMessages || []);
            } catch (error) {
                console.error('Error parsing local storage data:', error);
            }
        }
    }, []);

    const saveData = () => {
        localStorage.setItem('wbData', JSON.stringify({ contactsAndMessages }));
    }

    const addChat = (id, obj) => {
        const { date, message } = obj;
        const contact = contactsAndMessages.find(e => e.id === id);
        contact.messages.push({ date, message });
        setContactsAndMessages([...contactsAndMessages]);
        saveData();
    }

    const [selectedUser, setSelectedUser] = useState(null);
    const contactInfo = contactsAndMessages.map(contact => ({
        id: contact.id, name: contact.name,
        lastMessage: contact.messages[contact.messages.length - 1]?.message[0]
    }))
    const messages = contactsAndMessages.map(e => ({
        id: e.id, name: e.name, messages: e.messages
    })).find(e => e.id === selectedUser)?.messages || []

    return (
        <div className='flex h-screen' onClick={(e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setIsPopup(false);
            }
        }}>
            <Sidebar
                contacts={contactInfo}
                setIsPopup={setIsPopup} draft={draft}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser} />
            <Chat chats={messages}
                draft={draft} setDraft={setDraft}
                selectedUser={selectedUser} setSelectedUser={setSelectedUser} addChat={addChat}
                setContactsAndMessages={setContactsAndMessages} contactsAndMessages={contactsAndMessages} />
            <Popup isPopup={isPopup} setIsPopup={setIsPopup} popupRef={popupRef} inputRef={inputRef} contactsAndMessages={contactsAndMessages} setContactsAndMessages={setContactsAndMessages} saveData={saveData} />

        </div>
    );
}
