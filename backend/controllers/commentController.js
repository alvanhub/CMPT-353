const CommentModel = require('../models/commentModel');

class CommentController {
    static initializeDatabase(req, res) {
        CommentModel.createTable();
        res.status(200).json({ message: 'Database removed successfully.' });
    }

    static addComment(req, res) {
        const { text, postId } = req.query;
        

        if (!text || !postId) {
            return res.status(400).json({ error: 'Text or postId not provided' });
        }

        CommentModel.addComment(text, postId, (error, result) => {
            if (error) return res.status(500).json({ error: 'Error adding comment' });
            return res.status(200).json({ status: 'ok' });
        });
    }

    static getAllComments(req, res) {
        const {postId} = req.query;

        if (!postId) {
            return res.status(400).json({ error: 'PostId not provided' });
        }

        CommentModel.getAllComments(postId, (error, results) => {
            if (error) return res.status(500).json({ error: 'Error fetching comments' });
            return res.status(200).json({ comments: results });
        });
    }
}


module.exports = CommentController;