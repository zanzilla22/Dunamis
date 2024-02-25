import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';



const SearchBlock = ({ onSearch, onSelectCity, onSelectCategory  }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full px-4 py-5 bg-white rounded-xl border border-gray-200 shadow-lg">
      <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 mb-4" />
      <div className="flex flex-col sm:flex-row w-full mb-4">
        <div className="flex-grow mb-4 sm:mb-0 sm:mr-4">
          <CitySelector onSelect={onSelectCity} />
        </div>
        <div className="flex-grow">
          <CategorySelector onSelect={onSelectCategory} />
        </div>
      </div>
      <button type="submit" className="w-full sm:w-auto px-8 py-2 text-white bg-indigo-800 rounded-lg">Show results</button>
    </form>
  );
};

const CategorySelector = ({ onSelect }) => {
  const categories = [
    'All',
    'Summer',
    'Internship',
    'Olympiad',
    'Competition',
    'Volunteering',
    'Physics',
    'Engineering',
    'Chemistry',
    'Biology',
    'Medical',
    'Technology',
    'Programming',
    'Arts',
    'Writing',
    'Speaking',
    'Business',
    'Language',
    'History'
    // Add more categories as needed
  ];

  const handleChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);

    // Check if 'All' is selected with other options, and correct the selection
    const allIndex = selectedOptions.indexOf('All');
    if (allIndex !== -1 && selectedOptions.length > 1) {
      // If 'All' and other options are selected, remove 'All' from the array
      selectedOptions.splice(allIndex, 1);
      event.target.options[0].selected = false; // Unselect the 'All' option in the dropdown
    }

    onSelect(selectedOptions);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="category-selector" className="mb-2 text-sm font-medium text-gray-700">Select category:</label>
      <select multiple id="category-selector" onChange={handleChange} className="w-full p-2 mt-2 border border-gray-300 rounded-md text-gray-800 bg-white">
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
};


const CitySelector = ({ onSelect }) => {
  const cities = [
    'All',
    'Oakville',
    'Burlington',
    'Milton',
    'Halton',
    'Outside HDSB',
    'Online'
  ];

  const handleChange = (event) => {
    // If 'All' is selected, clear other selections, or if other options are selected, remove 'All' from the selection.
    const values = Array.from(event.target.selectedOptions, option => option.value);
    if (values.includes('All')) {
      // If 'All' is in the array and it's not the only element, remove other selections.
      if (values.length > 1) {
        onSelect(['All']);
        event.target.value = 'All'; // Reset the select element to show 'All' as the only selected option.
      } else {
        onSelect(values);
      }
    } else {
      onSelect(values);
    }
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="city-selector" className="mb-2 text-sm font-medium text-gray-700">Select city:</label>
      <select multiple id="city-selector" onChange={handleChange} className="w-full p-2 mt-2 border border-gray-300 rounded-md text-gray-800 bg-white">
        {cities.map((city, index) => (
          <option key={index} value={city}>{city}</option>
        ))}
      </select>
    </div>
  );
};


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
        Quick Apply
      </a>
    </div>
  </div>
);


const OpportunitiesSection = ({ opportunities }) => (
  <div>
    {opportunities.length > 0 ? (
      opportunities.map((opportunity, index) => (
        <OpportunityCard key={index} {...opportunity} />
      ))
    ) : (
      <p>No opportunities found</p>
    )}
  </div>
);

const ECs = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [displayedOpportunities, setDisplayedOpportunities] = useState([]); // Displayed opportunities
  const [visibleCount, setVisibleCount] = useState(10); // Number of opportunities currently visible

  useEffect(() => {
     fetch('https://dunamis-api.vercel.app/opportunities')
       .then(response => response.json())
       .then(data => {
         setOpportunities(data);
         setDisplayedOpportunities(data.slice(0, visibleCount)); // Load initial opportunities
       })
       .catch(error => console.error("Failed to load opportunities:", error));
   }, [visibleCount]); // Re-run effect if visibleCount changes

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setDisplayedOpportunities(opportunities.slice(0, visibleCount)); // Show initial opportunities on empty search
    } else {
      const fuse = new Fuse(opportunities, {
        keys: ['title', 'companyName', 'location', 'categories'],
        includeScore: true,
        threshold: 0.4
      });
      const results = fuse.search(searchTerm).map(result => result.item);
      setDisplayedOpportunities(results.slice(0, visibleCount)); // Update displayed opportunities based on search
    }
  };
  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 10); // Increase visible count by 10
  };
  const filteredOpportunities = displayedOpportunities.filter(opportunity =>
    (selectedCities.length === 0 || selectedCities.includes('All') || selectedCities.includes(opportunity.location)) &&
    (selectedCategories.length === 0 || selectedCategories.includes('All') || selectedCategories.some(cat => opportunity.categories.includes(cat)))
  );

  return (
      <div className="block !important">
        <div className="min-h-screen flex flex-col items-center pb-12 px-4 bg-zinc-100">
          <SearchBlock onSearch={handleSearch} onSelectCity={setSelectedCities} onSelectCategory={setSelectedCategories} />
          <OpportunitiesSection opportunities={filteredOpportunities} />
          {visibleCount < opportunities.length && (
            <button onClick={handleLoadMore} className="mt-4 px-6 py-2 text-white bg-indigo-800 rounded-lg">
              Load more
            </button>
          )}
        </div>
      </div>
    );

};

export default ECs;
