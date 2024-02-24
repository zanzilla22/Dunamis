// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Make sure you export useAuth from AuthContext
import LoginPage from './components/LoginPage';
import StudentDashboard from './components/Student/StudentDashboard';
import TeacherDashboard from './components/Teacher/TeacherDashboard';
import CoOpManagerDashboard from './components/CoOpManager/CoOpManagerDashboard';
import { ProtectedRoute } from './components/ProtectedRoute'; // Assume you create this component

const RedirectToDashboard = () => {
  const { currentUser } = useAuth();
  console.log('RedirectToDashboard - currentUser:', currentUser);

  if (!currentUser) {
    console.log('Redirecting to login...');
    return <Navigate to="/" replace />;
  }

  switch(currentUser.role) {
    case 'student':
      console.log('Redirecting to student dashboard...');
      return <Navigate to="/student" replace />;
    case 'teacher':
      console.log('Redirecting to teacher dashboard...');
      return <Navigate to="/teacher" replace />;
    case 'co-op-manager':
      console.log('Redirecting to co-op manager dashboard...');
      return <Navigate to="/co-op-manager" replace />;
    default:
      console.log('Role not recognized, redirecting to login...');
      return <Navigate to="/" replace />;
  }
};


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<RedirectToDashboard />} />
          <Route path="/student" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/teacher" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherDashboard />
            </ProtectedRoute>
          } />
          <Route path="/co-op-manager" element={
            <ProtectedRoute allowedRoles={['co-op-manager']}>
              <CoOpManagerDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
