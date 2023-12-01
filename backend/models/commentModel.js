const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'admin',
    database: 'postdb'
});

connection.connect();

class CommentModel {

    // global variab

    static createTable() {
        const query = `CREATE TABLE IF NOT EXISTS comments (
            id int unsigned NOT NULL auto_increment,
            text varchar(250) NOT NULL,
            image varchar(250) DEFAULT NULL,
            postId int unsigned,  
            PRIMARY KEY (id),
            FOREIGN KEY (postId) REFERENCES posts(id)
        )`;

        // const query = `DROP TABLE IF EXISTS comments;`

        connection.query(query, (error, result) => {
            if (error) throw error;
        });
    }

    // Other methods for comments CRUD operations

    static addComment(text, postId, callback) {
        const query = `INSERT INTO comments (text, postId) VALUES (?, ?)`;
        connection.query(query, [text, postId], (error, commentResult) => {
            if (error) return callback(error, null);
            return callback(null, { comment: commentResult});
        });
    }

    static addCommentWimage(text, postId, image, callback) {
        const query = `INSERT INTO comments (text, postId, image) VALUES (?, ?, ?)`;
        connection.query(query, [text, postId, image], (error, commentResult) => {
            if (error) return callback(error, null);
            return callback(null, { comment: commentResult});
        });
    }

    static getAllComments(postId, callback) {
        const query = `SELECT * FROM comments WHERE postId = ?`;
        connection.query(query, [postId], (error, results) => {
            if (error) return callback(error, null);
            return callback(null, results);
        });
    }
}

module.exports = CommentModel;
