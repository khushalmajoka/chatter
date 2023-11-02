import { useEffect, useState } from "react";
import { getRequest } from "../api/services";

export const useFetchChatMessages = (chat) => {
  const [chatMessages, setChatMessages] = useState(null);
  useEffect(() => {
    const getChatMessages = async () => {
      if (chat) {
        const response = await getRequest(`/messages/${chat._id}`);

        if (response.error) {
          return console.error(response);
        }

        return setChatMessages(response);
      }
    };

    getChatMessages();
  }, [chat]);

  return chatMessages;
};
