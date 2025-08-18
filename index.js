//  server initiation
const express = require('express')
const app = express();

// importing PORT from the env file
require('dotenv').config();
const PORT = process.env.PORT || 4000;

// using middleware
app.use(express.json());

//  calling routes



// activating server
app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);

})

// database connection
require('./config/databse').dbConnection();

// by defaoult api path
app.get("/", (req, res) => {
    res.send("<h1>Hello default server tis side ")
})