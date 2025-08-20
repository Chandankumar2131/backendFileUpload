const File = require("../models/File");
const fs = require('fs');
const cloudinary = require('cloudinary').v2


// helper: check file type
function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

// helper: upload to cloudinary
async function uploadFileToCloudinary(file, folder, resourceType = "auto") {
    const options = {
        folder,
        resource_type: resourceType, // "image", "video", or "auto"
    };
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}





exports.localFileUpload = async (req, res) => {
    try {
        // fetch file
        const file = req.files.file;
        const { name, email, tages } = req.body; // get other fields

        // ensure folder exists
        const dir = __dirname + '/files';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        //create a path where file need to be stored in the server
        const extension = file.name.split('.').pop();
        const path = dir + '/' + Date.now() + `.${extension}`;

        // add path to move file
        file.mv(path, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Error uploading file",
                    error: err
                });
            }

            // Log everything in console
            console.log({
                name: name,
                email: email,
                tages: tages,
                savedFilePath: path,
                fileInfo: file // optional, full file object
            });

            res.json({
                success: true,
                message: "Local file uploaded successfully",
                path: path
            });
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};



//>>>>>>    image uploading <<<<<<<<<<<<<<<<<<         


// function isFileTypeSupported(type, supportedTypes) {
//     return supportedTypes.includes(type);
// }

// async function uploadFileToCloudinary(file, folder) {
//     const options = { folder,
//          resource_type: resourceType,
//      };
//     return await cloudinary.uploader.upload(file.tempFilePath,resourceType = "auto", options);
// }

// image upload handler
exports.imageUpload = async (req, res) => {
    try {

        // data fetch
        const { name, tags, email } = req.body;

        //reciving file
        const file = req.files.imageFile;
        console.log(file);


        // validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "file formate is not supported"
            });
        }

        // file formate is supported
        console.log("uploading to cloudinary");

        const response = await uploadFileToCloudinary(file, "codehelp");
        console.log(response);

        // saving entery in the database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            messege: "Image uploaded successfully"
        })


    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            messege: "somthing went wrong"
        })

    }
}


//>>>>>>>>>> vedio uploading

// function isFileTypeSupported(type, supportedTypes) {
//     return supportedTypes.includes(type)
// }

// async function uploadFileToCloudinary(file, folder) {
//     const options = {
//         folder,
//         resource_type: "video",
//         quality: "auto",
//         fetch_format: "auto"
//     };
//     return await cloudinary.uploader.upload(file.tempFilePath, options);
// }

exports.vedioUpload = async (req, res) => {
    try {
        const { name, email, tags } = req.body;
        const file = req.files.vedioFile;

        const MAX_SIZE = 50 * 1024 * 1024; // 50 MB limit
        if (file.size > MAX_SIZE) {
            return res.status(400).json({
                success: false,
                message: `File is too large! Max size allowed is ${MAX_SIZE / (1024 * 1024)} MB.`
            });
        }

        //validation
        const supportedTypes = ["mp4", "mov", "webm"];
        const fileType =  file.name.split('.').pop().toLowerCase();
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "file formate is not supportefd"
            });
        }
        console.log("uploading vedio to cloudinary");
        const response = await uploadFileToCloudinary(file, "codehelp");
        console.log(response);


        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            messege: "vedio uploaded successfully"
        })


    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            messege: "somthing went wrong"
        })
    }
}