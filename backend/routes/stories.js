const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const User = require('../models/User');

// Route to create a new story
router.post('/create', async (req, res) => {
    const { title, content, userId } = req.body;

    try {
        // Find the user who is writing the story
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new story
        const newStory = new Story({
            title,
            content,
            user: userId // Link the story to the user
        });

        const savedStory = await newStory.save();

        // Push the story to the user's stories array
        user.stories.push(savedStory._id);
        await user.save();

        res.status(201).json({ message: 'Story created successfully', story: savedStory });
    } catch (error) {
        res.status(500).json({ message: 'Error creating story', error });
    }
});

// Route to get all stories by a user
router.get('/user/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('stories');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ stories: user.stories });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stories', error });
    }
});

module.exports = router;
