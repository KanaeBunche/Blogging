const mongoose = require('mongoose');

// Define the User schema with only username and password
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate usernames
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
