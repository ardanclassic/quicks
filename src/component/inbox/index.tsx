"use client";
import React, { useState } from "react";

import RoomList from "./roomlist";
import RoomChat from "./roomchat";

function InboxComponent() {
  const [contentMode, setcontentMode] = useState<string>("list");

  const ShowContent = () => {
    if (contentMode) {
      if (contentMode === "list") {
        return <RoomList setcontentMode={setcontentMode} />;
      } else {
        return <RoomChat setcontentMode={setcontentMode} />;
      }
    } else {
      return null;
    }
  };

  return (
    <div className="content-box absolute right-6 bottom-[100px] w-[734px] h-[737px] p-4 bg-white rounded-lg text-black">
      <ShowContent />
    </div>
  );
}

export default InboxComponent;
