// app create
const express = require('express')
const app = express();

//PPOT find out
require('dotenv').config();
const PORT = process.env.PORT||4000

// middleware add
app.use(express.json());
const fileupload = require('express-fileupload');
app.use(fileupload());

// db connection 
require('./config/databse').dbConnection();

// cloud connection
const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();


// api route
const Upload=  require('./routes/FileUpload');
app.use('/api/v1/', Upload);

// activate server
app.listen(PORT,()=>{
    console.log(`server started at${PORT}`);
    
})