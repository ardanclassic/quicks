"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
      className="content-box absolute right-6 bottom-[100px] w-[734px] h-[737px] p-4 bg-white rounded-lg text-black"
    >
      <ShowContent />
    </motion.div>
  );
}

export default InboxComponent;
