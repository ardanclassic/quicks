"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import caret_down from "@/assets/icons/caret-down-dark.png";

function HeaderSection({ taskSelected, setTaskSelected, setNewTask }: any) {
  const [taskpopover, settaskpopover] = useState<boolean>(false);

  const ShowPopOver = () => {
    return (
      <div
        className={`task-popover ${
          taskpopover ? "block" : "hidden"
        } absolute left-4 top-12 w-[288px] bg-white z-10 text-sm border-[1px] border-[#828282] rounded-md font-bold`}
      >
        <div
          onClick={() => {
            setTaskSelected("personal");
            settaskpopover(!taskpopover);
          }}
          className="edit cursor-pointer p-2 text-primary-200 border-b border-[#828282] hover:bg-gray-100"
        >
          Personal Errands
        </div>
        <div
          onClick={() => {
            setTaskSelected("urgent");
            settaskpopover(!taskpopover);
          }}
          className="delete cursor-pointer p-2 text-primary-200 hover:bg-gray-100"
        >
          Urgent To-Do
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-4 justify-between mb-2">
      <div className="task-popover relative">
        <div
          onClick={() => settaskpopover(!taskpopover)}
          className="toggler flex gap-2 justify-between items-center min-w-[118px] py-2 pl-3 pr-2 ml-24 rounded-md border-[1px] border-[#828282] text-primary-200 cursor-pointer"
        >
          <div className="text-primary-200 font-bold text-sm">
            {taskSelected ? (taskSelected === "personal" ? "Personal Errands" : "Urgent To-Do") : "My Task"}
          </div>
          <div className="icon">
            <Image src={caret_down} alt="down" className="w-6" />
          </div>
          <ShowPopOver />
        </div>
      </div>
      <div className="btn-area">
        <button
          onClick={() => setNewTask(true)}
          className="py-2 px-3 bg-primary-100 w-[100px] text-white text-sm rounded-lg font-bold"
        >
          New Task
        </button>
      </div>
    </div>
  );
}

export default HeaderSection;
