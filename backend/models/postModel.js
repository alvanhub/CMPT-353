const mysql = require('mysql');
const CommentModel = require('./commentModel');
const multer = require('multer');

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
            userName varchar(100) NOT NULL,
            topic varchar(250) NOT NULL,
            data varchar(250) NOT NULL,
            userClass VARCHAR(100) NOT NULL DEFAULT '',
            image varchar(250) DEFAULT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (channel_id) REFERENCES channels(id)
        )`;
        // const postQuery = `DROP TABLE IF EXISTS posts;`
//               const postQuery = `ALTER TABLE posts
//    ADD COLUMN userClass VARCHAR(100) NOT NULL DEFAULT ''`;

        // Create the posts table
        connection.query(postQuery, (error, result) => {
            if (error) throw error;
        });

    }

    static addPost(topic, data, channel_id, userName, callback) {
        const query = `INSERT INTO posts (topic, data, channel_id, userName) VALUES (?, ?, ?, ?)`;
        connection.query(query, [topic, data, channel_id, userName], (error, postResult) => {
            if (error) return callback(error, null);

            CommentModel.createTable(); // Ensure comments table exists
            return callback(null, { post: postResult});

        });
    }

    static addPostWImage(topic, data, image, channel_id, userName, callback) {
        const query = `INSERT INTO posts (topic, data, image, channel_id, userName) VALUES (?, ?, ?, ?, ?)`;
        connection.query(query, [topic, data, image, channel_id, userName], (error, postResult) => {
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

    static removePost(id, callback) {
        const query = `DELETE FROM posts WHERE id = ?`;
        connection.query(query, [id], (error, commentResult) => {
            if (error) return callback(error, null);
            return callback(null, { message: "post deleted"});
        });
    }

    static getUserPosts(userName, callback) {
        const query = `SELECT * FROM posts WHERE userName = ?`;
        connection.query(query, [userName],(error, results) => {
            if (error) return callback(error, null);
            return callback(null, results);
        });
    }

    static updateClass(userName, newClass, callback) {
        const updateQuery = `UPDATE posts SET userClass = ? WHERE userName = ?`;
      
        connection.query(updateQuery, [newClass, userName], (error, results) => {
          if (error) return callback(error, null);
          return callback(null, results);
        });
      }
}

module.exports = PostModel;
