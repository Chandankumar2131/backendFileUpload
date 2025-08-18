const mongoose = require('mongoose');
require('dotenv').config();



exports.dbConnection = () => {

    mongoose.connect(process.env.DATABASE_URL)
        .then(() => console.log("Databes Connected successfully"))
        .catch((err)=>{
            console.log("Database connection failled");
            
        })
}