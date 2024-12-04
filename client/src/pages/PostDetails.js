import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';

const PostDetails = () => {
  const { id } = useParams(); //Get the post ID from the URL
  const navigate = useNavigate(); //Navigate back to the homepage
  const [post, setPost] = useState(null); //State to store the post data (Binding)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
        alert('Failed to fetch post. Returning to homepage.');
        navigate('/'); //Redirect to homepage if there's an error
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/posts/${id}`); //Send DELETE request
      alert('Post deleted successfully!');
      navigate('/'); //Redirect to homepage after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete the post.');
    }
  };

  if (!post) {
    return <p>Loading post...</p>; //Loading message while fetching post from DB
  }

  //Bootstrap Container
  return (
    <Container className="mt-5">
      <h1>{post.title}</h1> 
      <p>{post.content}</p>
      <Button variant="danger" onClick={handleDelete}>
        Delete Post
      </Button>
    </Container>
  );
};

export default PostDetails;
