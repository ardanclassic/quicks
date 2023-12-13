import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";

import caret_up from "@/assets/icons/caret-up-dark.png";
import clock from "@/assets/icons/clock.png";
import pencil from "@/assets/icons/pencil-blue.png";
import dateicon from "@/assets/icons/date-dark.png";
import checked from "@/assets/icons/checked-dark.png";
import unchecked from "@/assets/icons/unchecked-dark.png";
import MenuPopOver from "../popover";

function NewTask({ setNewTask }: any) {
  const [popover, setpopover] = useState<string>("");
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [deadline, setdeadline] = useState();
  const [taskCompleted, setTaskCompleted] = useState<Boolean>(false);

  const CheckBox = () => {
    return (
      <div className="checkbox mt-2">
        {taskCompleted ? (
          <Image src={checked} alt="checked" onClick={() => setTaskCompleted(!taskCompleted)} className="w-[18px]" />
        ) : (
          <Image
            src={unchecked}
            alt="unchecked"
            onClick={() => setTaskCompleted(!taskCompleted)}
            className="w-[18px]"
          />
        )}
      </div>
    );
  };

  const Input_DateTime_Content = () => {
    return (
      <div className="date-row relative right-1 flex gap-4 items-center">
        <Image src={clock} alt="clock" className="w-[20px] h-[20px]" />
        <div className="datebox w-[193px] p-2 flex gap-4 items-center justify-between rounded-md border-[1px] border-[#828282]">
          <div className="date">
            <DatePicker
              selected={deadline}
              placeholderText="Set Date"
              onChange={(date: any) => setdeadline(date)}
              dateFormat="dd/MM/yyyy"
              className="outline-none w-[143px]"
            />
          </div>
          <div className="icon">
            <Image src={dateicon} alt="date" className="w-4" />
          </div>
        </div>
      </div>
    );
  };

  const InputDescription = () => {
    return (
      <div className="description-row flex gap-4 my-3">
        <Image src={pencil} alt="edit" className="w-[15px] h-[15px] cursor-pointer" />
        <div className="text-description">
          <textarea
            name="description"
            id="desc"
            placeholder="No Description"
            value={taskDescription}
            onChange={(e: any) => setTaskDescription(e.target.value)}
            className="border-[1px] border-primary-200 p-2 rounded-md w-[550px] min-h-[80px] max-h-[200px] resize-none"
          ></textarea>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`task-item flex justify-between gap-4 py-3 text-sm text-primary-200`}
    >
      <CheckBox />
      <div className="content flex-1">
        <div className="head flex gap-4">
          <div className={`name flex-1 font-semibold`}>
            <input
              type="text"
              name="tasktitle"
              placeholder="Type Task Title"
              value={taskTitle}
              onChange={(e: any) => setTaskTitle(e.target.value)}
              className="border-[1px] border-primary-200 p-2 rounded-md w-[380px]"
            />
          </div>
          <div className="caret mt-2">
            <Image src={caret_up} alt="up" className="w-6" />
          </div>
        </div>
        <div className={`subcontent my-2`}>
          <Input_DateTime_Content />
          {InputDescription()}
        </div>
      </div>
      <div className="menu mt-2">
        <MenuPopOver
          task={{ id: "new-task" }}
          popover={popover}
          setpopover={setpopover}
          type={"new"}
          setdeleted={setNewTask}
        />
      </div>
    </motion.div>
  );
}

export default NewTask;
