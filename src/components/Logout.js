import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Logout.css'; // Import CSS for styling

const Logout = ({ setUser }) => { // Accept setUser as a prop if you're managing user state in a parent component
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem('token'); // Clear the authentication token
        // Optionally, clear any other user-related data here
        localStorage.removeItem('userData'); // Example: clear user data

        // Optionally reset any global or local state (if using context or Redux)
        if (setUser) {
            setUser(null); // Reset user state if applicable
        }

        // Redirect to the homepage or login page
        navigate('/'); // Change this to your desired redirect path
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Logout
        </button>
    );
};

export default Logout;
