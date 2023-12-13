import Image from "next/image";
import React from "react";
import menu from "@/assets/icons/dots-gray.png";

function MenuPopOver({ chat, popover, setpopover }: any) {
  const handlePopover = (chat: any) => {
    if (popover) {
      if (popover === chat?.chatID) {
        setpopover("");
      } else {
        setpopover(chat?.chatID);
      }
    } else {
      setpopover(chat?.chatID);
    }
  };

  return (
    <div className="menu relative">
      <Image src={menu} alt="menu" onClick={() => handlePopover(chat)} className="w-4 cursor-pointer" />
      <div
        className={`menu-box absolute bg-white w-[126px] text-[16px] border-[1px] border-[#BDBDBD] rounded-lg ${
          chat?.chatID === popover ? "block" : "hidden"
        }`}
      >
        <div className="edit cursor-pointer p-2 text-primary-100 border-b border-[#BDBDBD]">Edit</div>
        <div className="delete cursor-pointer p-2 text-indicator-300">Delete</div>
      </div>
    </div>
  );
}

export default MenuPopOver;
