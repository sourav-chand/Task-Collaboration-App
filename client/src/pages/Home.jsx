import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Task Collaboration App
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
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
            className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg shadow-md border border-indigo-200 hover:bg-indigo-50 transition duration-300"
          >
            Sign Up
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-indigo-600 text-3xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2">Project Management</h3>
            <p className="text-gray-600">
              Create and manage multiple projects with ease. Keep all your
              team's work organized in one place.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-indigo-600 text-3xl mb-4">✅</div>
            <h3 className="text-xl font-semibold mb-2">Task Tracking</h3>
            <p className="text-gray-600">
              Track tasks through different stages with our Kanban-style board.
              Move tasks from To Do to Done.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-indigo-600 text-3xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
            <p className="text-gray-600">
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
