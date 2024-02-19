import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useAuth();

  if (!currentUser || !allowedRoles.includes(currentUser.role)) {
    // User not logged in or role not allowed
    return <Navigate to="/" replace />;
  }

  // User is logged in and has an appropriate role
  return children;
};
