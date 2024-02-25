import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CreateCoop = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [coopData, setCoopData] = useState({
    title: '',
    location: '',
    logoUrl: '',
    applyLink: '',
    companyName: '',
    term: '',
    categories: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categories") {
      // Handle multi-select for categories
      const options = e.target.options;
      const selectedCategories = [];
      for (let i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          selectedCategories.push(options[i].value);
        }
      }
      setCoopData(prevState => ({
        ...prevState,
        [name]: selectedCategories
      }));
    } else {
      setCoopData({ ...coopData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser || !currentUser.token) {
      console.error("No user token available. Please login.");
      return;
    }
    try {
      const response = await axios.post('https://dunamis-api.vercel.app/coops', coopData, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      console.log('Coop created successfully with ID:', response.data._id);
      navigate('/coOpRepresentative/listedcoops');
    } catch (error) {
      console.error('Error creating coop:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Coop Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" value={coopData.title} onChange={handleChange} placeholder="Title" required className="w-full p-2 border border-gray-300 rounded-md" />
        <input type="text" name="location" value={coopData.location} onChange={handleChange} placeholder="Location" required className="w-full p-2 border border-gray-300 rounded-md" />
        <input type="text" name="logoUrl" value={coopData.logoUrl} onChange={handleChange} placeholder="Logo URL" required className="w-full p-2 border border-gray-300 rounded-md" />
        <input type="text" name="applyLink" value={coopData.applyLink} onChange={handleChange} placeholder="Application Link" required className="w-full p-2 border border-gray-300 rounded-md" />
        <input type="text" name="companyName" value={coopData.companyName} onChange={handleChange} placeholder="Company Name" required className="w-full p-2 border border-gray-300 rounded-md" />
        <input type="text" name="term" value={coopData.term} onChange={handleChange} placeholder="Term/Duration" required className="w-full p-2 border border-gray-300 rounded-md" />
        <select multiple name="categories" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" value={coopData.categories}>
          {['Physics', 'Engineering', 'Chemistry', 'Biology', 'Medical', 'Technology', 'Programming', 'Arts', 'Writing', 'Business'].map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <button type="submit" className="w-full sm:w-auto px-8 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors">Create Coop</button>
      </form>
    </div>
  );
};

export default CreateCoop;
