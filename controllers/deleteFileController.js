const fileModel = require("../models/fileModel");

const deleteFileController =  async (req, res) => {
    try {
        const fileId = req.params.id;
        await fileModel.findByIdAndDelete(fileId); // Delete the file by ID
        res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting file" });
    }
}

module.exports = deleteFileController;