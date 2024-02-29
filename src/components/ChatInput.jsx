import React from 'react'

export default function ChatInput({ inputRef, handleAddChat, selectedUser, draft, setDraft}) {
    return (
        <div className="chat_input_box">
            <input ref={inputRef}
                type="text"
                placeholder="Type a message..."
                onKeyDown={(e) => (e.key === 'Enter') && handleAddChat(selectedUser)}
                onChange={(e) => setDraft({ ...draft, [selectedUser]: e.target.value })}
                className="chat_input"
            />
            <button className="chat_button"
                onClick={() => handleAddChat(selectedUser)}
            >Send</button>
        </div>
    )
}
