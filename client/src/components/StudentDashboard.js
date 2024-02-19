import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../dashboard.css'; // Assuming this CSS file will style the components as needed

function StudentDashboard() {
  const navigate = useNavigate();

  // Function to handle quick apply
  const handleQuickApply = (id) => {
    // Add logic for quick apply here
    console.log(`Applying to opportunity with ID: ${id}`);
  }

  // Dummy data for the opportunities list
  const opportunities = [
    {
      id: 1,
      logo: 'halton-district-school-board-logo.png', // Replace with actual path to logo image
      title: 'STEM Research & Personal Project Fund',
      organization: 'Student Senate',
      location: 'Halton',
      applicants: 104,
      postedTime: '3 hours ago'
    },
    {
      id: 1,
      logo: 'halton-district-school-board-logo.png', // Replace with actual path to logo image
      title: 'STEM Research & Personal Project Fund',
      organization: 'Student Senate',
      location: 'Halton',
      applicants: 104,
      postedTime: '3 hours ago'
    },
    {
      id: 1,
      logo: 'halton-district-school-board-logo.png', // Replace with actual path to logo image
      title: 'STEM Research & Personal Project Fund',
      organization: 'Student Senate',
      location: 'Halton',
      applicants: 104,
      postedTime: '3 hours ago'
    },
    {
      id: 1,
      logo: 'halton-district-school-board-logo.png', // Replace with actual path to logo image
      title: 'STEM Research & Personal Project Fund',
      organization: 'Student Senate',
      location: 'Halton',
      applicants: 104,
      postedTime: '3 hours ago'
    },
    {
      id: 1,
      logo: 'halton-district-school-board-logo.png', // Replace with actual path to logo image
      title: 'STEM Research & Personal Project Fund',
      organization: 'Student Senate',
      location: 'Halton',
      applicants: 104,
      postedTime: '3 hours ago'
    },
    {
      id: 1,
      logo: 'halton-district-school-board-logo.png', // Replace with actual path to logo image
      title: 'STEM Research & Personal Project Fund',
      organization: 'Student Senate',
      location: 'Halton',
      applicants: 104,
      postedTime: '3 hours ago'
    },
    {
      id: 1,
      logo: 'halton-district-school-board-logo.png', // Replace with actual path to logo image
      title: 'STEM Research & Personal Project Fund',
      organization: 'Student Senate',
      location: 'Halton',
      applicants: 104,
      postedTime: '3 hours ago'
    },
    {
      id: 1,
      logo: 'halton-district-school-board-logo.png', // Replace with actual path to logo image
      title: 'STEM Research & Personal Project Fund',
      organization: 'Student Senate',
      location: 'Halton',
      applicants: 104,
      postedTime: '3 hours ago'
    },
    {
      id: 1,
      logo: 'halton-district-school-board-logo.png', // Replace with actual path to logo image
      title: 'STEM Research & Personal Project Fund',
      organization: 'Student Senate',
      location: 'Halton',
      applicants: 104,
      postedTime: '3 hours ago'
    },
    {
      id: 1,
      logo: 'halton-district-school-board-logo.png', // Replace with actual path to logo image
      title: 'STEM Research & Personal Project Fund',
      organization: 'Student Senate',
      location: 'Halton',
      applicants: 104,
      postedTime: '3 hours ago'
    },
  ];

  return (
    <div className="App">
      {/* ... other header elements ... */}

      <div className="main-content">
        <div className="dashboard-intro">
          <h1>Accessible and Equitable Opportunities for you :)</h1>
          <p>Presented by 2024-25 Student Trustees and Student Senate</p>
        </div>

        <div className="opportunities-search">
          {/* Search bar and filter elements */}
        </div>

        <div className="opportunities-list">
          {opportunities.map((opportunity) => (
            <div key={opportunity.id} className="opportunity-item">
              <img
                src={opportunity.logo}
                alt={`${opportunity.organization} logo`}
                className="opportunity-logo"
              />
              <div className="opportunity-details">
                <h2 className="opportunity-title">{opportunity.title}</h2>
                <p className="opportunity-organization">{opportunity.organization}</p>
                <span className="opportunity-location">{opportunity.location}</span>
                <span className="opportunity-applicants">{opportunity.applicants} applicants</span>
                <span className="opportunity-posted-time">{opportunity.postedTime}</span>
                <button
                  className="quick-apply-button"
                  onClick={() => handleQuickApply(opportunity.id)}
                >
                  Quick Apply
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="load-more-button">load more...</button>
      </div>
    </div>
  );
}

export default StudentDashboard;
