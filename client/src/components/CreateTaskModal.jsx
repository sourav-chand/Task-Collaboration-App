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

  const { createTask } = useProject();

  const { title, description, status } = formData;

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

    const result = await createTask(projectId, {
      ...formData,
      assignedTo: formData.assignedTo || undefined,
    });

    if (result.success) {
      onClose();
    } else {
      setErrors({ general: result.error || "Failed to create task" });
    }

    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-20 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">Create New Task</h3>
        </div>

        <form onSubmit={onSubmit}>
          <div className="px-6 py-4">
            {errors.general && (
              <div className="mb-4 bg-red-50 text-red-500 p-3 rounded">
                {errors.general}
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                }`}
                placeholder="Enter task title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={onChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter task description (optional)"
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="assignedTo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Assign To
              </label>
              <input
                type="text"
                id="assignedTo"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="User ID (optional)"
              />
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
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
