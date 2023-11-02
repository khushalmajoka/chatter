/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialChat = ({ chat }) => {
  const { createChat, onlineUsers } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  return (
    <div className="relative">
      <button
        onClick={() => createChat(user._id, chat._id)}
        type="button"
        className="text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
      >
        {chat.name}
      </button>
      {onlineUsers.some((u) => u.userId === chat?._id) && (
        <span className="z-10 -top-[0.20rem] -left-[0.20rem] absolute  w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
      )}
    </div>
  );
};

export default PotentialChat;
