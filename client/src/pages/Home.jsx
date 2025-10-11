import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";

const Home = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
          Task Collaboration App
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          A modern project management tool for teams to collaborate, organize
          tasks, and boost productivity.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            to="/login"
            className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-8 py-4 bg-white dark:bg-gray-700 text-indigo-600 dark:text-white font-semibold rounded-lg shadow-md border border-indigo-200 dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-gray-600 transition duration-300"
          >
            Sign Up
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-gray-700">
            <div className="text-indigo-600 dark:text-indigo-400 text-3xl mb-4">
              📋
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              Project Management
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Create and manage multiple projects with ease. Keep all your
              team's work organized in one place.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-gray-700">
            <div className="text-indigo-600 dark:text-indigo-400 text-3xl mb-4">
              ✅
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              Task Tracking
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Track tasks through different stages with our Kanban-style board.
              Move tasks from To Do to Done.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-gray-700">
            <div className="text-indigo-600 dark:text-indigo-400 text-3xl mb-4">
              👥
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              Team Collaboration
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Collaborate with your team in real-time. Assign tasks, share
              updates, and stay connected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
