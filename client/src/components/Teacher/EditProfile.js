import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProfile_Teacher = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    nameFirst: '',
    nameLast: '',
    description: '',
    school: '',
    district: '',
    shsmProgram: ''
  });
  const [schools, setSchools] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [shsmPrograms, setShsmPrograms] = useState([]);

  useEffect(() => {
    // Fetch profile information
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

    const loadLists = async () => {
      try {
        const schoolsResponse = await fetch('/lists/schools.json');
        const schoolsData = await schoolsResponse.json();
        setSchools(schoolsData.schools);

        const districtsResponse = await fetch('/lists/districts.json');
        const districtsData = await districtsResponse.json();
        setDistricts(districtsData.districts);

        const shsmProgramsResponse = await fetch('/lists/shsmPrograms.json');
        const shsmProgramsData = await shsmProgramsResponse.json();
        setShsmPrograms(shsmProgramsData.shsmPrograms);
      } catch (error) {
        console.error('Failed to load lists:', error);
      }
    };

    fetchProfile();
    loadLists();
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
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
      navigate('/'); // Adjust the redirect path as needed
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


          <div className="mb-4">
            <label htmlFor="school" className="block text-sm font-medium text-gray-700">School</label>
            <select id="school" name="school" value={profile.school || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              {schools.map((school, index) => (
                <option key={index} value={school}>{school}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
            <select id="district" name="district" value={profile.district || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              {districts.map((district, index) => (
                <option key={index} value={district}>{district}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="shsmProgram" className="block text-sm font-medium text-gray-700">SHSM Program</label>
            <select id="shsmProgram" name="shsmProgram" value={profile.shsmProgram || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              {shsmPrograms.map((district, index) => (
                <option value={district}>{district}</option>
              ))}
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

export default EditProfile_Teacher;
