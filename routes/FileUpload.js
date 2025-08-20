const express = require('express')
const router = express.Router();

const{localFileUpload, imageUpload, vedioUpload}=require('../controllers/fileupload');

// api route
router.post('/localFileUpload',localFileUpload);
router.post('/imageUpload',imageUpload);
router.post("/vedioUpload",vedioUpload);

module.exports= router;