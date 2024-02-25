import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';

// dashboards
import StudentDashboard from './components/Student/StudentDashboard';
import TeacherDashboard from './components/Teacher/TeacherDashboard';
import CoOpManagerDashboard from './components/coOpRepresentative/CoOpManagerDashboard';

// student dashboard elements
import ECs from './components/Student/ECs';
import CoOps from './components/Student/CoOps';
import Messages from './components/Student/Messages';
import EditProfile from './components/Student/EditProfile';

// coop dashboard elements
import CreateCoop from './components/coOpRepresentative/CreateCoop';
import ListedCoops from './components/coOpRepresentative/ListedCoops';
import Messages_Coop from './components/coOpRepresentative/Messages';
import EditProfile_Coop from './components/coOpRepresentative/EditProfile';

//teacher dashboard elements
import SHSMs from './components/Teacher/SHSMs';
import Messages_Teacher from './components/Teacher/Messages';
import EditProfile_Teacher from './components/Teacher/EditProfile';

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
          <Route path="/teacher/*" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <Routes>
                <Route path="/" element={<TeacherDashboard />}>
                  <Route index element={<Navigate replace to="create" />} />
                  <Route path="shsms" element={<SHSMs />} />
                  <Route path="messages" element={<Messages_Teacher />} />
                  <Route path="edit-profile" element={<EditProfile_Teacher />} />
                </Route>
              </Routes>
            </ProtectedRoute>
          } />

          {/* Co-Op Manager Routes */}
          <Route path="/coOpRepresentative/*" element={
            <ProtectedRoute allowedRoles={['coOpRepresentative']}>
              <Routes>
                <Route path="/" element={<CoOpManagerDashboard />}>
                  <Route index element={<Navigate replace to="create" />} />
                  <Route path="create" element={<CreateCoop />} />
                  <Route path="listedcoops" element={<ListedCoops />} />
                  <Route path="messages" element={<Messages_Coop />} />
                  <Route path="edit-profile" element={<EditProfile_Coop />} />
                </Route>
              </Routes>
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
    case 'coOpRepresentative':
      console.log('Redirecting to co-op manager dashboard...');
      return <Navigate to="/coOpRepresentative" replace />;
    default:
      console.log('Role not recognized, redirecting to login...');
      return <Navigate to="/" replace />;
  }
};

export default App;
