const express = require('express');
const cors = require("cors");
const app = express();
app.use(cors());
require('dotenv').config()
const connectDB = require('./connection')
const commentRouter = require("./routers/commentRouter")

app.use(express.json());

// Using all routers
app.use( "/comment", commentRouter);





app.listen(process.env.PORT, () => {
    // connectDB();
    console.log("Server is up and running on", process.env.PORT);
})