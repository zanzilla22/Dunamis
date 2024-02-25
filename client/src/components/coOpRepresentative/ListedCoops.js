import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // Adjust the path accordingly

const OpportunityCard = ({ title, location, logoUrl, companyName, applyLink }) => (
  <div className="flex flex-col sm:flex-row justify-between items-center gap-5 py-9 px-8 mt-6 bg-white rounded-xl border border-gray-200 shadow-lg w-full max-w-4xl">
    <div className="flex flex-1"> {/* Add flex-1 to make the left side grow and fill space */}
      <div className="flex justify-center items-center w-full sm:w-auto sm:px-1.5 rounded-xl bg-indigo-800 bg-opacity-50 h-[200px] w-[93px]">
        <img loading="lazy" src={logoUrl} alt={`${title} logo`} className="w-[200px] aspect-[1]" />
      </div>
      <div className="ml-4 flex-grow"> {/* Use ml-4 for margin and flex-grow to fill available space */}
        <div className="flex flex-row items-center gap-2">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/aa9bbbb1cb2bccc0212ed33b225ffa727fa4ec3d79937bddb58898e00e31ecd2?apiKey=4a96eb6e110e4af99e404c504d7d55e7&" alt={`${companyName} logo`} className="w-10 h-10 flex-none" />
          <div className="flex flex-col">
            <div className="text-2xl text-indigo-800">{title}</div>
            <div className="text-lg text-black">{companyName}</div>
          </div>
        </div>
        <div className="flex gap-2 px-5 py-3.5 mt-3.5 text-black rounded-lg bg-neutral-100">
          <img loading="lazy" src="https://static-00.iconduck.com/assets.00/location-position-icon-1640x2048-6jqx3f7e.png" alt="Location icon" className="w-[20px]" />
          <div className="grow">{location}</div>
        </div>
      </div>
    </div>
    <div className="flex sm:justify-end mt-4 sm:mt-0"> {/* Use justify-end to align the button to the right */}
      <a href={applyLink} target="_blank" rel="noopener noreferrer" className="inline-block px-9 py-4 text-white bg-indigo-800 rounded-lg whitespace-nowrap">
        Applications
      </a>
    </div>
  </div>
);

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
