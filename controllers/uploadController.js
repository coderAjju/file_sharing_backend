const cloudinary = require("../config/cloudinaryConfig")
const streamifier = require('streamifier'); // Streamifier import
const fileModel = require("../models/fileModel");
const crypto = require("crypto");

// Controller function to upload multiple files
const uploadFiles = async (req, res) => {
  try {
    if(!req.user){
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const filesName = []
    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ message: 'No files uploaded' });
    }
    const uploadPromises = req.files.map(file => {
      filesName.push(file.originalname)
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result.secure_url); // Resolve with the URL of the uploaded file
          }
        );
        streamifier.createReadStream(file.buffer).pipe(stream); // Use streamifier to pipe buffer
      });
    });

    const urls = await Promise.all(uploadPromises); // Wait for all uploads to finish

    //save urls to database
    const response = await fileModel({fileUrl:urls,filesName,user:req.user});

    // use crypto to generate a token
    const findToken = crypto.randomBytes(16).toString('hex');
    const findTokenExpires = new Date(Date.now() + 3600000); // 1 hour

    response.findToken = findToken;
    response.findTokenExpires = findTokenExpires;
    const url=`${process.env.CLIENT_URL}/download/${findToken}`
    response.downloadUrl=url
    await response.save();
    let downloadUrl = {
      url:`${process.env.CLIENT_URL}/download/${findToken}`,
    }
    return res.status(200).send({ message: 'Files uploaded successfully', downloadUrl});
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: 'Server error', error });
  }
};

// Export the controller
module.exports = uploadFiles;
