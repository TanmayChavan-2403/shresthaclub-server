const { connectMysqlDb } = require("../connection");

/**
    This function is used to get the author details from the database based on the authod_id passed
    @param {Array} author_id - Takes array of author ids which need to be selected from the database
    @return {Promise} Returns promise with the author details if resolved or reject with error
*/ 
exports.getAuthorDetails =  (author_ids) => {
    return new Promise( async (resolve, reject) => {
        const connection = await connectMysqlDb();
        console.log(author_ids);
        connection.query(`SELECT * FROM users WHERE author_id IN (${author_ids})`, async (err, result) => {
            if(err) reject(err)
            else resolve(result)
            connection.end();
        });
    })
}