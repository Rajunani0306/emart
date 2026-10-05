import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync auth state to localStorage
  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user, token]);

  // Login handler
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.post("/auth/login", { email, password });
      setUser({
        _id: data._id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        address: data.address,
      });
      setToken(data.token);
      setLoading(false);
      return { success: true, user: data };
    } catch (err) {
      setLoading(false);
      const message = err.response?.data?.message || "Login failed. Please check your credentials.";
      setError(message);
      return { success: false, error: message };
    }
  };

  // Register handler
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.post("/auth/register", userData);
      setUser({
        _id: data._id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        address: data.address,
      });
      setToken(data.token);
      setLoading(false);
      return { success: true, user: data };
    } catch (err) {
      setLoading(false);
      const message = err.response?.data?.message || "Registration failed. Please try again.";
      setError(message);
      return { success: false, error: message };
    }
  };

  // Update profile handler
  const updateProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.put("/auth/profile", profileData);
      setUser({
        _id: data._id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        address: data.address,
      });
      if (data.token) {
        setToken(data.token);
      }
      setLoading(false);
      return { success: true, user: data };
    } catch (err) {
      setLoading(false);
      const message = err.response?.data?.message || "Profile update failed.";
      setError(message);
      return { success: false, error: message };
    }
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        login,
        register,
        updateProfile,
        logout,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
