import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirectPath, setRedirectPath] = useState('/'); // State to hold the redirect path
    const navigate = useNavigate();

    // Function to toggle modal
    const handleModal = () => {
        setShowModal(!showModal);
        setUsername('');
        setPassword('');
    };

    // Toggle between Sign Up and Login
    const toggleAuthMode = () => {
        setIsSignUp(!isSignUp);
    };

    // Connect the backend login/signup
    const handleAuth = async () => {
        if (!username || !password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const url = isSignUp
                ? 'http://localhost:4000/api/register'
                : 'http://localhost:4000/api/login';

            const response = await axios.post(url, { username, password });
            console.log('Response from server:', response.data);

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', username);
                setShowModal(false);
                navigate(redirectPath); // Redirect to the intended path

                if (isSignUp) {
                    console.log('Response from signup:', response.data);
                    alert('Signup successful!');
                } else {
                    console.log('Login successful! Username:', username);
                    alert('Login successful!');
                }
            } else {
                console.error('Authentication failed, no token in response:', response.data);
                
            }
        } catch (error) {
            console.error('Error during authentication:', error.response?.data || error.message);
            alert('Authentication failed. Please try again.');
        }
    };

    // Mock: Check if the user is logged in
    const isLoggedIn = !!localStorage.getItem('token');

    // Conditional navigation based on login state
    const handleLinkClick = (e, path) => {
        e.preventDefault(); // Prevent default link behavior
        if (isLoggedIn) {
            navigate(path); // Navigate if logged in
        } else {
            setRedirectPath(path); // Set the intended path
            setShowModal(true); // Open modal if not logged in
        }
    };

    return (
        <div>
            <nav className="stories-navbar">
                <h1 className="navbar-title">Bloggers</h1>
                <ul className="navbar-list">
                    <li onClick={handleModal}>
                        <span className="navbar-button">Login/Register</span>
                    </li>
                    <li>
                        <Link to="/write" className="navbar-button" onClick={(e) => handleLinkClick(e, '/write')}>
                            <img
                                src="https://img.icons8.com/?size=100&id=11737&format=png&color=ffffff"
                                alt="Write Icon"
                                className="icon"
                            />
                            Write
                        </Link>
                    </li>
                    <li>
                        <Link to="/stories" className="navbar-button" onClick={(e) => handleLinkClick(e, '/stories')}>
                            <img
                                src="https://img.icons8.com/?size=100&id=11732&format=png&color=ffffff"
                                alt="Stories Icon"
                                className="icon"
                            />
                            Stories
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Modal Popup */}
            {showModal && (
                <div className="modal-background">
                    <div className="modal-container">
                        <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
                        <p>{isSignUp ? 'Create an account' : 'Log in to your account'}</p>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="auth-input"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="auth-input"
                        />
                        <button className="auth-btn" onClick={handleAuth}>
                            {isSignUp ? 'Sign Up' : 'Login'}
                        </button>
                        <button className="toggle-btn" onClick={toggleAuthMode}>
                            {isSignUp ? 'Already have an account? Log in' : 'Need an account? Sign up'}
                        </button>
                        <button className="close-btn" onClick={handleModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
