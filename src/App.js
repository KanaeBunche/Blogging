// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Write from './pages/Write';
import Stories from './pages/Stories';
import LandingPage from './pages/LandingPage';
import ArticleDetail from './pages/ArticleDetail';

const App = () => {
    return (
        <Router>
            {/* LandingPage should be part of the routes to ensure correct display */}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/write" element={<Write />} />
                <Route path="/stories" element={<Stories />} />
                <Route path="/article-detail" element={<ArticleDetail />} /> 
            </Routes>
        </Router>
    );
};

export default App;
