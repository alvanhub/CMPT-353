const bodyParser = require('body-parser');
const CommentModel = require('../models/commentModel');
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


class CommentController {
    static initializeDatabase(req, res) {
        CommentModel.createTable();
        res.status(200).json({ message: 'Database created successfully.' });
    }

    static addComment(req, res) {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
              return res.status(500).json({ error: 'Error uploading file' });
            } else if (err) {
              return res.status(500).json({ error: 'Something went wrong' });
            }

            const { text, postId, userName, parentId} = req.query;
            
            
            //console.log(image);
            if (!text || !postId || !userName) {
                return res.status(400).json({ error: 'Text or postId not provided' });
            }


            if (req.file){
                const image = req.file.filename;
                
                CommentModel.addCommentWimage(text, postId, image, userName, parentId, (error, result) => {
                    if (error) return res.status(500).json({ error: 'Error adding comment' });
                    return res.status(200).json({ status: 'ok' });
                });
            }else{
                CommentModel.addComment(text, postId, userName, parentId, (error, result) => {
                    if (error) return res.status(500).json({ error: error });
                    return res.status(200).json({ status: 'ok' });
                });
            }
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

    static getChildrenComments(req, res) {
        const {postId} = req.query;

        if (!postId) {
            return res.status(400).json({ error: 'postId not provided' });
        }

        CommentModel.getChildrenComments(postId, (error, results) => {
            if (error) return res.status(500).json({ error: 'Error fetching comments' });
            return res.status(200).json({ comments: results });
        });
    }

    static getRecursiveComments(req, res) {
        const {parentId, id} = req.query;

        if (!parentId || !id) {
            return res.status(400).json({ error: 'parentId not provided' });
        }

        CommentModel.getRecursiveComments(parentId, id, (error, results) => {
            if (error) return res.status(500).json({ error: 'Error fetching comments' });
            return res.status(200).json({ comments: results });
        });
    }

    static removeComment(req, res) {
        const {id} = req.query;

        if (!id) {
            return res.status(400).json({ error: 'id not provided' });
        }

        CommentModel.removeComment(id, (error, results) => {
            if (error) return res.status(500).json({ error: 'Error removing comment' });
            return res.status(200).json({ comments: results });
        });
    }
}


module.exports = CommentController;