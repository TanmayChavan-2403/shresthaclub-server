const { MongoClient } = require("mongodb");
const URI = "mongodb+srv://tanmay:tanmay@cluster0.lbhju4i.mongodb.net/Shrestha?retryWrites=true&w=majority";
const mysql = require('mysql');
const client = new MongoClient(URI);

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'shrestha',
    connectionLimit: 3,
})

async function connectDB(){
    try{
        await client.connect();
        
        console.log("Connected to MongoDB successfully!");

        return client;
    } catch(error){
        console.error("Failed to connect to MongoDB ", error);
    }
}

async function connectMysqlDb(){
    return pool;
}

module.exports = {connectDB, connectMysqlDb};