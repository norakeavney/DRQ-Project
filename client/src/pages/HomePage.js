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

  //Function to handle deleting a post
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/posts/${id}`); //Send DELETE request
      setPosts(posts.filter((post) => post._id !== id)); //Remove deleted post from state (AKA Binding)
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete the post.');
    }
  };

  //Displaying Blog Posts on the HomePage in Card including a snippet of the content
  return (
    <Container className="mt-5">
      <h1>Blog Posts</h1>
      <Row>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Col key={post._id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.content.substring(0, 100)}...</Card.Text>
                  <Button variant="danger" onClick={() => handleDelete(post._id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No posts available. Create one to get started!</p>
        )}
      </Row>
    </Container>
  );
};

export default HomePage;
