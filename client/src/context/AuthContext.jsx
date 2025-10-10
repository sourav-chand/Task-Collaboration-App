import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loadUser = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/user");
      setUser(res.data);
    } catch (err) {
      console.error("Error loading user:", err);
      // Remove token if invalid
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["x-auth-token"];
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
      loadUser();
    }
  }, [loadUser]);

  const login = useCallback(async (formData) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common["x-auth-token"] = res.data.token;
      await loadUser();
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.errors || "Login failed",
      };
    }
  }, [loadUser]);

  const register = useCallback(async (formData) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common["x-auth-token"] = res.data.token;
      await loadUser();
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.errors || "Registration failed",
      };
    }
  }, [loadUser]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["x-auth-token"];
    setUser(null);
  }, []);

  const value = {
    user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
