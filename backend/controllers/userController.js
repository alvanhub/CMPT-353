const UserModel = require('../models/userModel');

class UserController {
  static initializeDatabase(req, res) {
    UserModel.createTable();
    res.status(200).json({ message: 'User table created successfully.' });
  }

  static createUser(req, res) {
    const { name, password } = req.query;

    if (!name || !password) {
      return res.status(400).json({ error: 'Name or password not provided' });
    }

    UserModel.createUser(name, password, (error, result) => {
      if (error) return res.status(500).json({ error: 'Error creating user' });
      return res.status(200).json({ status: 'User created successfully' });
    });
  }

  static createAdminUser(req, res) {
    const { name, password } = req.query;

    if (!name || !password) {
      return res.status(400).json({ error: 'Name or password not provided' });
    }

    UserModel.createAdminUser(name, password, (error, result) => {
      if (error) return res.status(500).json({ error: 'Error creating admin user' });
      return res.status(200).json({ status: 'Admin user created successfully' });
    });
  }

  static removeUser(req, res) {
    const { name } = req.query;

    //console.log(name);
    UserModel.removeUser(name, (error, result) => {
      if (error) return res.status(500).json({ error: 'Error removing user' });
      return res.status(200).json({ status: 'User removed successfully' });
    });
  }

  static getAllUsers(req, res) {
    UserModel.getAllUsers((error, users) => {
      if (error) return res.status(500).json({ error: 'Error fetching users' });
      return res.status(200).json({ users });
    });
  }

  static getUser(req, res) {
    const { name, password } = req.query;

    if (!name || !password) {
        return res.status(400).json({ error: 'Name or password not provided' });
      }

    UserModel.getUser(name, password, (error, users) => {
      if (error) return res.status(500).json({ error: 'Error fetching users' });
      return res.status(200).json({ users });
    });
  }

  static getUserById(req, res) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Name or password not provided' });
      }

    UserModel.getUserById(id, (error, users) => {
      if (error) return res.status(500).json({ error: 'Error fetching user' });
      return res.status(200).json({ users });
    });
  }

  static updateClass(req, res) {
    const { userId, newClass } = req.query;

    if (!userId || !newClass) {
        return res.status(400).json({ error: 'userId or newclass not provided' });
      }

    UserModel.updateClass(userId, newClass, (error, users) => {
      if (error) return res.status(500).json({ error: error });
      return res.status(200).json({ users });
    });
  }


  // Add methods for removing channels, posts, and replies if needed
}

module.exports = UserController;
