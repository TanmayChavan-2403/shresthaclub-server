const express = require("express");
const router = express.Router();
const {getVideos} = require('../handlers/youtubeHandlers')

router.get("/getVideos", getVideos);

module.exports = router;