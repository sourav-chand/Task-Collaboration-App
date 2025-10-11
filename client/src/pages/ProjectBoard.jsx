import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProject } from "../context/ProjectContext";
import { useTheme } from "../context/ThemeContext";
import TaskColumn from "../components/TaskColumn";
import CreateTaskModal from "../components/CreateTaskModal";
import ThemeToggle from "../components/ThemeToggle";

const ProjectBoard = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const { user, logout } = useAuth();
  const {
    projects,
    currentProject,
    setCurrentProject,
    tasks,
    getTasks,
    getProjects,
  } = useProject();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      await getProjects(); // To ensure we have the latest project data
      await getTasks(projectId);
    };

    fetchData();
  }, [projectId, getTasks, getProjects]);

  useEffect(() => {
    // Find the actual project from the projects list
    const project = projects.find((p) => p._id === projectId);
    if (project) {
      setCurrentProject(project);
    } else {
      // Fallback to the placeholder if project not found
      setCurrentProject({
        _id: projectId,
        name: `Project ${projectId.substring(0, 8)}`,
      });
    }
  }, [projectId, projects, setCurrentProject]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Group tasks by status
  const tasksByStatus = {
    "To Do": tasks.filter((task) => task.status === "To Do"),
    "In Progress": tasks.filter((task) => task.status === "In Progress"),
    Done: tasks.filter((task) => task.status === "Done"),
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentProject?.name || "Project Board"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Project ID: {projectId}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <span className="text-gray-700 dark:text-gray-300">
              Welcome, {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Task Board
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Add Task
          </button>
        </div>

        {/* {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskColumn
            title="To Do"
            tasks={tasksByStatus["To Do"]}
            status="To Do"
            projectId={projectId}
          />
          <TaskColumn
            title="In Progress"
            tasks={tasksByStatus["In Progress"]}
            status="In Progress"
            projectId={projectId}
          />
          <TaskColumn
            title="Done"
            tasks={tasksByStatus["Done"]}
            status="Done"
            projectId={projectId}
          />
        </div>
      </main>

      {showModal && (
        <CreateTaskModal
          projectId={projectId}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ProjectBoard;
