
import userIcon from "../assets/user.jpg";

const Sidebar = ({ contacts = [], setSelectedUser, selectedUser,setIsPopup }) => {
  return (
    <div className="bg-[#263238] text-white p-1 rounded-tl-xl rounded-bl-xl">
      <h2 className="text-lg w-[200px] font-bold mb-2">Chats</h2>
      <ul className="list-none w-[200px] py-2 overflow-y-auto h-screen">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            onClick={() => setSelectedUser(contact.id)}
            className={"flex items-center p-2 hover:bg-[#36454c] cursor-pointer "+(selectedUser === contact.id ? "bg-[#405a66]" : "")}
          >
            <img
              className="h-10 w-10 rounded-full mr-2"
              src={userIcon}
              alt={`Profile picture of ${contact.name}`}
            />
            <div className="flex-grow">
              <div className="text-base font-semibold">{contact.name}</div>
              <p className="text-sm text-gray-300">{contact.lastMessage}</p>
            </div>
          </li>
        ))}
        <li>
          <div className="flex items-center p-2 hover:bg-[#36454c] cursor-pointer"
            onClick={() => setIsPopup(true)}
          >Add New Contact</div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;