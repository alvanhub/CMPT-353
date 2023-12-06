const PostModel = require('../models/postModel');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Keeping the original filename
    }
  });

const upload = multer({ storage: storage }).single('image'); 

class PostController {
    static alterDatabase(req, res) {
        try{
            PostModel.alterTable();
        //res.status(200).json({ message: 'Database altered successfully.' });
            return Promise.resolve();
        }catch(error){
            return Promise.reject(error);
        }
    }

    static initializeDatabase(req, res) {
        PostModel.createTable();
        res.status(200).json({ message: 'Database created successfully.' });
    }

    static addPost(req, res) {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
              return res.status(500).json({ error: 'Error uploading file' });
            } else if (err) {
              return res.status(500).json({ error: 'Something went wrong' });
            }
            const { topic, data, channel_id, userName } = req.query;
            

            if (!topic || !data || !channel_id || !userName) {
                return res.status(400).json({ error: 'Topic, data, or channel Id not provided' });
            }

            if (req.file){
                const image = req.file.filename;

                console.log(image);
                PostModel.addPostWImage(topic, data, image, channel_id, userName, (error, result) => {
                    if (error) return res.status(500).json({ error: 'Error adding post with image' });
                    return res.status(200).json({ status: 'ok' });
                });
            }else{
                PostModel.addPost(topic, data, channel_id, userName, (error, result) => {
                    if (error) return res.status(500).json({ error: 'Error adding post' });
                    return res.status(200).json({ status: 'ok' });
                });
            }
        });
    }

    static getAllPosts(req, res) {
        PostModel.getAllPosts((error, results) => {
            if (error) return res.status(500).json({ error: 'Error fetching posts' });
            return res.status(200).json({ posts: results });
        });
    }

    static getChannelPosts(req, res) {
        const {channel_id} = req.query;

        if (!channel_id) {
            return res.status(400).json({ error: 'channel_id not provided' });
        }
        PostModel.getChannelPosts(channel_id, (error, results) => {
            if (error) return res.status(500).json({ error: 'Error fetching posts' });
            return res.status(200).json({ posts: results });
        });
    }

    static removePost(req, res) {
        const {id} = req.query;

        if (!id) {
            return res.status(400).json({ error: 'id not provided' });
        }

        PostModel.removePost(id, (error, results) => {
            if (error) return res.status(500).json({ error: 'Error removing post' });
            return res.status(200).json({ message: results });
        });
    }

    static getUserPosts(req, res) {
        const {userName} = req.query;

        if (!userName) {
            return res.status(400).json({ error: 'userName not provided' });
        }
        PostModel.getUserPosts(userName, (error, results) => {
            if (error) return res.status(500).json({ error: 'Error fetching posts' });
            return res.status(200).json({ posts: results });
        });
    }

    static updateClass(req, res) {
        const { userName, newClass } = req.query;
    
        if (!userName || !newClass) {
            return res.status(400).json({ error: 'userName or newclass not provided' });
          }
    
        PostModel.updateClass(userName, newClass, (error, users) => {
          if (error) return res.status(500).json({ error: error });
          return res.status(200).json({ users });
        });
      }
}

module.exports = PostController;
