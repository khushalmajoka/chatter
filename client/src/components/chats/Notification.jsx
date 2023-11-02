/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const Notification = ({ recipientUser }) => {
  const { notifications } = useContext(ChatContext);
  const count =
    notifications &&
    notifications.filter(
      (notification) => notification.senderId === recipientUser._id
    ).length;
  return (
    <>
      {count > 0 && (
        <div className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
          {count}
        </div>
      )}
    </>
  );
};

export default Notification;
