import deleteTask from "@/app/server-actions/deleteTask";
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

type TaskCardProps = {
  title: string;
  description: string;
  status: string;
  id: string;
};

function TasksCard({ title, description, status, id }: TaskCardProps) {
  const styleStatus = {
    notStarted: {
      backgroundColor: "#d1d5db", // bg-gray-300
      color: "#1f2937", // text-gray-800
    },
    onProgress: {
      backgroundColor: "#fde047", // bg-yellow-300
      color: "#854d0e", // text-yellow-800
    },
    complete: {
      backgroundColor: "#34d399", // bg-green-300
      color: "#166534", // text-green-800
    },
  };

  const changeStyle = (status: string): React.CSSProperties | undefined => {
    if (status === "not-started") {
      return styleStatus.notStarted;
    }

    if (status === "on-progress") {
      return styleStatus.onProgress;
    }

    if (status === "complete") {
      return styleStatus.complete;
    }
  };

  return (
    <div className="w-full rounded-md p-2 bg-base-200">
      <div className="flex flex-col space-y-2 px-4">
        <div className="w-full flex justify-between">
          <h1 className="text-2xl tracking-tighter">{title}</h1>
          <p className={`p-2 rounded-md text-xs`} style={changeStyle(status)}>
            {status}
          </p>
        </div>
        <p className="text-md line-clamp-3">{description}</p>
      </div>
      <div className="flex justify-end">
        <form action={deleteTask}>
          <input type="hidden" name="id" value={id} />
          <button className="btn">
            <MdDelete size={18} />
          </button>
        </form>
        <button className="btn">
          <MdEdit size={18} />
        </button>
      </div>
    </div>
  );
}

export default TasksCard;
