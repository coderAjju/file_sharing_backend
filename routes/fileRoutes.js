const express = require('express');
const uploadFiles = require("../controllers/uploadController");
const upload = require("../middleware/multer.middleware");
const downloadController = require('../controllers/downloadController');
const authMiddleware = require('../middleware/auth.middleware');
const getUserFileHistory = require('../controllers/getUserFileHistory');
const fileModel = require('../models/fileModel');
const deleteFileController = require('../controllers/deleteFileController');
const router = express.Router();

// POST route to upload multiple files
router.post('/upload', 
    (req, res, next) => {
        console.log('Request headers:', req.headers);
        console.log('Request cookies:', req.cookies);
        next();
    },
    authMiddleware, 
    upload.array('files', 10), 
    (req, res, next) => {
        console.log('After authMiddleware - User:', req.user);
        next();
    },
    uploadFiles
); // Accept up to 10 files

// GET route to download multiple files as a zip
router.get('/download/:token', downloadController);
router.get('/history',authMiddleware, getUserFileHistory);
router.delete('/delete/:id', deleteFileController);

module.exports = router;
