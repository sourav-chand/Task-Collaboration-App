import React from "react";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";
import { formatDate } from "../utils/helpers";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const { deleteProject } = useProject();

  const handleViewProject = () => {
    navigate(`/project/${project._id}`);
  };

  const handleDeleteProject = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const result = await deleteProject(project._id);
      if (!result.success) {
        alert("Failed to delete project");
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:shadow-gray-700 dark:hover:shadow-gray-600">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {project.name}
          </h3>
          <button
            onClick={handleDeleteProject}
            className="text-gray-400 hover:text-red-500 transition-colors dark:text-gray-500 dark:hover:text-red-400"
          >
            <svg
              className="w-5 h-5"
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

        {project.description && (
          <p className="mt-2 text-gray-600 text-sm dark:text-gray-400">
            {project.description}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Created {formatDate(project.createdAt)}
          </span>
          <button
            onClick={handleViewProject}
            className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-md hover:bg-indigo-200 transition dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-800"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
