import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './path/to/AuthContext'; // Adjust the path accordingly

// Assuming OpportunityCard component can be reused or adapted for CoOps
// If not, adjust it to match the CoOp data structure

const CoOpsSection = ({ coOps }) => (
  <div>
    {coOps.length > 0 ? (
      coOps.map((coOp, index) => (
        <OpportunityCard key={index} {...coOp} />
      ))
    ) : (
      <p>No co-ops found</p>
    )}
  </div>
);

const CoOps = () => {
  const { currentUser } = useAuth(); // Use the useAuth hook to access the current user
  const [coOps, setCoOps] = useState([]);

  useEffect(() => {
    const fetchCoOps = async () => {
      if (!currentUser || !currentUser.token) {
        console.error("No user token available. Please login.");
        return;
      }

      try {
        const response = await axios.get('https://dunamis-api.vercel.app/my-coops', {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
        setCoOps(response.data); // Assuming the response data is the list of co-ops
      } catch (error) {
        console.error("Failed to load co-ops:", error);
      }
    };

    fetchCoOps();
  }, [currentUser]); // Depend on currentUser to refetch when it changes

  // Reuse or adapt the SearchBlock component to filter co-ops as needed

  return (
    <div className="block !important">
      <div className="min-h-screen flex flex-col items-center pb-12 px-4 bg-zinc-100">
        {/* Adapt or reuse the SearchBlock component for filtering co-ops */}
        <CoOpsSection coOps={coOps} />
      </div>
    </div>
  );
};

export default CoOps;
