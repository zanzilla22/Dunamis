import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const EditProfile = () => {
  const { logout } = useAuth();
  const [profile, setProfile] = useState({
    nameFirst: '',
    nameLast: '',
    email: '',
    description: '',
    school: '',
    district: '',
    regionalProgram: ''
    // Note: Initial state for files such as resume and transcript is not included
    // because file inputs cannot be prefilled due to security reasons.
  });

  // State to keep track of existing files (if any)
  const [existingFiles, setExistingFiles] = useState({
    resume: '', // Placeholder for existing resume file name or URL
    transcript: '' // Placeholder for existing transcript file name or URL
  });

  useEffect(() => {
    // Fetch the current student profile information from the API and set it to state
    fetch('/api/student/profile', {
      method: 'GET', // Assuming a GET request to fetch profile data
      headers: {
        // Include necessary headers (e.g., for authentication)
      }
    })
      .then(response => response.json())
      .then(data => {
        setProfile({
          nameFirst: data.nameFirst,
          nameLast: data.nameLast,
          email: data.email,
          description: data.description,
          school: data.school,
          district: data.district,
          regionalProgram: data.regionalProgram,
          // Resume and transcript file handling is done separately
        });
        // Set existing file information if available
        setExistingFiles({
          resume: data.resume, // Assume 'data.resume' holds the file name or URL
          transcript: data.transcript // Assume 'data.transcript' holds the file name or URL
        });
      })
      .catch(error => console.error('Failed to fetch profile:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    // This example doesn't directly deal with file changes as files cannot be prefilled.
    // You might use this event handler to update state if uploading a new file.
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you would handle form submission.
    // This would typically involve creating a FormData object for file uploads,
    // appending each field from the state, and making a POST or PUT request to your API.
    console.log('Profile data to submit:', profile);
    // Note: Actual submission logic to your backend API should be implemented here.
  };

  return (
    <div className="block !important">
      <div className="min-h-screen flex flex-col items-center pb-12 px-4 bg-zinc-100">
        <form onSubmit={handleSubmit} className="w-full max-w-lg mt-8">
          <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

          {/* First Name */}
          <div className="mb-4">
            <label htmlFor="nameFirst" className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" id="nameFirst" name="nameFirst" value={profile.nameFirst} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label htmlFor="nameLast" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" id="nameLast" name="nameLast" value={profile.nameLast} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" value={profile.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" name="description" value={profile.description} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
          </div>

          {/* School */}
          <div className="mb-4">
            <label htmlFor="school" className="block text-sm font-medium text-gray-700">School</label>
            <input type="text" id="school" name="school" value={profile.school} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>

          {/* District */}
          <div className="mb-4">
            <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
            <input type="text" id="district" name="district" value={profile.district} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>

          {/* Regional Program */}
          <div className="mb-4">
            <label htmlFor="regionalProgram" className="block text-sm font-medium text-gray-700">Regional Program</label>
            <input type="text" id="regionalProgram" name="regionalProgram" value={profile.regionalProgram} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>

          {/* Resume - File Upload (Note: Can't prefill due to security reasons) */}
          <div className="mb-4">
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume</label>
            <input type="file" id="resume" name="resume" onChange={handleFileChange} className="mt-1 block w-full" />
            {/* Display link or name for existing resume if available */}
          </div>

          {/* Transcript - File Upload (Note: Can't prefill due to security reasons) */}
          <div className="mb-4">
            <label htmlFor="transcript" className="block text-sm font-medium text-gray-700">Transcript</label>
            <input type="file" id="transcript" name="transcript" onChange={handleFileChange} className="mt-1 block w-full" />
            {/* Display link or name for existing transcript if available */}
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

export default EditProfile;
