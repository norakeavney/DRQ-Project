import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the backend API
    axios.get('/posts') // Backend
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <Container className="mt-5">
      <h1>Blog Posts</h1>
      <Button href="/create" variant="success" className="mb-3">Create New Post</Button>
      <Row>
        {posts.map((post) => (
          <Col key={post._id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content.substring(0, 100)}...</Card.Text>
                <Button href={`/posts/${post._id}`} variant="info">Read More</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
