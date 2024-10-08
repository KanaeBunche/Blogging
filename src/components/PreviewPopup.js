// PreviewPopup.js
import React, { useState } from 'react';
import './PreviewPopup.css'; // Import the CSS file for styling

const PreviewPopup = ({ onClose, onSubmit }) => { // Add onSubmit prop
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ title, description, image }); // Log the data
        onSubmit({ title, description, image: imagePreview }); // Pass data back to Write component
        onClose(); // Close the popup after submission
    };

    return (
        <div className="preview-popup-overlay">
            <div className="preview-popup">
                <h1>Preview Your Article</h1>
                <form id="previewForm" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="preview-input"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="preview-input"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="image">Upload Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="preview-input"
                        />
                    </div>
                    {imagePreview && (
                        <div className="image-preview">
                            <h3>Image Preview:</h3>
                            <img src={imagePreview} alt="Preview" />
                        </div>
                    )}
                    <button type="submit" className="preview-button">Submit</button>
                    <button type="button" onClick={onClose} className="preview-button">Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default PreviewPopup;
