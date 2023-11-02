/* eslint-disable react/prop-types */
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { useFetchChatMessages } from "../../hooks/useFetchChatMessages";
import moment from "moment";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import Notification from "./Notification";

const UserCard = ({ chat, user }) => {
  const { onlineUsers } = useContext(ChatContext);

  const recipientUser = useFetchRecipientUser(chat, user);
  const chatMessages = useFetchChatMessages(chat);

  const lastChatMessage = chatMessages
    ? chatMessages[chatMessages?.length - 1]
    : null;
  return (
    <li className="cursor-pointer p-3 sm:p-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            className="w-10 h-10 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="profile image"
          />
          {onlineUsers.some((u) => u.userId === recipientUser?._id) && (
            <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
          )}
        </div>
        {lastChatMessage ? (
          <div className="flex-1 min-w-0">
            <div className="flex justify-between">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                {recipientUser?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {lastChatMessage &&
                  moment(lastChatMessage?.createdAt).format("DD/MM/YYYY")}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {lastChatMessage
                  ? lastChatMessage?.text?.length <= 25
                    ? lastChatMessage?.text
                    : `${lastChatMessage?.text.substr(0, 25)}...`
                  : ""}
              </p>
              <Notification recipientUser={recipientUser}/>
            </div>
          </div>
        ) : (
          <div className="flex-1 min-w-0">
            <div className="flex justify-between">
              <p className="text-[16px] font-medium text-gray-900 truncate dark:text-white">
                {recipientUser?.name}
              </p>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default UserCard;
