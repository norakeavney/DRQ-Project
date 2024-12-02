const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware CORS
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable cross-origin requests

// MongoDB Connection - Cluster1
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@blogdb.tczoy.mongodb.net/blogDB?retryWrites=true&w=majority')
.then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


// Sample route
app.get('/', (req, res) => {
    res.send('Backend is working!');
  });

// /posts route
app.get('/posts', (req, res) => {
    res.json([
      { _id: '1', title: 'Post 1', content: 'This is the first post.' },
      { _id: '2', title: 'Post 2', content: 'This is the second post.' },
    ]);
  });
  
  // Start the server
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });