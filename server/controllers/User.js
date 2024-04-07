const User = require('../models/User')
const nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken');


exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare plaintext password with stored password
        if (password !== user.password) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, userType: user.userType},
            'qwe2131', // Use your actual secret key
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        return res.status(200).json({ message: 'Login successful', token, userType: user.userType,hasChanged:user.hasChanged });
    } catch (error) {
        res.status(500).send(error.message);
    }
};



exports.createNewUser = async (req, res) => {
    try {
        const { email, name, userType } = req.body;
        const defaultPassword = generateRandomCode(); // Default password
        console.log({ email, name, userType })
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists!' });
        }

        // Create a new user
        const newUser = new User({
            email,
            password: defaultPassword, // Set default password
            name,
            userType,
            hasChanged: false
        });

        await newUser.save();

        // Send email to the user
        sendEmail(email, defaultPassword);

        return res.status(200).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Function to send email
function sendEmail(email, password) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'avikpat@gmail.com',
            pass: 'kdje ivnv lnnj iczq' 
        }
    });
    change_password = "http://localhost:3000/login" 
    const mailOptions = {
        from: 'avikpat@gmail.com',
        to: email,
        subject: 'Welcome to Our Website! ',
        text: `Welcome! Your account has been created with the default password: ${password}. 
               Please login to our website and change your password. ${change_password} `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

function generateRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }
    return code;
}

exports.changePassword = async (req, res) => {
    try {
        // Find the user by ID
        //console.log(req.user) ;
        const user = await User.findById(req.user.userId);
        
        //const { userId } = req.params.id;
        const { password } = req.body;
        console.log(req.body) ;
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the password with the new password
        user.password = password;
        user.hasChanged = true;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserData = async (req, res) => {
    // console.log("request send to backend",req.user.userId)
    try {
// console.log("entering try getuserdata",)
        const user = await User.findById(req.user.userId);
        console.log("found user",user);
// console.log("user detail",user)
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

       return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


