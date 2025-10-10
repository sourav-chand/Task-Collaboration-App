import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loadUser = useCallback(async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/user`
      );
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

  const login = useCallback(
    async (formData) => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
          formData
        );
        localStorage.setItem("token", res.data.token);
        axios.defaults.headers.common["x-auth-token"] = res.data.token;
        await loadUser();
        return { success: true };
      } catch (err) {
        // Handle different types of error responses
        let errorMessage = "Login failed";

        if (err.response?.data?.errors) {
          // Handle validation errors array
          if (Array.isArray(err.response.data.errors)) {
            errorMessage = err.response.data.errors
              .map((e) => e.msg)
              .join(", ");
          } else if (typeof err.response.data.errors === "object") {
            // Handle object with msg property
            errorMessage = err.response.data.errors.msg || errorMessage;
          }
        } else if (err.response?.data?.msg) {
          // Handle single error message
          errorMessage = err.response.data.msg;
        } else if (typeof err.response?.data === "string") {
          // Handle string error message
          errorMessage = err.response.data;
        }

        return {
          success: false,
          error: errorMessage,
        };
      }
    },
    [loadUser]
  );

  const register = useCallback(
    async (formData) => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
          formData
        );
        localStorage.setItem("token", res.data.token);
        axios.defaults.headers.common["x-auth-token"] = res.data.token;
        await loadUser();
        return { success: true };
      } catch (err) {
        // Handle different types of error responses
        let errorMessage = "Registration failed";

        if (err.response?.data?.errors) {
          // Handle validation errors array
          if (Array.isArray(err.response.data.errors)) {
            errorMessage = err.response.data.errors
              .map((e) => e.msg)
              .join(", ");
          } else if (typeof err.response.data.errors === "object") {
            // Handle object with msg property
            errorMessage = err.response.data.errors.msg || errorMessage;
          }
        } else if (err.response?.data?.msg) {
          // Handle single error message
          errorMessage = err.response.data.msg;
        } else if (typeof err.response?.data === "string") {
          // Handle string error message
          errorMessage = err.response.data;
        }

        return {
          success: false,
          error: errorMessage,
        };
      }
    },
    [loadUser]
  );

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
