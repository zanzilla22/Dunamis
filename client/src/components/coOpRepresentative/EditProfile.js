import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const EditProfile_Coop = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    nameFirst: '',
    nameLast: '',
    description: '',
    company: '',
    role: '',
    targetSHSMs: [],
    targetCourses: []
  });

  useEffect(() => {
  const fetchProfile = async () => {
    if (currentUser?.token) {
      try {
        const response = await axios.get('https://dunamis-api.vercel.app/profile', {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    }
  };

  fetchProfile();
}, [currentUser]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "select-multiple") {
      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
      setProfile(prevProfile => ({
        ...prevProfile,
        [name]: selectedOptions
      }));
    } else {
      setProfile(prevProfile => ({
        ...prevProfile,
        [name]: value
      }));
    }
  };


  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!currentUser || !currentUser.token) {
    console.error("No user token available. Please login.");
    return;
  }
  try {
    await axios.put('https://dunamis-api.vercel.app/profile', profile, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('Profile updated successfully');
    navigate('/'); // Redirect after successful update
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};



  return (
    <div className="block !important">
      <div className="min-h-screen flex flex-col items-center pb-12 px-4 bg-zinc-100">
        <form onSubmit={handleSubmit} className="w-full max-w-lg mt-8">
          <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

          {/* First Name */}
          <div className="mb-4">
            <label htmlFor="nameFirst" className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" id="nameFirst" name="nameFirst" value={profile.nameFirst || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label htmlFor="nameLast" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" id="nameLast" name="nameLast" value={profile.nameLast || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>

          {/* Email, I want this to be displayed but not editable */}

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" name="description" value={profile.description || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
          </div>

          {/* Company */}
          <div className="mb-4">
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
            <input type="text" id="company" name="company" value={profile.company || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label htmlFor="district" className="block text-sm font-medium text-gray-700">Role</label>
            <input type="text" id="role" name="role" value={profile.role || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>


          {/* Multi-select for target SHSMs */}
          <div className="mb-4">
            <label htmlFor="targetSHSMs" className="block text-sm font-medium text-gray-700">Target SHSMs</label>
            <select multiple id="targetSHSMs" name="targetSHSMs" value={profile.targetSHSMs || []} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              {/* Example options - adjust as necessary */}
              <option value="Health and Wellness">Health and Wellness</option>
              <option value="Engineering">Engineering</option>
              <option value="Business">Business</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Multi-select for target Courses */}
          <div className="mb-4">
            <label htmlFor="targetCourses" className="block text-sm font-medium text-gray-700">Target Courses</label>
            <select multiple id="targetCourses" name="targetCourses" value={profile.targetCourses || []} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              {/* Example options - adjust as necessary */}
              <option value="Computer Science">Computer Science</option>
              <option value="Advanced Functions">Advanced Functions</option>
              <option value="Biology">Biology</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <button type="submit" className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save Changes
          </button>
          <button type="button" onClick={logout} className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile_Coop;
