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
        class VARCHAR(100) NOT NULL DEFAULT '',
        isAdmin BOOLEAN DEFAULT FALSE,
        PRIMARY KEY (id)
      )`;
  //     const query = `ALTER TABLE users
  // ADD COLUMN class VARCHAR(100) NOT NULL DEFAULT ''`;

    //   const query = `DROP TABLE IF EXISTS users;`
  
      connection.query(query, (error, result) => {
        if (error) throw error;
      });
    }
  
    static createUser(name, password, callback) {
      const checkQuery = `SELECT * FROM users WHERE name = ?`;
    connection.query(checkQuery, [name], (checkError, checkResults) => {
        if (checkError) {
            return callback(checkError, null);
        }

        if (checkResults && checkResults.length > 0) {
            // If the name already exists, return an error
            const error = new Error('User with this name already exists');
            return callback(error, null);
        } else {
            // If the name doesn't exist, proceed with creating the user
            const insertQuery = `INSERT INTO users (name, password) VALUES (?, ?)`;
            connection.query(insertQuery, [name, password], (insertError, userResult) => {
                if (insertError) {
                    return callback(insertError, null);
                }
                return callback(null, { user: userResult });
            });
        }
    });
    }
  
    static createAdminUser(name, password, callback) {
        const query = `INSERT INTO users (name, password, isAdmin) VALUES (?, ?, ?)`;
        connection.query(query, [name, password, true], (error, userResult) => {
          if (error) return callback(error, null);
          return callback(null, { user: userResult });
        });
    }
  
    static removeUser(name, callback) {
      const query = `DELETE FROM users WHERE name = ?`;
      connection.query(query, [name], (error, result) => {
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
            if (results.length > 0)
            {
              return callback(null, results);
            }else{
              return callback("email does not exist", null);
            }
        });
    }

    static getUserById(id, callback) {
      const query = `SELECT * FROM users WHERE id = ?`;
      connection.query(query, [id], (error, results) => {
          if (error) return callback(error, null);
          if (results.length > 0)
          {
            return callback(null, results);
          }else{
            return callback("email does not exist", null);
          }
      });
  }

  static updateClass(userId, newClass, callback) {
    const updateQuery = `UPDATE users SET class = ? WHERE id = ?`;
  
    connection.query(updateQuery, [newClass, userId], (error, results) => {
      if (error) return callback(error, null);
      return callback(null, results);
    });
  }
}

module.exports = UserModel;