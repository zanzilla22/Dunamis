import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from '../headers/studentHeader';
import ECs from './ECs'; // Assume this component is created for EC's view
import CoOps from './CoOps'; // Assume this component is created for Co-ops view
import Messages from './Messages'; // Assume this component is created for Messages view
import EditProfile from './EditProfile'; // Assume this component is created for Edit Profile view

const StudentDashboard = () => {
  let navigate = useNavigate();

  return (
    <div className="block !important">
      <div className="min-h-screen flex flex-col items-center pb-12 px-4 bg-zinc-100">
        <Header navigate={navigate} />
        {/* Define sub-routes within StudentDashboard */}
        <Routes>
          <Route path="/" element={<Navigate replace to="ecs" />} /> {/* Default redirect to ECs */}
          <Route path="ecs" element={<ECs />} />
          <Route path="coops" element={<CoOps />} />
          <Route path="messages" element={<Messages />} />
          <Route path="edit-profile" element={<EditProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default StudentDashboard;
