import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { AuthContext } from "../../context/AuthContext";
import moment from "moment";

const ChatWindow = () => {
  const [textMessage, setTextMessage] = useState(null);

  const { currentChat, currentChatMessages, sendMessage } =
    useContext(ChatContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const chatWindow = document.getElementById("chatWindow");
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, [currentChatMessages]);

  let currentChatUser = useFetchRecipientUser(currentChat, user);
  return (
    <div className="h-full">
      <div className="border-b border-gray-200 dark:border-gray-600 text-center p-4">
        <span className="font-bold text-lg dark:text-white">
          {currentChatUser?.name}
        </span>
      </div>
      <div
        className="px-4 py-2 max-h-[390px] h-full overflow-y-scroll"
        id="chatWindow"
      >
        {currentChatMessages?.map((message, index) => {
          return (
            <div key={index}>
              {message?.senderId === user._id ? (
                <div className="flex justify-end mb-4">
                  <div className="flex flex-col rounded-bl-3xl max-w-[70%] items-end rounded-tl-3xl rounded-tr-xl px-4 py-2 text-white bg-blue-400">
                    <span className="break-all">{message?.text}</span>
                    <span className="text-xs text-gray-50 mt-1">
                      {moment(message.createdAt).calendar()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex justify-start mb-4">
                  <div className="flex flex-col max-w-[70%] items-start py-2 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                    <span className="break-all">{message?.text}</span>
                    <span className="text-xs text-gray-50 mt-1">
                      {moment(message.createdAt).calendar()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <form
        className="flex px-4 gap-5 mt-2"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(textMessage, user._id, currentChat);
          setTextMessage("");
        }}
      >
        <input
          type="text"
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
          id="first_name"
          className="bg-gray-50 border border-gray-300 h-11 text-gray-900 text-sm rounded-full w-full px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Message"
        />
        <button
          type="button"
          onClick={() => {
            sendMessage(textMessage, user._id, currentChat);
            setTextMessage("");
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
