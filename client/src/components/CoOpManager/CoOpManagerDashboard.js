import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from '../headers/coopHeader';
import CreateCoop from './CreateCoop'; // Assume this component is created for EC's view
import ListedCoops from './ListedCoops'; // Assume this component is created for Co-ops view
import Messages from './Messages'; // Assume this component is created for Messages view
import EditProfile from './EditProfile'; // Assume this component is created for Edit Profile view

const CoopManagerDashboard = () => {
  let navigate = useNavigate();

  return (
    <div className="block !important">
      <div className="min-h-screen flex flex-col items-center pb-12 px-4 bg-zinc-100">
        <Header navigate={navigate} />

        <Routes>
          <Route path="/" element={<Navigate replace to="create" />} /> {/* Default redirect to create listing */}
          <Route path="create" element={<CreateCoop />} />
          <Route path="listedcoops" element={<ListedCoops />} />
          <Route path="messages" element={<Messages />} />
          <Route path="edit-profile" element={<EditProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default CoopManagerDashboard;
