const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema({
    fileUrl: [String],  // Change this from String to an array of Strings
    filesName:[String],
    findToken:String,
    findTokenExpires:Date,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Files', fileSchema);