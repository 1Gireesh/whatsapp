import React, { useEffect, useState } from 'react';
import Sidebar from './SideBar';
import Chat from './Chat';

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
            ]
        }
    ]);

    const [isPopup, setIsPopup] = useState(false);
    const popupRef = React.useRef(null);
    const inputRef = React.useRef(null);

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

    return (
        <div className='flex h-screen' onClick={(e) => {
            if (!popupRef.current.contains(e.target)) {
                setIsPopup(false);
            }
        }}>
            <Sidebar contacts={contactsAndMessages.map(contact => ({ id: contact.id, name: contact.name, lastMessage: contact.messages[contact.messages.length - 1]?.message[0] }))}
                setIsPopup={setIsPopup}
                selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            <Chat chats={contactsAndMessages
                .map(e => ({ id: e.id, name: e.name, messages: e.messages }))
                .find(e => e.id === selectedUser)?.messages || []}
                selectedUser={selectedUser} setSelectedUser={setSelectedUser} addChat={addChat}
                setContactsAndMessages={setContactsAndMessages} contactsAndMessages={contactsAndMessages} />
            {isPopup && <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div ref={popupRef} className="bg-white p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-2">Add New Contact</h2>
                    <input ref={inputRef} type="text" className="w-full p-2 border border-gray-300 rounded-lg mb-2" />
                    <button className="bg-blue-500 text-white p-2 rounded-lg w-full"
                        onClick={() => {
                            const name = inputRef.current.value;
                            if (name) {
                                const id = contactsAndMessages.length + 1;
                                setContactsAndMessages([...contactsAndMessages, { id, name, messages: [] }]);
                                setIsPopup(false);
                                saveData();
                            }
                        }}
                    >Add</button>
                </div>
            </div>}
        </div>
    );
}
