import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from '../headers/teacherHeader';
import SHSMs from './SHSMs';
import Messages_Teacher from './Messages';
import EditProfile_Teacher from './EditProfile';

const StudentDashboard = () => {
  let navigate = useNavigate();

  return (
    <div className="block !important">
      <div className="min-h-screen flex flex-col items-center pb-12 px-4 bg-zinc-100">
        <Header navigate={navigate} />
        <Routes>
          <Route path="/" element={<Navigate replace to="shsms" />} /> {/* Default redirect to ECs */}
          <Route path="shsms" element={<SHSMs />} />
          <Route path="messages" element={<Messages_Teacher />} />
          <Route path="edit-profile" element={<EditProfile_Teacher />} />
        </Routes>
      </div>
    </div>
  );
};

export default StudentDashboard;
