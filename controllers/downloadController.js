const fileModel = require("../models/fileModel");

const downloadController = async (req,res) => {
    try {
        const token = req.params.token;
        const response = await fileModel.findOne({findToken:token});
        if (!response) {
            return res.status(404).send({ message: 'No file found with that token' });
        }
        
        res.status(200).json({message:"urls",urls:response.fileUrl,fileNames:response.filesName})
    } catch (error) {
        return res.status(500).send({ message: 'Server error', error });
    }
}
module.exports = downloadController;chrom