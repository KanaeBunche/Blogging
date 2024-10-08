// controllers/authController.js
const User = require('../models/User'); // Import User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register function
const register = async (req, res) => {
    const { username, password } = req.body;

    // Log the incoming request data
    console.log('Received data:', req.body);

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const login = async (req, res) => {
    const { username, password } = req.body;

    console.log('Login request data:', req.body);

    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            console.log('Invalid credentials');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Generated token:', token); // Log the generated token

        res.status(200).json({ token }); // Ensure this line is executed
    } catch (error) {
        console.log('Login error:', error.message);
        res.status(500).json({ error: error.message });
    }
};


module.exports = { register, login };
