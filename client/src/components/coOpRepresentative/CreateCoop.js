import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const CreateCoop = () => {
  const { currentUser } = useAuth();
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
    setCoopData({ ...coopData, [e.target.name]: e.target.value });
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
          Authorization: `Bearer ${currentUser.token}` // Include the token in the request headers
        }
      });
      const newCoopId = response.data._id;
      // Add logic to update CoOp Manager's availableCoopIds with newCoopId
      console.log('Coop created successfully with ID:', newCoopId);
    } catch (error) {
      console.error('Error creating coop:', error);
    }
  };

  return (
    <div>
      <h2>Create Coop Listing</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={coopData.title} onChange={handleChange} placeholder="Title" required />
        <input type="text" name="location" value={coopData.location} onChange={handleChange} placeholder="Location" required />
        <input type="text" name="logoUrl" value={coopData.logoUrl} onChange={handleChange} placeholder="Logo URL" required />
        <input type="text" name="applyLink" value={coopData.applyLink} onChange={handleChange} placeholder="Application Link" required />
        <input type="text" name="companyName" value={coopData.companyName} onChange={handleChange} placeholder="Company Name" required />
        <input type="text" name="term" value={coopData.term} onChange={handleChange} placeholder="Term/Duration" required />
        <button type="submit">Create Coop</button>
      </form>
    </div>
  );
};

export default CreateCoop;
