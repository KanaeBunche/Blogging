import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import './Stories.css';
import StoriesNav from '../components/StoriesNav';

const Stories = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate for navigation
    const { title, description, image } = location.state || {};
    const username = localStorage.getItem('username');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [storiesData, setStoriesData] = useState([]); // Initialize state for fetched stories

    // Fetch stories from the backend based on the logged-in user
    useEffect(() => {
        const fetchUserStories = () => {
            const stories = JSON.parse(localStorage.getItem('stories')) || [];
            setStoriesData(stories);
        };
    
        fetchUserStories();
    }, []);
    

    // Add a new story from the editor if available
    const newStory = title && description ? [{
        id: 0,
        title,
        description,
        image,
        content: location.state.content, // Include content
    }] : [];

    // Combine the new story with fetched stories
    const combinedStories = [...newStory, ...storiesData];

    const handleReadMore = (story) => {
        navigate('/article-detail', { state: story }); // Pass the entire story object
    };

    // Update the filtered articles based on the search term
    useEffect(() => {
        const results = combinedStories.filter(story => 
            story.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredArticles(results);
    }, [searchTerm, combinedStories]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Update search term
    };

    return (
        <div>
            <StoriesNav  
                searchTerm={searchTerm} 
                onSearchChange={handleSearchChange} 
            /> {/* Pass props to StoriesNav */}
            <h1 className="stories-title"> Articles</h1>
            <div className="stories-container">
                {filteredArticles.length > 0 ? (
                    filteredArticles.map((story) => (
                        <article key={story.id} className="card">
                            <div className="card__wrapper">
                                <figure className="card__feature">
                                    <img src={story.image} className="card__img" alt={story.title} />
                                </figure>
                                <div className="card__box">
                                    <header className="card__item card__header">
                                        <h6 className="card__item card__item--small card__label">Featured</h6>
                                        <h2 className="card__item card__item--small card__title">{story.title}</h2>
                                    </header>
                                    <hr className="card__item card__divider" />
                                    <section className="card__item card__body">
                                        <p>{story.description}</p>
                                    </section>
                                    <div className="card__overlay" onClick={() => handleReadMore(story)}>
                                        <p className="card__overlay-text">Click here for full article</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))
                ) : (
                    <p>No stories found</p> // Message when no articles match
                )}
            </div>
        </div>
    );
};

export default Stories;
