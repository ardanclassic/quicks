"use client";
import React, { useState } from "react";
import HeaderSection from "./header";
import TaskList from "./tasklist";

function TaskComponent() {
  const [taskSelected, setTaskSelected] = useState<string>("");
  const [newTask, setNewTask] = useState<boolean>(false);

  return (
    <div className="content-box absolute right-6 bottom-[100px] w-[734px] h-[737px] p-4 bg-white rounded-lg text-black">
      <HeaderSection taskSelected={taskSelected} setTaskSelected={setTaskSelected} setNewTask={setNewTask} />
      <TaskList taskSelected={taskSelected} newTask={newTask} setNewTask={setNewTask} />
    </div>
  );
}

export default TaskComponent;
