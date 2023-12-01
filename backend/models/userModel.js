const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'admin',
    database: 'postdb'
});

connection.connect();

class UserModel {
    static createTable() {
      const query = `CREATE TABLE IF NOT EXISTS users (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        isAdmin BOOLEAN DEFAULT FALSE,
        PRIMARY KEY (id)
      )`;

    //   const query = `DROP TABLE IF EXISTS users;`
  
      connection.query(query, (error, result) => {
        if (error) throw error;
      });
    }
  
    static createUser(name, password, callback) {
      const query = `INSERT INTO users (name, password) VALUES (?, ?)`;
      connection.query(query, [name, password], (error, userResult) => {
        if (error) return callback(error, null);
        return callback(null, { user: userResult });
      });
    }
  
    static createAdminUser(name, password, callback) {
        const query = `INSERT INTO users (name, password, isAdmin) VALUES (?, ?, ?)`;
        connection.query(query, [name, password, true], (error, userResult) => {
          if (error) return callback(error, null);
          return callback(null, { user: userResult });
        });
    }
  
    static removeUser(userId, callback) {
      const query = `DELETE FROM users WHERE id = ?`;
      connection.query(query, [userId], (error, result) => {
        if (error) return callback(error, null);
        return callback(null, { message: 'User deleted successfully' });
      });
    }

    static getAllUsers(callback) {
        const query = `SELECT * FROM users`;
        connection.query(query, (error, results) => {
            if (error) return callback(error, null);
            return callback(null, results);
        });
    }

    static getUser(name, password, callback) {
        const query = `SELECT * FROM users WHERE name = ? AND password = ?`;
        connection.query(query, [name, password], (error, results) => {
            if (error) return callback(error, null);
            return callback(null, results);
        });
    }
}

module.exports = UserModel;