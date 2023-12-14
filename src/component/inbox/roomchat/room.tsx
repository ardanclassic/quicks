import React, { useEffect, useState } from "react";
import MenuPopOver from "./popover";

function ShowRoom({ roomInfo }: any) {
  const refchat = React.useRef<HTMLDivElement>(null);
  const myUserID = "101";
  const [roomchat, setroomchat] = useState<string[]>([]);
  const [popover, setpopover] = useState<string>("");

  useEffect(() => {
    if (roomchat.length) {
      refchat?.current?.scrollIntoView({});
    }
  }, [roomchat]);

  useEffect(() => {
    /** fetching from local mock data */
    if (roomInfo?.chats?.length > 0) {
      const reversed = [...roomInfo.chats].reverse();
      setroomchat(reversed);
    }
  }, []);

  return (
    <>
      {roomInfo?.chats?.length > 0 ? (
        roomchat.map((chat: any) => {
          return (
            <div key={chat?.chatID}>
              {chat?.unread && (
                <div className="unread flex items-center text-indicator-300 font-bold text-center">
                  <div className="line flex-1 h-[1px] bg-indicator-300"></div>
                  <div className="text mx-2">New Message</div>
                  <div className="line flex-1 h-[1px] bg-indicator-300"></div>
                </div>
              )}
              <div className={`chat-item text-sm my-2`}>
                <div
                  className={`sender font-bold ${chat.senderID === myUserID && "text-right"}`}
                  style={{ color: chat?.theme?.color }}
                >
                  {chat.senderID === myUserID ? "You" : chat?.senderName}
                </div>
                <div
                  className={`flex gap-2 text-primary-200 w-max max-w-[518px] ${
                    chat.senderID === myUserID && "ml-auto flex-row-reverse"
                  }`}
                >
                  <div className={`chat-box p-2 rounded-lg flex-1`} style={{ backgroundColor: chat?.theme?.bg }}>
                    <div className="message">{chat?.message}</div>
                    <div className="time mt-2 text-[13px]">{chat?.time}</div>
                  </div>
                  <MenuPopOver chat={chat} popover={popover} setpopover={setpopover} />
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="blank relative top-36 my-4 text-center font-bold text-primary-300">no chat here ...</div>
      )}

      <div ref={refchat} className="bottom"></div>
    </>
  );
}

export default ShowRoom;
