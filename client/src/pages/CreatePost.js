import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap'; //Alert and Bootstrap features
import axios from 'axios';


//State Management with REACT
const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState(''); //Added state for feedback messages
  const [error, setError] = useState(false); //Keep track errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //POST request to backend
      const response = await axios.post('http://localhost:4000/posts', { title, content });
      console.log('Response from server:', response.data);

      //Success feedback
      setMessage('Post created successfully!');
      setError(false);
      
      //Reset form fields - allow user to make another post
      setTitle('');
      setContent('');
    } catch (err) {
      console.error('Error creating post:', err);

      //Error feedback
      setMessage('Failed to create post. Please try again.');
      setError(true);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Create a New Post</h2>

      {/*Feedback Message*/}
      {message && (
        <Alert variant={error ? 'danger' : 'success'} className="mt-3">
          {message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {/*Title Input*/}
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the post title"
            value={title} //Binding to the useState above
            onChange={(e) => setTitle(e.target.value)} //Updates the textarea Title whenever user types
            required  //Ensures this field is filled before form submission
          />
        </Form.Group>

        {/*Content Input*/}
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter the post content"
            value={content} //Binding : Controlled by React
            onChange={(e) => setContent(e.target.value)} //Updates the textarea whenever user types
            required  //Ensures this field is filled before form submission
          />
        </Form.Group>

        {/*Submit Button*/}
        <Button type="submit" variant="success">
          Create Post
        </Button>
      </Form>
    </Container>
  );
};

export default CreatePost;
