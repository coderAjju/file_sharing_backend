const cloudinary = require("../config/cloudinaryConfig");
const fileModel = require("../models/fileModel");

const deleteAllFileController = async (req, res) => {
    try {
        const { fileHistory } = req.body;

        // Extract all file URLs from the fileHistory array
        const allFileUrls = fileHistory.flatMap(file => file.fileUrl);

        // Delete files from Cloudinary
        for (const url of allFileUrls) {
            const publicId = url.split('/').pop().split('.')[0];
            try {
                await new Promise((resolve, reject) => {
                    cloudinary.uploader.destroy(publicId, (error, result) => {
                        if (error) {
                            console.error(`Error deleting file from Cloudinary: ${error}`);
                            reject(error);
                        } else {
                            console.log(`File deleted from Cloudinary: `, result);
                            resolve(result);
                        }
                    });
                });
            } catch (error) {
                console.error(`Failed to delete file with publicId ${publicId}: ${error}`);
            }
        }

        // Delete all files from the database
        await fileModel.deleteMany({ _id: { $in: fileHistory.map(file => file._id) } });

        res.status(200).json({ message: "All files deleted successfully" });
    } catch (error) {
        console.log(error);
    }
}

module.exports = deleteAllFileController;