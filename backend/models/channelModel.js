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
        const postQuery = `CREATE TABLE IF NOT EXISTS channels (
            id int unsigned NOT NULL auto_increment,
            topic varchar(250) NOT NULL,
            PRIMARY KEY (id)
        )`;

        // Create the posts table
        connection.query(postQuery, (error, result) => {
            if (error) throw error;
        });

    }

    static addChannel(topic, callback) {
        const query = `INSERT INTO channels (topic) VALUE (?)`;
        connection.query(query, [topic], (error, channelResult) => {
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
}

module.exports = ChannelModel;