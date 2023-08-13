const { google } = require('googleapis')
const youtube = google.youtube({
    version: "v3",
    auth: "AIzaSyAiilGnvB3gHSb1WaiSZ7WppmlaUYpXHrs"
});

async function getChannelId(username){
    try {
        const response = await youtube.channels.list({
            part: "id",
            forUsername: username
        });
        if (response.data.items.length > 0) {
            return response.data.items[0].id;
        } else {
            throw new Error("Channel not found");
        }
    } catch (error) {
        console.error("Error fetching channel ID:", error);
        throw error;
    }
}

async function getAllChannelVideos(channelId) {
    try {
        const response = await youtube.search.list({
            part: "snippet",
            channelId: channelId,
            maxResults: 50 // Number of results to fetch, can be adjusted
        });


        // const videos = response.data.items.map(item => {
        //     return {
        //         title: item.snippet.title,
        //         videoId: item.id.videoId
        //     };
        // });

        return videos;
    } catch (error) {
        console.error("Error fetching channel videos:", error);
        throw error;
    }
}

module.exports.getVideos = async (req, res, next) => {
    const channelUsername = "shresthaclub";
    try {
        const channelId = await getChannelId(channelUsername);
        const videos = await getAllChannelVideos(channelId);
        res.json(videos);
    } catch (error) {
        console.error("Error fetching channel videos:", error);
        res.status(500).send("Error fetching channel videos");
    }
}