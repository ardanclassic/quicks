import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Loading from "@/component/loading";
import mockdata from "@/assets/mocks/chatlist.json";

import search from "@/assets/icons/search-black.png";
import person from "@/assets/icons/person-white.png";
import person2 from "@/assets/icons/person-black.png";

function RoomList({ setcontentMode }: any) {
  const [loading, setLoading] = useState<boolean>(true);
  const [roomList, setRoomList] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    /** fetching from local mock data */
    setTimeout(() => {
      const getRoomList: any = mockdata.roomlist;
      if (getRoomList.length > 0) {
        setRoomList(getRoomList);
      }
      setLoading(false);
    }, 1500);
  }, []);

  const LoadingBox = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="loading-box text-center my-[30%]"
      >
        <Loading loading={loading} setLoading={setLoading} />
        <div className="font-bold text-primary-200 text-lg">Loading Chats ...</div>
      </motion.div>
    );
  };

  return (
    <>
      <div className="search-box relative">
        <input
          type="text"
          placeholder="Search"
          className="w-full py-2 px-12 rounded-[5px] border border-[#828282] border-solid"
        ></input>
        <Image src={search} alt="search" className="absolute w-4 h-4 top-3 right-12" />
      </div>

      {loading ? (
        <LoadingBox />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="roomlist my-2 text-primary-200"
        >
          {roomList?.map((room: any) => {
            return (
              <div
                key={room?.roomID}
                onClick={() => {
                  localStorage.setItem("roomID", room?.roomID);
                  setcontentMode("roomchat");
                }}
                className={`relative room-item flex pt-5 pb-8 border-b border-b-primary-200 [&:last-child]:border-none cursor-pointer hover:bg-gray-100 `}
              >
                <div className="avatar">
                  <div className={`pic-group flex justify-center min-w-[72px]`}>
                    {room?.connected && (
                      <div className="relative bg-primary-400 rounded-full w-[34px] h-[34px] p-2">
                        <Image
                          src={person2}
                          alt="avatar"
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3"
                        />
                      </div>
                    )}
                    <div
                      className={`relative bg-primary-100 rounded-full w-[34px] h-[34px] p-2 ${
                        room?.connected && "right-4"
                      }`}
                    >
                      {room?.connected ? (
                        <Image
                          src={person}
                          alt="avatar"
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18px] h-[18px]"
                        />
                      ) : (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white">
                          {room?.name.substring(0, 1)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="desc">
                  <div className="title-box flex gap-3">
                    <div className="room-name font-bold text-primary-100">{room?.name}</div>
                    <div className="datetime text-sm min-w-[130px]">
                      {room?.dateUpdated} {room?.time}
                    </div>
                  </div>
                  <div className="overview text-sm">
                    {room?.overview?.name && <div className="name font-bold">{room?.overview?.name} :</div>}
                    <div className="chat">{room?.overview?.chat}</div>
                  </div>
                </div>
                {room?.unread && (
                  <div className="status-dot absolute bottom-10 right-4 bg-indicator-300 w-2.5 h-2.5 rounded-full"></div>
                )}
              </div>
            );
          })}
        </motion.div>
      )}
    </>
  );
}

export default RoomList;
