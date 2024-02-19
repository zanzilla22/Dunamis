import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css'; // Ensure this points to your actual CSS file

const StickyHeader = ({ navItems }) => {
  const navigate = useNavigate();
  return (
    <header className="sticky-header">
      <img
        src="/dunamis-logo.png"
        alt="Dunamis Logo"
        className="header-logo"
        onClick={() => navigate('/')}
      />
      <nav className="nav-bar">
        {navItems.map((item, index) => (
          <button key={index} onClick={() => navigate(item.path)}>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="profile-icon" onClick={() => navigate('/profile')}>
        <img src="/path-to-profile-icon.png" alt="Profile" />
      </div>
    </header>
  );
};

export default StickyHeader;
