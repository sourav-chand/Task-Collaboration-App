import React from "react";
import { useNavigate } from "react-router-dom";

const AssignedTasks = ({ tasks }) => {
  const navigate = useNavigate();

  if (!tasks || tasks.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4 dark:text-white">
        Tasks Assigned to You
      </h3>
      <div className="bg-white shadow overflow-hidden sm:rounded-md dark:bg-gray-800 dark:shadow-gray-700">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {tasks.map((task) => (
            <li key={task._id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-indigo-600 truncate dark:text-indigo-400">
                    {task.title}
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {task.status}
                    </span>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      Project: {task.project?.name}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                    <button
                      onClick={() => navigate(`/project/${task.project._id}`)}
                      className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      View Task
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AssignedTasks;
