const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // Import authentication routes
const storyRoutes = require('./routes/stories');

// Initialize app and load environment variables
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '100mb' })); // Set limit to 20MB


// Use routes
app.use('/api', authRoutes);
app.use('/api/stories', storyRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
