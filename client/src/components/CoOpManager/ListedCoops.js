import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListedCoops = () => {
  const [coops, setCoops] = useState([]);

  useEffect(() => {
    const fetchCoops = async () => {
      try {
        const response = await axios.get('/coops/available');
        setCoops(response.data);
      } catch (error) {
        console.error('Error fetching coops:', error);
      }
    };
    fetchCoops();
  }, []);

  return (
    <div>
      <h2>Listed Coops</h2>
      <ul>
        {coops.map((coop) => (
          <li key={coop._id}>
            <h3>{coop.title}</h3>
            <p>{coop.location}</p>
            {/* Display other coop information */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListedCoops;
