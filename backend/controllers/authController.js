const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken') ;
const { generateTokenAndSetCookie } = require("../utils/genrateToken.js");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user with the same email already exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error: "user with this email already exists" });
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the email and hashed password
    const newUser = new User({ email, password: hashedPassword });
    if (newUser) {
      // Generate token and set it as a cookie
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
    } else {
      return res.status(400).json({ error: "invalid user data" });
    }

    // Return success message
    res.status(200).json({ email, message: "user created successfuly" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Define the login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Check if user exists and password is correct
    const isCorrectPassword = await bcrypt.compare(
      password,
      user ? user.password : ""
    );

    if (!user || !isCorrectPassword) {
      res.status(401).json({ error: "authentication failed" });
      return;
    }

    // Generate token and set it as a cookie
    generateTokenAndSetCookie(user._id, res);

    // Return success message
    res.status(200).json({ email, message: "logged in secssfuly" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Define the logout function
const logout = (req, res) => {
  try {
    // Clear the JWT cookie
    res.cookie("jwt", "", { maxAge: 0 });

    // Return success message
    res.status(200).json({ message: "logged out secssfuly" });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Define the verifyToken function
const verifyToken = async (req, res) => {
  try {
    const token = req.body.token;

    if (!token) {
      return res.status(401).json({ valid: false, message: 'No token provided.' });
    }
  
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(`err ${err}`)
        return res.status(500).json({ valid: false, message: 'Failed to authenticate token.' });
      }
      console.log(`decoded ${decoded}`)
      res.json({ valid: true, message: 'Token is valid.' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Export the functions
module.exports = { signup, login, logout, verifyToken };
