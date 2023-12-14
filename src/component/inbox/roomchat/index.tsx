import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Loading from "@/component/loading";

import mockdata from "@/assets/mocks/chatroom.json";
import back from "@/assets/icons/arrow-left-black.png";
import close from "@/assets/icons/close-black.png";
import ShowRoom from "./room";

function RoomChat({ setcontentMode }: any) {
  const [loading, setLoading] = useState<boolean>(true);
  const [roomInfo, setroomInfo] = useState<any>();
  const [popover, setpopover] = useState("");
  const [unreadChat, setUnreadChat] = useState(false);

  useEffect(() => {
    setLoading(true);
    /** fetching from local mock data */
    setTimeout(() => {
      const getRoomID = localStorage.getItem("roomID");
      const roomInfo: any = mockdata.chatroom.find((el) => el.roomID === getRoomID);
      if (roomInfo) {
        setroomInfo(roomInfo);
      }
      setLoading(false);
    }, 1500);
  }, []);

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const scrollRatio = scrollTop / (scrollHeight - clientHeight);
    // console.log(scrollRatio);

    if (scrollRatio < 0.5) {
      setUnreadChat(true);
    } else {
      setUnreadChat(false);
    }
  };

  const LoadingBox = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="loading-box text-center my-[30%]"
      >
        <Loading loading={loading} setLoading={setLoading} />
        <div className="font-bold text-primary-200 text-lg">Loading Chats ...</div>
      </motion.div>
    );
  };

  const handlePopover = (chat: any) => {
    if (popover) {
      if (popover === chat.chatID) {
        setpopover("");
      } else {
        setpopover(chat.chatID);
      }
    } else {
      setpopover(chat.chatID);
    }
  };

  const UnreadMessagePopup = () => {
    if (roomInfo.unread && unreadChat) {
      return (
        <div className="newchat absolute w-[141px] left-1/2 -translate-x-1/2 bottom-[56px] rounded-lg text-center p-2 bg-stickers-100 text-primary-100 font-bold">
          New Message
        </div>
      );
    }
  };

  const ConnectingPopup = () => {
    if (!roomInfo.connected) {
      return (
        <div className="newchat flex gap-3 items-center absolute w-full left-1/2 -translate-x-1/2 bottom-14 rounded-lg py-4 px-4 bg-stickers-100 ">
          <div className="loading">
            <Loading
              loading={true}
              setLoading={setLoading}
              size={32}
              color={"#2F80ED"}
              css={{ borderWidth: "4px", margin: "0 auto" }}
            />
          </div>
          <div className="text-primary-200 text-[15px] font-bold">
            Please wait while we connect you with one of our team ...
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="header flex gap-4 items-center min-h-[60px] pb-4 px-2 border-b border-[#BDBDBD]">
        <div className="backarea">
          <Image src={back} alt="back" onClick={() => setcontentMode("list")} className="w-6 cursor-pointer" />
        </div>
        <div className="title flex-1">
          <div className="name text-primary-100 font-bold text-ellipsis overflow-hidden whitespace-nowrap max-w-[600px]">
            {!loading && roomInfo?.name}
          </div>
          <div className="participant text-sm text-[#333333]">
            {!loading && roomInfo?.participant + " Participants"}
          </div>
        </div>
        <div className="close-area">
          <Image src={close} alt="close" onClick={() => setcontentMode("list")} className="w-4 cursor-pointer" />
        </div>
      </div>
      {loading ? (
        <LoadingBox />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="maincontent relative"
        >
          <div onScroll={handleScroll} className="room-chat px-4 pb-4 mb-3 overflow-x-hidden h-[590px] overflow-y-auto">
            <ShowRoom roomInfo={roomInfo} popover={popover} handlePopover={handlePopover} />
          </div>
          <UnreadMessagePopup />
          <ConnectingPopup />

          {roomInfo?.chats?.length > 0 && (
            <div className="sendbox flex gap-3 bg-white w-full">
              <input
                type="text"
                placeholder="Type a new message"
                className="flex-1 border border-primary-300 py-2 px-6 rounded-lg"
              />
              <button type="submit" className="py-2 px-3 bg-primary-100 text-white font-bold rounded-lg">
                Send
              </button>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
}

export default RoomChat;
