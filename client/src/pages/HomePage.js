import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/posts'); //Fetch posts from backend
        setPosts(response.data); //Save posts to state
      } catch (error) {
        console.error('Error fetching posts:', error); //Log errors
      }
    };

    fetchPosts(); //Fetching posts from BackEnd
  }, []);

  //Displaying Blog Posts on the HomePage in Card including a snippet of the content
  return (
    <Container className="mt-5">
      <h1>Blog Posts</h1>
      <Button href="/create" variant="success" className="mb-3">Create New Post</Button>
      <Row>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Col key={post._id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.content.substring(0, 100)}...</Card.Text>
                  <Button href={`/posts/${post._id}`} variant="info">Read More</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No posts found. Start by creating a new post!</p>
        )}
      </Row>
    </Container>
  );
};

export default HomePage;
