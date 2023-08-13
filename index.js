const express = require('express');
const cors = require("cors");
const app = express();
app.use(cors());
require('dotenv').config()
const connectDB = require('./connection')
const commentRouter = require("./routers/commentRouter")
const youtubeRouter = require('./routers/youtubeRouter')

app.use(express.json());

// Using all routers
app.use( "/comment", commentRouter);
app.use("/youtube", youtubeRouter);




app.listen(3000, () => {
    // connectDB();
    console.log("Server is up and running on", 3000);
})