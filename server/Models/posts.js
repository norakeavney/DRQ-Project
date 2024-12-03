const mongoose = require('mongoose');

//Define the Post schema
const postSchema = new mongoose.Schema({
  title: {
    type: String, //Field type
    required: true, //Validation: must be present
    trim: true, //Removes leading/trailing spaces
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, //Auto-set to current date
  },
});

//Create the Post model from the schema
module.exports = mongoose.model('Post', postSchema);

