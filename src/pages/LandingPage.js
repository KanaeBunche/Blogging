// src/components/LandingPage.js
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import './LandingPage.css'; // Importing CSS for styling
import Navbar from '../components/Navbar'

const LandingPage = () => {
    const [displayedText, setDisplayedText] = useState('');
    const fullText = 'Ignite Your'; // The text to type
    const staticText = ' Passion'; // The static text to display
    const typingSpeed = 100; // Speed of typing in milliseconds

    useEffect(() => {
        let index = 0;

        const typingInterval = setInterval(() => {
            if (index < fullText.length) {
                setDisplayedText((prev) => prev + fullText.charAt(index));
                index++;
            } else {
                clearInterval(typingInterval);
            }
        }, typingSpeed);

        return () => clearInterval(typingInterval); // Cleanup the interval on component unmount
    }, [fullText]);

    return (
        <div>
            
        <Box className="landing-container">
        <Navbar/>
            <video autoPlay loop muted className="background-video">
                <source src={require('../video/homevideo3.mp4')} type="video/mp4" />
                Your browser does not support HTML5 video.
            </video>
            <Box className="content">
                <h1 className="main-title">
                    {displayedText} <span className="static-text">{staticText}</span>
                </h1>
                <p className="sub-title">Join us as we share insights, experiences, and creativity, fostering a community of dreamers and doers. Let's embark on this adventure together!</p>
            </Box>
        </Box>
        </div>
    );
};

export default LandingPage;
