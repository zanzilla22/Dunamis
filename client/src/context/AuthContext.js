import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  console.log("AuthProvider is loaded");
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [authError, setAuthError] = useState('');

  // Automatically log in the user from local storage (if present)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // Function to log in the user
  const login = async (email, password, role) => {
    try {
      console.log("LOGGINGGGINGGG");
      const response = await axios.post(`https://dunamis-api.vercel.app/${role}/login`, { email, password });
      const { token, role: userRole } = response.data; // Assuming the server responds with a token and the user's role

      const user = { token, role: userRole, email }; // Construct a user object
      setCurrentUser(user);
      console.log("Current User Set:", user);

      setAuthError('');
      localStorage.setItem('user', JSON.stringify(user)); // Persist the user to local storage for session persistence
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'An unexpected error occurred.';
      setAuthError(errorMessage);
    }
  };

  // Function to log out the user
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user'); // Clear the user from local storage on logout
  };

  // Function to register users
  const register = async (userData, role) => {
    try {
      await axios.post(`https://dunamis-api.vercel.app${role}/register`, userData);
      // Optionally log in the user immediately after registration
      await login(userData.email, userData.password, role);
      setAuthError('');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'An unexpected error occurred during registration.';
      setAuthError(errorMessage);
    }
  };

  const value = {
    currentUser,
    authError,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
