/* eslint-disable react/prop-types */
import { createContext, useCallback, useEffect, useState } from "react";
import { getRequest, postRequest } from "../api/services";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentChatMessages, setCurrentChatMessages] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [notifications, setNotifications] = useState([]);

  console.log(notifications);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineUsers", (response) => {
      setOnlineUsers(response);
    });
    return () => socket.off("getOnlineUsers");
  }, [socket, user]);

  useEffect(() => {
    if (socket === null) return;

    const recipientId = currentChat?.members?.find((id) => id !== user?._id);
    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [socket, currentChat, newMessage, user]);

  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (response) => {
      if (currentChat._id != response.chatId) return;

      setCurrentChatMessages((prev) => [...prev, response]);
    });

    socket.on("getNotification", (response) => {
      const isChatOpen = currentChat?.members.some(
        (id) => id === response.senderId
      );

      if (isChatOpen) {
        setNotifications((prev) => [...prev, { ...response, isRead: true }]);
      } else {
        setNotifications((prev) => [...prev, response]);
      }
    });

    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket, currentChat]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest("/users");

      if (response.error) {
        return console.error(response);
      }

      const pChats = response.filter((u) => {
        let isChatCreated = false;
        if (user._id === u._id) return false;

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }

        return !isChatCreated;
      });
      setPotentialChats(pChats);
    };

    getUsers();
  }, [userChats, user]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        const response = await getRequest(`/chats/${user._id}`);

        if (response.error) {
          return console.log(response);
        }

        setUserChats(response);
      }
    };

    getUserChats();
  }, [user]);

  useEffect(() => {
    const getCurrentChatMessages = async () => {
      if (currentChat) {
        const response = await getRequest(`/messages/${currentChat._id}`);

        if (response.error) {
          return console.error(response);
        }

        setCurrentChatMessages(response);
      }
    };

    getCurrentChatMessages();
  }, [currentChat]);

  useEffect(() => {
    userChats && setCurrentChat(userChats[0]);
  }, [userChats]);

  const sendMessage = useCallback(async (text, senderId, chatId) => {
    if (!text) return console.log("Please enter a text message");

    const response = await postRequest(
      "/messages",
      JSON.stringify({
        chatId,
        senderId,
        text,
      })
    );

    if (response.error) {
      return console.log(response);
    }

    setNewMessage(response);
    setCurrentChatMessages((prev) => [...prev, response]);
  }, []);

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      "/chats",
      JSON.stringify({
        firstId,
        secondId,
      })
    );

    if (response.error) {
      return console.log(response);
    }

    setUserChats((prev) => [...prev, response]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        potentialChats,
        createChat,
        updateCurrentChat,
        currentChat,
        currentChatMessages,
        sendMessage,
        onlineUsers,
        notifications
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
