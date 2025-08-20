// app create
const express = require('express')
const app = express();
const fileUpload = require("express-fileupload");
//PPOT find out
require('dotenv').config();
const PORT = process.env.PORT || 4000
app.use(
    fileUpload({
        limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
        abortOnLimit: true,
        responseOnLimit: 'File size is too large. Max allowed is 5 MB',
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);
// middleware add
app.use(express.json());

// db connection 
require('./config/databse').dbConnection();

// cloud connection
const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();


// api route
const Upload = require('./routes/FileUpload');
app.use('/api/v1/', Upload);

// activate server
app.listen(PORT, () => {
    console.log(`server started at${PORT}`);

})