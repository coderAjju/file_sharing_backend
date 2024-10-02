const fileModel = require("../models/fileModel");
const cloudinary = require("../config/cloudinaryConfig");

const deleteFileController =  async (req, res) => {
    try {
        const fileId = req.params.id;

        const file = await fileModel.findByIdAndDelete(fileId); // Delete the file by ID
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        // Loop through the fileUrl array and destroy each file from Cloudinary
        for (const url of file.fileUrl) {
            const publicId = url.split('/').pop().split('.')[0];
            await new Promise((resolve, reject) => {
                cloudinary.uploader.destroy(publicId, (error, result) => {
                    if (error) {
                        console.error(`Error deleting file from Cloudinary: ${error}`);
                        reject(error);
                    } else {
                        console.log(`File deleted from Cloudinary: `,result);
                        resolve(result);
                    }
                });
            });
        }
        res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting file" });
    }
}

module.exports = deleteFileController;