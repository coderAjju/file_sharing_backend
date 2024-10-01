const fileModel = require("../models/fileModel");

const getUserFileHistory = async (req, res) => {
    try {
        const userId = req.user;  // Get user ID from request params
        const files = await fileModel.find({ user: userId });  // Fetch all files shared by this user
        
        res.status(200).json({files,success:true});  // Send the files back as response
    } catch (error) {
        res.status(500).json({ message: "Error fetching file history" });
    }
};

module.exports = getUserFileHistory;
