import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import UserCard from "./UserCard";

/* eslint-disable react/prop-types */
const Chats = () => {
  const { userChats, isUserChatsLoading, updateCurrentChat } =
    useContext(ChatContext);
  const { user } = useContext(AuthContext);

  return (
    <>
      {userChats ? (
        isUserChatsLoading ? (
          <p>Loading Chats...</p>
        ) : (
          <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
            {userChats?.map((chat, index) => {
              return (
                <div key={index} onClick={() => updateCurrentChat(chat)}>
                  <UserCard chat={chat} user={user} />
                </div>
              );
            })}
          </ul>
        )
      ) : null}
    </>
  );
};

export default Chats;
