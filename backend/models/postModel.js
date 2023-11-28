const mysql = require('mysql');
const CommentModel = require('./commentModel');

/// This database model serves as the messages in each channel
const connection = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'admin',
    database: 'postdb'
});

connection.connect();

class PostModel {

    static alterTable() {
        const alterQuery = `ALTER TABLE posts
        ADD COLUMN channel_id int,
        ADD CONSTRAINT fk_channel_id FOREIGN KEY (channel_id) REFERENCES channels(id);`;

        connection.query(alterQuery, (error, results, fields) => {
            if (error) throw error;
            console.log('Table altered successfully!');
          });
    }

    static createTable() {
        const postQuery = `CREATE TABLE IF NOT EXISTS posts (
            id int unsigned NOT NULL auto_increment,
            channel_id int unsigned,
            topic varchar(250) NOT NULL,
            data varchar(250) NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (channel_id) REFERENCES channels(id)
        )`;
        //const postQuery = `DROP TABLE IF EXISTS posts;`

        // Create the posts table
        connection.query(postQuery, (error, result) => {
            if (error) throw error;
        });

    }

    static addPost(topic, data, channel_id, callback) {
        const query = `INSERT INTO posts (topic, data, channel_id) VALUES (?, ?, ?)`;
        connection.query(query, [topic, data, channel_id], (error, postResult) => {
            if (error) return callback(error, null);

            CommentModel.createTable(); // Ensure comments table exists
            return callback(null, { post: postResult});

        });
    }

    static getAllPosts(callback) {
        const query = `SELECT * FROM posts`;
        connection.query(query, (error, results) => {
            if (error) return callback(error, null);
            return callback(null, results);
        });
    }

    static getChannelPosts(channel_id, callback) {
        const query = `SELECT * FROM posts WHERE channel_id = ?`;
        connection.query(query, [channel_id],(error, results) => {
            if (error) return callback(error, null);
            return callback(null, results);
        });
    }
}

module.exports = PostModel;
