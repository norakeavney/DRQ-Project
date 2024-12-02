import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/posts', { title, content }) // TODO backend route
      .then(() => {
        alert('Post created successfully!');
        setTitle('');
        setContent('');
      })
      .catch((error) => {
        console.error('Error creating post:', error);
      });
  };

  return (
    <Container className="mt-5">
      <h2>Create a New Post</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={5} 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </Form.Group>
        <Button type="submit" variant="success">Create Post</Button>
      </Form>
    </Container>
  );
};

export default CreatePost;
