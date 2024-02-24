import React from 'react';
import useScrollDirection from './useScrollDirection'; // Adjust the import path as needed

const Header = () => {
  const scrollDirection = useScrollDirection();
  return (
    <div className={`sticky top-0 z-50 flex flex-col items-center justify-between self-stretch px-10 py-5 bg-white rounded-3xl border border-gray-100 shadow-sm ${scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'} transition-transform duration-300 ease-in-out`}>
      {/* Logo on the left only for desktop */}
      <div className="w-full flex justify-between sm:items-center">
        <img src="/dunamis-logo.png" alt="Dunamis Logo" className="w-32 h-32 sm:w-48 sm:h-48 object-contain" />
        <img src="/profile-icon.png" alt="Profile" className="hidden sm:block w-12 h-12 object-cover rounded-full border-2 border-blue-500 mr-4" />
      </div>
      {/* Centered Header Text */}
      <h1 className="text-2xl sm:text-4xl font-bold text-black my-4 text-center">Accessible and Equitable Opportunities for you</h1>
      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto">ECs</button>
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto">Co-ops</button>
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto">Messages</button>
      </div>
      {/* Profile Icon for mobile */}
      <img src="/profile-icon.png" alt="Profile" className="sm:hidden w-12 h-12 object-cover rounded-full border-2 border-blue-500" />
    </div>
  );
};
export default Header;
