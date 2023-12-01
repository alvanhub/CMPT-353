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

app.post('/addUser', UserController.createUser);

app.post('/addAdmin', UserController.createAdminUser);

app.get('/login', UserController.getUser);

app.put('/removeUser', UserController.removeUser);

// channels
// Initialize Database
app.get('/initChannel', ChannelController.initializeDatabase);

// Add a Post
app.post('/addChannel', ChannelController.addChannel);

// Get all Posts
app.get('/getChannels', ChannelController.getAllChannels);



// posts
// Initialize Database
app.get('/initPost', PostController.initializeDatabase);

// Add a Post
app.post('/addPost', PostController.addPost);

// Get all Posts
app.get('/getposts', PostController.getAllPosts);

// Get specific channel posts
app.get('/getChannelPosts', PostController.getChannelPosts);


// comments
// Initialize Database
app.get('/initComments', CommentController.initializeDatabase);

// Add a comment
app.post('/addComment', CommentController.addComment);

// get all comments
app.get('/getComments', CommentController.getAllComments);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
