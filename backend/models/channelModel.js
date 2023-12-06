const mysql = require('mysql');
const PostModel =  require('./postModel');

/// This database model serves as the messages in each channel
const connection = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'admin',
    database: 'postdb'
});

connection.connect();

class ChannelModel{
    static createTable() {
        const channelQuery = `CREATE TABLE IF NOT EXISTS channels (
            id int unsigned NOT NULL auto_increment,
            topic varchar(250) NOT NULL,
            userName varchar(100) NOT NULL,
            PRIMARY KEY (id)
        )`;

        // const channelQuery = `DROP TABLE IF EXISTS channels;`

        // Create the posts table
        connection.query(channelQuery, (error, result) => {
            if (error) throw error;
        });

    }

    static addChannel(topic, userName, callback) {
        const query = `INSERT INTO channels (topic, userName) VALUE (?, ?)`;
        connection.query(query, [topic, userName], (error, channelResult) => {
            if (error) return callback(error, null);

            PostModel.createTable(); // Ensure post table exists
            return callback(null, { channel: channelResult});

        });
    }

    static getAllChannels(callback) {
        const query = `SELECT * FROM channels`;
        connection.query(query, (error, results) => {
            if (error) return callback(error, null);
            return callback(null, results);
        });
    }

    static removeChannel(id, callback) {
        const query = `DELETE FROM channels WHERE id = ?`;
        connection.query(query, [id], (error, commentResult) => {
            if (error) return callback(error, null);
            return callback(null, { message: "channel deleted"});
        });
    }

    static getUserChannels(userName, callback) {
        const query = `SELECT * FROM channels WHERE userName = ?`;
        connection.query(query, [userName], (error, results) => {
            if (error) return callback(error, null);
            return callback(null, results);
        });
    }
}

module.exports = ChannelModel;