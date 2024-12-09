const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        default: 'https://img.freepik.com/free-vector/hand-drawn-pressed-flowers-pattern_23-2148904575.jpg?t=st=1733777741~exp=1733781341~hmac=28c03fd83e340a7523a70898ca48df8978ab5869d13c5af62e957b4bc497a98d&w=740',
      },
    },
    { timestamps: true } //Adds createdAt and updatedAt 
  );
  

// Export the model using CommonJS syntax
module.exports = mongoose.model('Post', postSchema);
