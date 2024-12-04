const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // Import dotenv for environment variables
const Post = require('./Models/posts'); // Import the Post model
const cors = require('cors'); // Import cors

dotenv.config(); // Load environment variables from .env file

const app = express();

//Middleware with CORS
app.use(cors()); //Enable CORS
app.use(express.json()); 

//Connect to MongoDB using mongoose and dot env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
// GET all posts
app.get('/posts', async (req, res) => {
    try {
      const posts = await Post.find(); //Fetch all posts from the database
      res.status(200).json(posts); //Respond with the list of posts
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

//Get Specific Post to display on Post Details
  app.get('/posts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findById(id); //Find the post by ID
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(post); //Respond with the post
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  

  //POST Route
  app.post('/posts', async (req, res) => {
    try {
      const newPost = new Post(req.body); //Create a new post using the request body
      const savedPost = await newPost.save(); //Save the post to the database
      res.status(201).json(savedPost); //Respond with the saved post
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  

  //Delete Route - ASYNC
  app.delete('/posts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedPost = await Post.findByIdAndDelete(id); //Mongoose deletes by ID
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
  

//Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
