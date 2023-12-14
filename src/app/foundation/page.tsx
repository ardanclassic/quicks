"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";

import quick from "@/assets/icons/quick.png";
import search from "@/assets/icons/search-white.png";
import task_def from "@/assets/icons/task-orange.png";
import inbox_def from "@/assets/icons/inbox-purple.png";
import task_active from "@/assets/icons/task-white.png";
import inbox_active from "@/assets/icons/inbox-white.png";
import TaskComponent from "@/component/task";
import InboxComponent from "@/component/inbox";
import Fade from "@/component/fade";

function Foundation() {
  const controls = useAnimationControls();
  const [quickstat, setquickstat] = useState(false);
  const [window, setwindow] = useState("");

  useEffect(() => {
    if (window) {
      if (window === "inbox") {
        controls.start({ left: "84px" });
      } else {
        controls.start((i) => ({ left: i === 2 ? "168px" : "0px" }));
      }
    } else {
      if (quickstat) {
        controls.start({ left: "0" });
      } else {
        controls.start((i) => ({ left: i > 1 ? "168px" : "84px" }));
      }
    }
  }, [quickstat, window]);

  const DisplayWindow = () => {
    if (window) {
      if (window === "task") {
        return (
          <Fade isActive={window === "task"}>
            <TaskComponent />
          </Fade>
        );
      } else {
        return (
          <Fade isActive={window === "inbox"}>
            <InboxComponent />
          </Fade>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <div className="main-container h-screen relative">
      <div className="search-box relative">
        <Image src={search} alt="quick" className="w-[16px] absolute left-14 top-1/2 -translate-x-8 -translate-y-1/2" />
        <input type="text" className="bg-primary-200 w-full py-3 px-8 pl-14 outline-none" />
      </div>
      <DisplayWindow />

      <div className="btn-group absolute bottom-4 right-4 flex gap-4 flex-row-reverse">
        <button
          className={`relative bg-primary-100 rounded-full w-[68px] h-[68px] p-3 transition ease-in duration-300 ${
            !window ? "z-[3]" : "z-[1] bg-primary-200 -translate-x-2"
          } cursor-pointer overflow-hidden`}
          onClick={() => {
            setwindow("");
            setquickstat(!quickstat);
          }}
        >
          <Image
            src={quick}
            alt="quick"
            className="w-[18px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </button>

        <motion.button
          custom={1}
          initial={{ left: "84px" }}
          animate={controls}
          className={`${
            window === "inbox" ? "bg-indicator-200" : "bg-white"
          }  rounded-full w-[68px] h-[68px] p-3 cursor-pointer overflow-hidden z-[2] relative`}
          onClick={() => {
            if (window && window === "inbox") {
              setwindow("");
            } else {
              setwindow("inbox");
            }
          }}
        >
          <Image
            src={window === "inbox" ? inbox_active : inbox_def}
            alt="inbox"
            className="w-[28px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </motion.button>

        <motion.button
          custom={2}
          initial={{ left: "168px" }}
          animate={controls}
          className={`${
            window === "task" ? "bg-indicator-100" : "bg-white"
          }  rounded-full w-[68px] h-[68px] p-3 cursor-pointer overflow-hidden z-[2] relative`}
          onClick={() => {
            if (window && window === "task") {
              setwindow("");
            } else {
              setwindow("task");
            }
          }}
        >
          <Image
            src={window === "task" ? task_active : task_def}
            alt="task"
            className="w-[28px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </motion.button>
      </div>
    </div>
  );
}

export default Foundation;
