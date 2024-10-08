import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './StoriesNav.css'; // CSS file for the navbar
import LogoutButton from '../components/Logout'; // Adjust the path as needed

const StoriesNav = ({ searchTerm, onSearchChange }) => {
    // Retrieve the username from localStorage
    const username = localStorage.getItem('username');

    return (
        <div className="stories-navbar">
            <div className="navbar-left">
                <h1 className="navbar-title">Bloggers</h1>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="navbar-search" 
                    value={searchTerm} 
                    onChange={onSearchChange} // Call the function on change
                />
            </div>
            <div className="navbar-right">
                <Link to="/write" className="navbar-write-btn">Write</Link>
                <div className="navbar-user-placeholder">{username || 'User'}</div>
                <LogoutButton />
            </div>
        </div>
    );
};

export default StoriesNav;
