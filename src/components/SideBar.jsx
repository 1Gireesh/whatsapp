import "../styles/Sidebar.css";
import userIcon from "../assets/user.jpg";

const Sidebar = ({ contacts = [], setSelectedUser, selectedUser, setIsPopup, draft }) => {

  return (
    <div className="sidebar">
      <h2>Chats</h2>
      <ul>
        {contacts.map((contact) => (
          <li
            key={contact.id}
            onClick={() => setSelectedUser(contact.id)}
            className={"sidebar_contact " + (selectedUser === contact.id ? "bg-[#405a66]" : "")}
          >
            <img
              className="user_icon"
              src={userIcon}
              alt={`Profile picture of ${contact.name}`}
            />
            <div className="contact_content">
              <div className="contact_content_box">{contact.name}</div>
              <p>{draft[contact.id] ? '[Draft]' : contact.lastMessage}</p>
            </div>
          </li>
        ))}
        <li>
          <div className="new_contact_button"
            onClick={() => setIsPopup(true)}
          >Add New Contact</div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;