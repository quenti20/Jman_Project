const mongoose = require('mongoose');

const validUserTypes = ['Admin', 'Intern', 'Employee'];

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 254,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50
    },
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100
    },
    userType: {
        type: String,
        enum: validUserTypes, // Restrict to specified values
        required: true
    },
    hasChanged: {
        type: Boolean
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
