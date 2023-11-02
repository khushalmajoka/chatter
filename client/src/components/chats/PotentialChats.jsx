import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import PotentialChat from "./PotentialChat";

const PotentialChats = () => {
  const { potentialChats} = useContext(ChatContext);

  return (
    <div className="px-10 py-4 flex">
      {potentialChats.map((chat, index) => {
        return (
          <PotentialChat key={index} chat={chat}/>
        );
      })}
    </div>
  );
};

export default PotentialChats;
