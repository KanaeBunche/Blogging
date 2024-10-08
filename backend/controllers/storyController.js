const User = require('../models/User');
const Story = require('../models/Story');

// Function to add a story
exports.addStory = async (req, res) => {
    const { title, content, userId } = req.body;

    try {
        // Create a new story
        const newStory = await Story.create({
            title,
            content,
            user: userId,
        });

        // Update the user to add the new story's ID to their stories array
        await User.findByIdAndUpdate(userId, { $push: { stories: newStory._id } });

        return res.status(201).json({ message: 'Story added successfully!', story: newStory });
    } catch (error) {
        console.error('Error adding story:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Function to retrieve all stories
exports.getAllStories = async (req, res) => {
    try {
        const stories = await Story.find().populate('user', 'name'); // Populate user details if needed
        return res.status(200).json(stories);
    } catch (error) {
        console.error('Error fetching stories:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
