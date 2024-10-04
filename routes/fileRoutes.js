const express = require('express');
const uploadFiles = require("../controllers/uploadController");
const upload = require("../middleware/multer.middleware");
const downloadController = require('../controllers/downloadController');
const authMiddleware = require('../middleware/auth.middleware');
const getUserFileHistory = require('../controllers/getUserFileHistory');
const fileModel = require('../models/fileModel');
const deleteFileController = require('../controllers/deleteFileController');
const deleteAllFileController = require('../controllers/deleteAllFileController');
const router = express.Router();

// POST route to upload multiple files
router.post('/upload', authMiddleware, upload.array('files', 10), uploadFiles); // Accept up to 10 files

// GET route to download multiple files as a zip
router.get('/download/:token', downloadController);
router.get('/history',authMiddleware, getUserFileHistory);
router.delete('/delete/:id', deleteFileController);
router.post('/delete', deleteAllFileController);
module.exports = router;
