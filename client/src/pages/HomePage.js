import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; //Import Link for navigation

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

    fetchPosts(); //Fetching posts from backend
  }, []);

  //Displaying Blog Posts on the HomePage in Cards with images
  return (
    <Container className="mt-5 position-relative">
        <br></br>
      <h1>Blog Posts</h1>
      <Row>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Col key={post._id} md={4} className="mb-4">
              <Card className="h-100 shadow-sm rounded">
                <Card.Img
                  variant="top"
                  src={post.image || ''}
                  alt={post.title}
                  style={{ objectFit: 'cover', height: '200px' }}
                />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.content.substring(0, 100)}...</Card.Text>
                  <Button as={Link} to={`/posts/${post._id}`} variant="success" >
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No posts available. Create one to get started!</p>
        )}
      </Row>

      <Link
        to="/create"
        className="btn btn-success rounded-circle shadow"
        style={{
            position: 'absolute', 
            top: '70px', //Below Nav Bar
            right: '30px', //Position at the right
            width: '60px',
            height: '60px', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '24px',
            zIndex: 1000, //Ensures it's above other elements
        }}
        >
        +
        </Link>

    </Container>
  );
};

export default HomePage;
