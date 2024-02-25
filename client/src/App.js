import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import StudentDashboard from './components/Student/StudentDashboard';
import TeacherDashboard from './components/Teacher/TeacherDashboard';
import CoOpManagerDashboard from './components/CoOpManager/CoOpManagerDashboard';
import ECs from './components/Student/ECs'; // Assuming this component exists
import CoOps from './components/Student/CoOps'; // Assuming this component exists
import Messages from './components/Student/Messages'; // Assuming this component exists
import EditProfile from './components/Student/EditProfile'; // Assuming this component exists
import { ProtectedRoute } from './components/ProtectedRoute'; // Assuming this component exists

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          {/* Student Routes */}
          <Route path="/student/*" element={
            <ProtectedRoute allowedRoles={['student']}>
              <Routes>
                <Route path="/" element={<StudentDashboard />}>
                  <Route index element={<Navigate replace to="ecs" />} />
                  <Route path="ecs" element={<ECs />} />
                  <Route path="coops" element={<CoOps />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="edit-profile" element={<EditProfile />} />
                </Route>
              </Routes>
            </ProtectedRoute>
          } />

          {/* Teacher Routes */}
          <Route path="/teacher" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherDashboard />
            </ProtectedRoute>
          } />

          {/* Co-Op Manager Routes */}
          <Route path="/co-op-manager" element={
            <ProtectedRoute allowedRoles={['co-op-manager']}>
              <CoOpManagerDashboard />
            </ProtectedRoute>
          } />

          {/* Redirect based on user role */}
          <Route path="/dashboard" element={<RedirectToDashboard />} />

        </Routes>
      </AuthProvider>
    </Router>
  );
}

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

export default App;
