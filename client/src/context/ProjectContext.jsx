import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const ProjectContext = createContext();

export const useProject = () => {
  return useContext(ProjectContext);
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  const createProject = useCallback(async (projectData) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/projects",
        projectData
      );
      setProjects(prevProjects => [...prevProjects, res.data]);
      return { success: true, project: res.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.errors || "Failed to create project",
      };
    }
  }, []);

  const getProjects = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects");
      setProjects(res.data);
      return { success: true, projects: res.data };
    } catch (err) {
      return { success: false, error: "Failed to fetch projects" };
    }
  }, []);

  const deleteProject = useCallback(async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      setProjects(prevProjects => prevProjects.filter((project) => project._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: "Failed to delete project" };
    }
  }, []);

  const getTasks = useCallback(async (projectId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/tasks/${projectId}/tasks`
      );
      setTasks(res.data);
      return { success: true, tasks: res.data };
    } catch (err) {
      return { success: false, error: "Failed to fetch tasks" };
    }
  }, []);

  const createTask = useCallback(async (projectId, taskData) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/tasks/${projectId}/tasks`,
        taskData
      );
      setTasks(prevTasks => [...prevTasks, res.data]);
      return { success: true, task: res.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.errors || "Failed to create task",
      };
    }
  }, []);

  const updateTask = useCallback(async (taskId, taskData) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        taskData
      );
      setTasks(prevTasks => prevTasks.map((task) => (task._id === taskId ? res.data : task)));
      return { success: true, task: res.data };
    } catch (err) {
      return { success: false, error: "Failed to update task" };
    }
  }, []);

  const deleteTask = useCallback(async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      setTasks(prevTasks => prevTasks.filter((task) => task._id !== taskId));
      return { success: true };
    } catch (err) {
      return { success: false, error: "Failed to delete task" };
    }
  }, []);

  const value = {
    projects,
    currentProject,
    setCurrentProject,
    tasks,
    setTasks,
    createProject,
    getProjects,
    deleteProject,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export default ProjectContext;
