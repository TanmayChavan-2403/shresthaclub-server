const {connectDB} = require("../connection");
const { connect } = require("../routers/commentRouter");
const { getAuthorDetails } = require("./mysqlHandlers");


module.exports.ReplyToCommentTEST = async (req, res, next) => {
    console.log(req.body);
    res.status(200).json({ status: "Successfully Sent", payload: "" }).end()
}


module.exports.addComment = async (req, res, next) => {
    // article_id  = In which article the comment is present, 
    //              HELPS IDENTIFY A COLLECTION IN THE DATABASE
    // author_id   = Which author commented on this article
    //              HELPS IDENTIFY A DOCUMENT IN THE COLLECTION
    // comment     = what is the comment or reply 
    // date        = On which data the user commented or replied

    const { article_id, author_id, comment, date } = req.body;

    // Calling the connectDB function from "connection.js" to create/ or retrieve already connected connection.
    const mongo = await connectDB();

    // Getting a reference to the database named articles
    const db = mongo.db("comments");

    // Get a reference to the collection named article_ia
    const comments = db.collection(article_id + '');

    const payload = { 
        author_id,
        date: getDate(), 
        comment, replies: [], 
        likes: 0, dislikes: 0,
        metadata: {
            [author_id]: 1,
        }
    }

    const result = await comments.insertOne(payload);
    if (result.acknowledged && result.insertedId) {
        res.json({ Status: true, Message: "Comment added successfully!" })
    } else {
        res.json({ Status: false, Message: "Something went wrong" });
    }
}

exports.replyToComment = async (req, res, next) => {
    // article_id  = In which article the comment is present, 
    //              HELPS IDENTIFY A COLLECTION IN THE DATABASE
    // to_author_id = path to which comment the user is replying format is (author_id/author_id/...)
    // from_author_id   = Which author commented on this article
    //              HELPS IDENTIFY A DOCUMENT IN THE COLLECTION
    // reply     = what is the reply to the comment
    // date        = On which data the user commented or replied

    // Extracting all the data from payload/body
    let { article_id, to_author_id, from_author_id, comment, date } = req.body;

    // Calling the connectDB function from "connection.js" to create/ or retrieve already connected connection.
    const mongo = await connectDB();

    // Getting a reference to the database named articles
    const db = mongo.db("comments");

    // Get a reference to the collection with article_id
    const collection = db.collection(article_id + '');

    filter = {}
    rc = 1; // Replies repeat count

    // Generating filter based on the path received for the "updateOne" function of mongodb
    to_author_id = to_author_id.split("/");
    for (let i = 0; i < to_author_id.length; i++) {
        if (i === 0) {
            filter["author_id"] = to_author_id[i];
        } else {
            filter["replies.".repeat(rc) + "author_id"] = parseInt(to_author_id[i]);
            rc++;
        }
    }

    // Generating arrayFilter based on the path received for the "updateOne" function of mongodb
    let arrayFilter = [];
    let identifiers = [""];
    const idr = indetifier();
    for (let i = 1; i < to_author_id.length; i++) {
        let currIdentifier = idr.next().value;
        identifiers.push(currIdentifier);
        currIdentifier += ".author_id";
        arrayFilter.push({
            [currIdentifier]: parseInt(to_author_id[i])
        })
    }

    // Generating path: The path where the reply will be pushed to the replies array of the comment
    pushPath = "";
    for (let i = 0; i < to_author_id.length; i++) {
        if (i === 0) {
            pushPath += "replies";
        } else {
            pushPath += `.$[${identifiers[i]}].replies`
        }
    }

    // constructing payload to the specified comment
    const replyToComment = { 
        author_id: from_author_id,
        date, 
        comment, replies: [], 
        likes: 0, dislikes: 0
    };
    let result = await collection.updateOne(
        filter,
        {
            $push: { [pushPath]: replyToComment }
        },
        {
            arrayFilters: arrayFilter
        }
    )

    if (result.acknowledged && result.modifiedCount) {  
        const path = "metadata." + from_author_id;
        let result2 = await collection.updateOne(
            {author_id: to_author_id[0]},
            {
                $inc: { [path]: 1 }
            }
        )
        if (result2.acknowledged){
            res.json({ Status: true, Message: "Replied successfully!" })
        } else {
            res.json({ Status: false, Message: "Sorry! something went wrong while updating." });
        }
    } else {
        res.json({ Status: false, Message: "Sorry! But could not reply" });
    }

}

exports.fetchComments = async (req, res, next) => {
    const article_id = req.query.article_id;
    // Calling the connectDB function from "connection.js" to create/ or retrieve already connected connection.
    const mongo = await connectDB();

    // Getting a reference to the database named articles
    const db = mongo.db("comments");

    // Get a reference to the collection with article_id
    const collection = db.collection(article_id + '');

    const reply = await collection.find({});
    let author_ids = new Set();
    reply.toArray()
        .then( async (data) => {
            data.forEach((comment) => {
                for(const id in comment.metadata){
                    author_ids.add(id);
                }
            })
            return data;
        })
        .then( (data) => {
            getAuthorDetails(Array.from(author_ids))
            .then(author_details => {
                let auth_detailss_map ={};
                for (const author of author_details){
                    console.log(author);
                    auth_detailss_map[author.author_id] = [author.author_name, author.avatar_url];
                }
                res.status(200).json({ payload: data, author_details: auth_detailss_map }).end()
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ status: err }).end()
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ status: err }).end()
        });
}



// Helper functions
function* indetifier() {
    const alphabets = "abcdefghijklmnopqrstuvwxyz";
    for (let idx = 0; idx < alphabets.length; idx++) {
        yield alphabets[idx];
    }
}



function getDate() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1; // add 1 because months are zero-indexed
    var day = today.getDate();
    // pad with zero if needed
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    // concatenate and print
    return year + "-" + month + "-" + day;
}



































// {
//     author_id: 5,
//     avatar_url,
//     author_name,
//     date: getDate(),
//     comment,
//     replies: [
//         {
//             author_id: 6,
//             avatar_url,
//             author_name,
//             date: getDate(),
//             comment,
//             replies: [],
//             likes: 0,
//             dislikes: 0
//         },
//         {
//             author_id: 12,
//             avatar_url,
//             author_name,
//             date: getDate(),
//             comment,
//             replies: [
//                 {
//                     author_id: 44,
//                     avatar_url,
//                     author_name,
//                     date: getDate(),
//                     comment,
//                     replies: [],
//                     likes: 0,
//                     dislikes: 0
//                 }
//             ],
//             likes: 0,
//             dislikes: 0
//         }
//     ],
//     likes: 0,
//     dislikes: 0
// }