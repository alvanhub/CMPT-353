const PostModel = require('../models/postModel');

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
        const { topic, data, channel_id } = req.query;

        if (!topic || !data || !channel_id) {
            return res.status(400).json({ error: 'Topic, data, or channel Id not provided' });
        }

        PostModel.addPost(topic, data, channel_id, (error, result) => {
            if (error) return res.status(500).json({ error: 'Error adding post' });
            return res.status(200).json({ status: 'ok' });
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
}

module.exports = PostController;
