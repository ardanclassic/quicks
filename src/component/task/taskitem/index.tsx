import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import moment from "moment";
import DatePicker from "react-datepicker";
import MenuPopOver from "../popover";

import caret_up from "@/assets/icons/caret-up-dark.png";
import caret_down from "@/assets/icons/caret-down-dark.png";
import clock from "@/assets/icons/clock.png";
import pencil from "@/assets/icons/pencil-blue.png";
import dateicon from "@/assets/icons/date-dark.png";
import checked from "@/assets/icons/checked-dark.png";
import unchecked from "@/assets/icons/unchecked-dark.png";
import NewTask from "../newtask";

function TaskItem({ task, setdeleted, setNewTask }: any) {
  const [contentopen, setcontentopen] = useState<boolean>(false);
  const [popover, setpopover] = useState<string>("");
  const [deadline, setdeadline] = useState(new Date());
  const [EditDescription, setEditDescription] = useState<boolean>(false);
  const [taskdata, settaskdata] = useState<any>({
    id: task?.id || "",
    name: task?.name || "",
    description: task?.description || "",
    dateCreated: task?.dateCreated || "",
    deadline: task?.deadline || "",
    type: task?.type || "",
    completed: task?.completed || false,
  });

  useEffect(() => {
    const dde = task?.deadline.split("/").reverse().join("-");
    setdeadline(new Date(dde));
    setcontentopen(!taskdata?.completed);
  }, []);

  const CheckBox = () => {
    return (
      <div className="checkbox">
        {taskdata?.completed ? (
          <Image
            src={checked}
            alt="checked"
            onClick={() =>
              settaskdata({
                ...taskdata,
                completed: !taskdata.completed,
              })
            }
            className="w-[18px]"
          />
        ) : (
          <Image
            src={unchecked}
            alt="unchecked"
            onClick={() =>
              settaskdata({
                ...taskdata,
                completed: !taskdata.completed,
              })
            }
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

        <div className="datebox p-2 flex gap-4 items-center justify-between rounded-md border-[1px] border-[#828282]">
          <div className="date">
            <DatePicker
              selected={deadline}
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
        <Image
          onClick={() => setEditDescription(!EditDescription)}
          src={pencil}
          alt="edit"
          className="w-[15px] h-[15px] cursor-pointer"
        />
        <div className="text-description">
          {EditDescription ? (
            <div className="editmode">
              <textarea
                name="description"
                id="desc"
                value={taskdata?.description}
                onChange={(e: any) =>
                  settaskdata({
                    ...taskdata,
                    description: e.target.value,
                  })
                }
                className="border-[1px] border-primary-200 p-2 rounded-md w-[550px] min-h-[80px] max-h-[200px] resize-none"
              ></textarea>
            </div>
          ) : (
            <div onClick={() => setEditDescription(!EditDescription)} className="readmode">
              {taskdata?.description || "No Description"}
            </div>
          )}
        </div>
      </div>
    );
  };

  const calculateDeadline = () => {
    if (!taskdata?.completed) {
      const count = moment(deadline, "DD/MM/YYYY").diff(moment(), "days");
      if (count > 0) {
        return count + " Days Left";
      } else {
        return "overdue";
      }
    }
  };

  if (task?.newtask) {
    return <NewTask setNewTask={setNewTask} />;
  } else {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        id={taskdata?.id}
        className={`task-item flex justify-between gap-4 py-3 border-b-[1px] border-b-[#828282] text-sm text-primary-200`}
      >
        <CheckBox />
        <div className="content flex-1">
          <div className="head flex gap-4">
            <div
              onClick={() => setcontentopen(!contentopen)}
              className={`name ${taskdata?.completed && "line-through"} flex-1 font-semibold cursor-pointer`}
            >
              {taskdata?.name}
            </div>
            <div className="dayleft text-indicator-300">{calculateDeadline()}</div>
            <div className="date cursor-pointer">{moment(deadline).format("DD/MM/YYYY")}</div>
            <div onClick={() => setcontentopen(!contentopen)} className="caret cursor-pointer">
              {contentopen ? (
                <Image src={caret_up} alt="up" className="w-6" />
              ) : (
                <Image src={caret_down} alt="down" className="w-6" />
              )}
            </div>
          </div>
          <div className={`subcontent my-2 ${contentopen ? "block" : "hidden"}`}>
            <Input_DateTime_Content />
            <InputDescription />
          </div>
        </div>
        <div className="menu">
          <MenuPopOver task={task} popover={popover} setpopover={setpopover} setdeleted={setdeleted} />
        </div>
      </motion.div>
    );
  }
}

export default TaskItem;
