const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token,{
            httpOnly:true,
            secure:process.env.NODE_ENV,
            maxAge:1*24*60*60*1000,
            sameSite:"None"
        }); 
        res.status(200).json({ message: 'Login successful', token, success: true });

    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
}

module.exports = loginController;