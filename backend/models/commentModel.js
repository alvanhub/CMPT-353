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
            userName varchar(100) NOT NULL,  
            parentId int unsigned,
            PRIMARY KEY (id),
            FOREIGN KEY (postId) REFERENCES posts(id),
            FOREIGN KEY (parentId) REFERENCES comments(id)
        )`;

        // const query = `DROP TABLE IF EXISTS comments;`

        connection.query(query, (error, result) => {
            if (error) throw error;
        });
    }

    // Other methods for comments CRUD operations

    static addComment(text, postId, userName, parentId, callback) {
        const query = `INSERT INTO comments (text, postId, userName, parentId) VALUES (?, ?, ?, ?)`;
        connection.query(query, [text, postId, userName, parentId], (error, commentResult) => {
            if (error) return callback(error, null);
            return callback(null, { comment: commentResult});
        });
    }

    static addCommentWimage(text, postId, image, userName, parentId, callback) {
        const query = `INSERT INTO comments (text, postId, image, userName, parentId) VALUES (?, ?, ?, ?, ?)`;
        connection.query(query, [text, postId, image, userName, parentId], (error, commentResult) => {
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

    static getChildrenComments(postId, callback) {
        // const query = `SELECT * FROM comments WHERE parentId = ?`;
        // connection.query(query, [parentId], (error, results) => {
        //     if (error) return callback(error, null);
        //     return callback(null, results);
        // });
        const query = `
            SELECT c.*, 
                (SELECT JSON_ARRAYAGG(
                    JSON_OBJECT('id', cc.id, 'text', cc.text, 'image', cc.image, 'userName', cc.userName, 'parentId', cc.parentId)
                ) FROM comments cc WHERE cc.parentId = c.id) AS children
            FROM comments c
            WHERE c.postId = ?
                AND c.parentId IS NULL;`;

        connection.query(query, [postId], (error, results) => {
            if (error) return callback(error, null);
            return callback(null, results);
        });
    }

    static getRecursiveComments(parentId, id, callback) {
        // const query = `SELECT * FROM comments WHERE parentId = ?`;
        // connection.query(query, [parentId], (error, results) => {
        //     if (error) return callback(error, null);
        //     return callback(null, results);
        // });
        const query = `
            SELECT c.*, 
                (SELECT JSON_ARRAYAGG(
                    JSON_OBJECT('id', cc.id, 'text', cc.text, 'image', cc.image, 'userName', cc.userName, 'parentId', cc.parentId)
                ) FROM comments cc WHERE cc.parentId = c.id) AS children
            FROM comments c
            WHERE c.parentId = ?
                AND c.id = ?`;

        connection.query(query, [parentId, id], (error, results) => {
            if (error) return callback(error, null);
            return callback(null, results);
        });
    }

    static removeComment(id, callback) {
        const query = `DELETE FROM comments WHERE id = ?`;
        connection.query(query, [id], (error, commentResult) => {
            if (error) return callback(error, null);
            return callback(null, { comment: commentResult});
        });
    }


}

module.exports = CommentModel;
