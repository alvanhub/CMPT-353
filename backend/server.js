const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PostController = require('./controllers/postController');
const CommentController = require('./controllers/commentController');
const ChannelController = require('./controllers/channelController');
const UserController = require("./controllers/userController");


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const port = 5000;

// image storage
app.use('/uploads', express.static('uploads'));

// Users
app.get('/initUsers', UserController.initializeDatabase);

app.get('/getUsers', UserController.getAllUsers);

app.get('/getUserById', UserController.getUserById);

app.post('/addUser', UserController.createUser);

app.post('/addAdmin', UserController.createAdminUser);

app.get('/login', UserController.getUser);

app.put('/removeUser', UserController.removeUser);

app.put('/updateClass', UserController.updateClass);

// channels
// Initialize Database
app.get('/initChannel', ChannelController.initializeDatabase);

// Add a channel
app.post('/addChannel', ChannelController.addChannel);

// Remove a channel
app.put('/removeChannel', ChannelController.removeChannel);

// Get all channel
app.get('/getChannels', ChannelController.getAllChannels);

// Get user channel
app.get('/getUserChannels', ChannelController.getUserChannels);



// posts
// Initialize Database
app.get('/initPost', PostController.initializeDatabase);

// Add a Post
app.post('/addPost', PostController.addPost);

// remove a Post
app.put('/removePost', PostController.removePost);

// Get all Posts
app.get('/getposts', PostController.getAllPosts);

// Get user Posts
app.get('/getUserPosts', PostController.getUserPosts);


app.put('/updatePostsClass', PostController.updateClass);

// Get specific channel posts
app.get('/getChannelPosts', PostController.getChannelPosts);


// comments
// Initialize Database
app.get('/initComments', CommentController.initializeDatabase);

// Add a comment
app.post('/addComment', CommentController.addComment);

// get all comments
app.get('/getComments', CommentController.getAllComments);

// get user comments
app.get('/getUserComments', CommentController.getUserComments);

app.put('/updateCommentsClass', CommentController.updateClass);

// get child comments
app.get('/getChildComments', CommentController.getChildrenComments);

// get recursive child comments
app.get('/getRecursiveComments', CommentController.getRecursiveComments);

// remove a comment
app.put('/removeComment', CommentController.removeComment);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
