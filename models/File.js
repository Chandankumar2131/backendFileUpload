
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    }
});

// post middleware


fileSchema.post("save", async function(doc){
try {
    console.log("doc",doc);

    // transporter

    // todo sift this into configration folder
    let transporter = nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS,
        },
    });

    // send mail
    let info =  await transporter.sendMail({
        from:"Chandan Yadav",
        to:doc.email,
        subject:"new file uploaded on cloudinary",
        html:`
      <h2>Hello Jee</h2> 
      <p>View here: <a href="${doc.imageUrl}" target="_blank">${doc.imageUrl}</a></p>
    `,
    })
    console.log("info",info);
    
} catch (error) {
    console.log(error);
    
}
})

const File = mongoose.model("File", fileSchema);
module.exports = File;