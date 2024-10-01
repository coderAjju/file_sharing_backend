const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');

const signupController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User created successfully', user, success: true });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message, success: false });
    }
}


module.exports = signupController;  