"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loading from "../../loading";

import mockdata from "@/assets/mocks/tasklist.json";
import TaskItem from "../taskitem";

function TaskList({ taskSelected, newTask, setNewTask }: any) {
  const [loading, setLoading] = useState<boolean>(true);
  const [taskList, setTaskList] = useState<any>([]);
  const [deleted, setdeleted] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    /** fetching from local mock data */
    setTimeout(() => {
      const getTaskList: any = mockdata.tasklist;
      if (getTaskList.length > 0) {
        setTaskList(getTaskList);
      }
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    setLoading(true);
    if (taskSelected) {
      setNewTask(false);
      const getTaskList: any = mockdata.tasklist;
      const filteredTask: any = [];
      setTimeout(() => {
        getTaskList.forEach((el: any) => {
          if (el.type === taskSelected) {
            filteredTask.push(el);
          }
        });
        setTaskList(filteredTask);
        setLoading(false);
      }, 500);
    }
  }, [taskSelected]);

  useEffect(() => {
    if (deleted) {
      const newTasklist = taskList.filter((task: any) => task.id !== deleted);
      setTaskList(newTasklist);
      setLoading(false);
    }
  }, [deleted]);

  useEffect(() => {
    if (newTask) {
      setTaskList([
        ...taskList,
        {
          id: "new-task",
          name: "",
          description: "",
          dateCreated: "Set Date",
          deadline: "",
          completed: false,
          newtask: true,
        },
      ]);
    } else {
      const newlist = taskList.filter((task: any) => task.id !== "new-task");
      setTaskList(newlist);
    }
  }, [newTask]);

  const ContentSection = () => {
    if (loading) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="loading-box text-center my-[30%]"
        >
          <Loading loading={loading} setLoading={setLoading} />
          <div className="font-semibold text-primary-200 text-lg">Loading Task List ...</div>
        </motion.div>
      );
    } else {
      if (taskList.length > 0) {
        return taskList.map((task: any, i: any) => {
          return <TaskItem key={i} task={task} deleted={deleted} setdeleted={setdeleted} setNewTask={setNewTask} />;
        });
      } else {
        return (
          <div className="blank relative top-36 my-4 text-center font-semibold text-primary-300">
            no task here ...
          </div>
        );
      }
    }
  };

  return (
    <div className="task-area px-3 overflow-y-auto h-[650px]">
      <ContentSection />
    </div>
  );
}

export default TaskList;
