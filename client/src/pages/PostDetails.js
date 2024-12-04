import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Button, Form } from 'react-bootstrap';

const PostDetails = () => {
  const { id } = useParams(); //Get the post ID from the URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null); //State for post data
  const [isEditing, setIsEditing] = useState(false); //State to toggle editing mode
  const [title, setTitle] = useState(''); //State for editable title
  const [content, setContent] = useState(''); //State for editable content

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/posts/${id}`);
        setPost(response.data);
        setTitle(response.data.title); //Initialize title state
        setContent(response.data.content); //Initialize content state
      } catch (error) {
        console.error('Error fetching post:', error);
        alert('Failed to fetch post. Returning to homepage.');
        navigate('/');
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing); //Toggle editing mode and normal mode
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedPost = await axios.put(`http://localhost:4000/posts/${id}`, {
        title,
        content,
      });
      setPost(updatedPost.data); //Update the post in the state
      setIsEditing(false); //Exit editing mode
      alert('Post updated successfully!');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update the post.');
    }
  };

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
    return <p>Loading post...</p>;
  }

  return (
    <Container className="mt-5">
      {isEditing ? (
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)} //Update title state
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)} //Update content state
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
          <Button
            variant="secondary"
            className="ms-3"
            onClick={handleEditToggle}
          >
            Cancel
          </Button>
        </Form>
      ) : (
        <>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <Button variant="warning" onClick={handleEditToggle}>
            Edit Post
          </Button>
          <Button variant="danger" className="ms-3" onClick={handleDelete}>
          <i class="bi bi-trash me-2"></i> 
            Delete Post
          </Button>
        </>
      )}
    </Container>
  );
};

export default PostDetails;
