import React, { useState } from "react";
import { useProject } from "../context/ProjectContext";

const CreateTaskModal = ({ projectId, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "To Do",
    assignedTo: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { createTask, projects } = useProject();

  const { title, description, status } = formData;

  // Get project members for assignment
  const currentProject = projects.find((p) => p._id === projectId);
  const projectMembers = currentProject?.members || [];

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    if (!title.trim()) {
      setErrors({ title: "Task title is required" });
      setLoading(false);
      return;
    }

    // Prepare task data
    const taskData = {
      title,
      description,
      status,
    };

    // Only include assignedTo if a user is selected
    if (formData.assignedTo) {
      taskData.assignedTo = formData.assignedTo;
    }

    const result = await createTask(projectId, taskData);

    if (result.success) {
      onClose();
    } else {
      setErrors({ general: result.error || "Failed to create task" });
    }

    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Create New Task
          </h3>
        </div>

        <form onSubmit={onSubmit}>
          <div className="px-6 py-4">
            {errors.general && (
              <div className="mb-4 bg-red-50 text-red-500 p-3 rounded dark:bg-red-900 dark:text-red-200">
                {errors.general}
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
              >
                Task Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={onChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400`}
                placeholder="Enter task title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.title}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={onChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder="Enter task description (optional)"
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="assignedTo"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
              >
                Assign To
              </label>
              <select
                id="assignedTo"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Unassigned</option>
                {projectMembers.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name} ({member.email})
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Select a team member to assign this task
              </p>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3 dark:bg-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 dark:bg-indigo-700 dark:hover:bg-indigo-600"
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
