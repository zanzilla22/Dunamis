import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const EditProfile = () => {
  const { logout } = useAuth(); // Destructure logout from useAuth hook
  const [profile, setProfile] = useState({
    nameFirst: '',
    nameLast: '',
    email: '',
    resume: '',
    description: '',
    transcript: '',
    school: '',
    district: '',
    regionalProgram: ''
  });

  useEffect(() => {
    // Fetch the current student profile information from the API and set it to state
    // This is a placeholder, replace it with your actual fetch request
    fetch('/api/student/profile')
      .then(response => response.json())
      .then(data => setProfile(data))
      .catch(error => console.error('Failed to fetch profile:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the updated profile to your API
    console.log('Submitting profile:', profile);
  };

  return (
    <div className="block !important">
      <div className="min-h-screen flex flex-col items-center pb-12 px-4 bg-zinc-100">
        <form onSubmit={handleSubmit} className="w-full max-w-lg mt-8">
          <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>
          <div className="mb-4">
            <label htmlFor="nameFirst" className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" id="nameFirst" name="nameFirst" value={profile.nameFirst} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="nameLast" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" id="nameLast" name="nameLast" value={profile.nameLast} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          {/* Continue creating form fields for each schema property */}
          {/* For 'email', 'description', etc. */}
          {/* Input fields for profile information */}
          {/* ... */}

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

export default EditProfile;
