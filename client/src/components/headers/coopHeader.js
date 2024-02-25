import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useScrollDirection from './useScrollDirection';

const Header = () => {
  const scrollDirection = useScrollDirection();
  const location = useLocation();
  const navigate = useNavigate();

  // Function to determine if a path is the active route
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className={`sticky top-0 z-50 flex flex-col items-center justify-between self-stretch px-10 py-5 bg-white rounded-3xl border border-gray-100 shadow-sm ${scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'} transition-transform duration-300 ease-in-out`}>
      <div className="w-full flex justify-between sm:items-center">
        <img src="/dunamis-logo.png" alt="Dunamis Logo" className="w-32 h-32 sm:w-48 sm:h-48 object-contain" />
        <img onClick={() => navigate("/coOpRepresentative/edit-profile")} src="/pfp.png" alt="Profile" className={`hidden sm:block w-12 h-12 object-cover rounded-full border-2 ${isActive('/student/edit-profile') ? 'border-orange-500' : 'border-gray-300'} mr-4`} />
      </div>
      <h1 className="text-2xl sm:text-4xl font-bold text-black my-4 text-center">Find the Best Students with the Best Fit!</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <button onClick={() => navigate("/coOpRepresentative/create")} className={`text-white font-bold py-2 px-4 rounded-lg transition-colors w-full sm:w-auto ${isActive('/student/ecs') ? 'bg-orange-500 hover:bg-orange-700' : 'bg-blue-500 hover:bg-blue-700'}`}>Create</button>
        <button onClick={() => navigate("/coOpRepresentative/listedcoops")} className={`text-white font-bold py-2 px-4 rounded-lg transition-colors w-full sm:w-auto ${isActive('/student/coops') ? 'bg-orange-500 hover:bg-orange-700' : 'bg-blue-500 hover:bg-blue-700'}`}>Listed Co-ops</button>
        <button onClick={() => navigate("/coOpRepresentative/messages")} className={`text-white font-bold py-2 px-4 rounded-lg transition-colors w-full sm:w-auto ${isActive('/student/messages') ? 'bg-orange-500 hover:bg-orange-700' : 'bg-blue-500 hover:bg-blue-700'}`}>Messages</button>
      </div>
      <img  onClick={() => navigate("/coOpRepresentative/edit-profile")} src="/pfp.png" alt="Profile" className={`sm:hidden sm:block w-12 h-12 object-cover rounded-full border-2 ${isActive('/student/edit-profile') ? 'border-orange-500' : 'border-gray-300'} mr-4`} />
    </div>
  );
};

export default Header;
