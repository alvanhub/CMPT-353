const PostController = require('./postController');

PostController.alterDatabase()
  .then(() => {
    console.log('Database altered successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error altering database:', error);
    process.exit(1);
  });
