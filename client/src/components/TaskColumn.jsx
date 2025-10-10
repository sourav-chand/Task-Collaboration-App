import React from "react";
import TaskCard from "./TaskCard";

const TaskColumn = ({ title, tasks, status, projectId }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return "bg-blue-500";
      case "In Progress":
        return "bg-yellow-500";
      case "Done":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <div
          className={`w-3 h-3 rounded-full ${getStatusColor(status)} mr-2`}
        ></div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <span className="ml-2 bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} projectId={projectId} />
        ))}

        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No tasks</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
