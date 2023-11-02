/* eslint-disable no-unused-vars */
import { getRequest } from "../api/services";
import Chats from "../components/chats/Chats";
import ChatWindow from "../components/chats/ChatWindow";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chats/PotentialChats";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex dark:bg-gray-900 flex-col mt-[4.5rem] bg-gray-50 h-[89.6vh]">
      <PotentialChats/>
      <div className="flex h-full justify-evenly px-10 pb-10">
        <div className="bg-white dark:bg-gray-900 border w-[22%] rounded-lg overflow-y-scroll border-gray-200 dark:border-gray-600">
          <Chats />
        </div>
        <div className="bg-white dark:bg-gray-900 border w-[65%] rounded-lg border-gray-200 dark:border-gray-600">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
};

export default Home;
