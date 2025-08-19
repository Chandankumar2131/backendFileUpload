const File = require("../models/File");
const fs = require('fs');

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

        // get correct extension
        const extension = file.name.split('.').pop();
        const path = dir + '/' + Date.now() + `.${extension}`;

        // move file
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
