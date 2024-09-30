const express = require('express');
const uploadFiles = require("../controllers/uploadController");
const upload = require("../middleware/multer.middleware");
const downloadController = require('../controllers/downloadController');
const router = express.Router();

// POST route to upload multiple files
router.post('/upload', upload.array('files', 10), uploadFiles); // Accept up to 10 files

// GET route to download multiple files as a zip
router.get('/download/:token', downloadController);
module.exports = router;
