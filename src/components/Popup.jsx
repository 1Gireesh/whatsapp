import React from 'react'

export default function Popup({ isPopup, setIsPopup, popupRef, inputRef, contactsAndMessages, setContactsAndMessages, saveData}) {
    return (
        <>
            {isPopup && <div className="add_contact_popup">
                <div ref={popupRef} className="bg-white p-4 rounded-lg">
                    <h2 className="heading">Add New Contact</h2>
                    <input ref={inputRef} type="text" className="input" />
                    <button className="button"
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
        </>
    )
}
