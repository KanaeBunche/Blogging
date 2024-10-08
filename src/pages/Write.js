import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { EditorState } from 'draft-js'; // Import EditorState from draft-js
import { Editor } from 'react-draft-wysiwyg'; // Import the editor you want to use
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'; // Import editor styles
import './Write.css'; // Import your custom styles
import PreviewPopup from '../components/PreviewPopup'; // Import the popup component
import LogoutButton from '../components/Logout';

const Write = () => {
    const [content, setContent] = useState(EditorState.createEmpty()); // Initialize editor state
    const [showPopup, setShowPopup] = useState(false);
    const username = localStorage.getItem('username');
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    const handlePublish = () => {
        setShowPopup(true); // Show the popup when publish is clicked
    };

    const handlePopupSubmit = (data) => {
        const articleData = {
            content: content.getCurrentContent().getPlainText(),
            title: data.title,
            description: data.description,
            image: data.image,
            createdBy: username,
        };
    
        // Retrieve existing stories from local storage
        const existingStories = JSON.parse(localStorage.getItem('stories')) || [];
        
        // Add the new story
        existingStories.push(articleData);
        
        // Save the updated stories back to local storage
        localStorage.setItem('stories', JSON.stringify(existingStories));
    
        console.log('Story saved successfully');
        navigate('/stories'); // Redirect to stories page after submission
    };
    
    


    return (
        <div className="write-page">
            <video className="background-video" autoPlay loop muted>
                <source src="./video/writervideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="header">
                <div/>
                <div className="username-display" style={{ fontFamily: 'Times New Roman' }}>
                    {username}
                </div>
                <h1 className="bloggers-logo">Bloggers</h1>
                <div className="header-spacer" />
                <div className="write-title">
                    <h2>Write</h2>
                    <h3>for your future</h3>
                </div>
            </div>

            <hr className="horizontal-line" />
            
            <button onClick={handlePublish} className='button'>Publish</button>
            <LogoutButton />
            
            <div className="vertical-line" />
            
            <div className="editor-container">
                <Editor
                    editorState={content}
                    onEditorStateChange={setContent}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    placeholder="Type your article here..."
                />
            </div>

            {showPopup && (
                <PreviewPopup 
                    onClose={() => setShowPopup(false)} // Close function
                    onSubmit={handlePopupSubmit} // Pass the submit handler
                />
            )}
        </div>
    );
};

export default Write;
