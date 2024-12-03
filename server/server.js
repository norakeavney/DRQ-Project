const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // Import dotenv for environment variables
const Post = require('./Models/posts'); // Import the Post model

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { // Use MONGO_URI from .env
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
// GET all posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all documents from "posts" collection
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new post
app.post('/posts', async (req, res) => {
  try {
    const newPost = new Post(req.body); // Create a new document using request data
    const savedPost = await newPost.save(); // Save to MongoDB
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
