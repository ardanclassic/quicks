import Image from "next/image";
import React from "react";
import menu from "@/assets/icons/dots-gray.png";

function MenuPopOver({ task, popover, setpopover, setdeleted, type }: any) {
  const handlePopover = (task: any) => {
    if (popover) {
      if (popover === task?.id) {
        setpopover("");
      } else {
        setpopover(task?.id);
      }
    } else {
      setpopover(task?.id);
    }
  };

  return (
    <div className="menu relative">
      <Image src={menu} alt="menu" onClick={() => handlePopover(task)} className="w-6 cursor-pointer" />
      <div
        className={`menu-box absolute right-0 bg-white w-[126px] text-[16px] border-[1px] border-[#BDBDBD] rounded-lg ${
          task?.id === popover ? "block" : "hidden"
        }`}
      >
        <div
          onClick={() => {
            if (type === "new") {
              setdeleted(false);
            } else {
              setdeleted(task?.id);
            }
          }}
          className="delete cursor-pointer py-2 px-3 text-indicator-300 hover:bg-gray-100"
        >
          Delete
        </div>
      </div>
    </div>
  );
}

export default MenuPopOver;
