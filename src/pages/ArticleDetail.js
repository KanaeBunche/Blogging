// ArticleDetail.js
import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access passed data
import './ArticleDetail.css'; // Import your custom styles if needed

const ArticleDetail = () => {
    const location = useLocation(); // Get location object
    const { title, description, image, content } = location.state || {}; // Destructure state

    return (
        <div className="article-detail">
            <h1 className="article-title">{title}</h1>
            <img src={image} alt={title} className="article-image" />
            <p className="article-description">{description}</p>
            <div className="article-content">
                <p>{content}</p>
            </div>
        </div>
    );
};

export default ArticleDetail;
