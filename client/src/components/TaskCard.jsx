import React, { useState } from "react";
import { useProject } from "../context/ProjectContext";
import { formatDate, getInitials } from "../utils/helpers";

const TaskCard = ({ task, projectId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || "",
    status: task.status,
    assignedTo: task.assignedTo?._id || "",
  });

  const { updateTask, deleteTask, projects } = useProject();

  // Get project members for assignment
  const currentProject = projects.find((p) => p._id === projectId);
  const projectMembers = currentProject?.members || [];

  const handleUpdate = async () => {
    // Handle empty assignedTo
    const updateData = {
      ...editData,
      assignedTo: editData.assignedTo || undefined,
    };

    const result = await updateTask(task._id, updateData);
    if (result.success) {
      setIsEditing(false);
    } else {
      alert("Failed to update task");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const result = await deleteTask(task._id);
      if (!result.success) {
        alert("Failed to delete task");
      }
    }
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-md transition-shadow dark:shadow-gray-700 dark:hover:shadow-gray-600">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
            className="w-full font-semibold mb-2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <textarea
            name="description"
            value={editData.description}
            onChange={handleChange}
            rows="2"
            className="w-full text-sm text-gray-600 mb-2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          ></textarea>
          <select
            name="status"
            value={editData.status}
            onChange={handleChange}
            className="w-full text-sm mb-2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
              Assign To
            </label>
            <select
              name="assignedTo"
              value={editData.assignedTo}
              onChange={handleChange}
              className="w-full text-sm p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Unassigned</option>
              {projectMembers.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between">
            <h4 className="font-semibold text-gray-800 dark:text-white">
              {task.title}
            </h4>
            <div className="flex space-x-1">
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-indigo-600 dark:text-gray-500 dark:hover:text-indigo-400"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
              </button>
              <button
                onClick={handleDelete}
                className="text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          {task.description && (
            <p className="text-sm text-gray-600 mt-2 dark:text-gray-400">
              {task.description}
            </p>
          )}

          <div className="mt-4 flex items-center justify-between">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              {task.status}
            </span>

            {task.assignedTo && (
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs">
                  {getInitials(task.assignedTo.name)}
                </div>
                <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">
                  {task.assignedTo.name}
                </span>
              </div>
            )}
          </div>

          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            Created {formatDate(task.createdAt)}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
