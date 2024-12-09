import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import { Container, Button, Form, Card} from 'react-bootstrap'; //Bootstrap components for styling


const PostDetails = () => {
  //Get the post ID using useParams
  const { id } = useParams();
  const navigate = useNavigate(); //Hook for navigation

  //State variables for managing editing mode
  const [post, setPost] = useState(null); //Stores fetched post data
  const [isEditing, setIsEditing] = useState(false); //Toggles viewing & editing mode
  const [title, setTitle] = useState(''); 
  const [content, setContent] = useState(''); 

  //useEffect runs for when the `id` changes
  useEffect(() => {
    const fetchPost = async () => {
      try {
        //Fetch the post details from the server using the post ID
        const response = await axios.get(`http://localhost:4000/posts/${id}`);
        setPost(response.data); //Store the fetched post in state - Binding
        setTitle(response.data.title); 
        setContent(response.data.content); 
      } catch (error) {
        console.error('Error fetching post:', error);
        alert('Failed to fetch post. Returning to homepage.'); //Error message to the user
        navigate('/'); //Redirect to homepage if the post can't be fetched
      }
    };

    fetchPost(); //Call the fetchPost function
  }, [id, navigate]);

  //Toggles editing mode on and off
  const handleEditToggle = () => setIsEditing(!isEditing);

  //Handles the form submission to update the post
  const handleUpdate = async (e) => {
    e.preventDefault(); 
    try {
      //Send a PUT request to update the post with the new title and content
      const updatedPost = await axios.put(`http://localhost:4000/posts/${id}`, {
        title,
        content,
      });
      setPost(updatedPost.data); //Update the post state with the new data
      setIsEditing(false); //Exit editing mode
      alert('Post updated successfully!'); //Show success message
    } catch (error) {
      console.error('Error updating post:', error); //Log the error
      alert('Failed to update the post.'); //Show error message
    }
  };

  //Deleting the post
  const handleDelete = async () => {
    try {
      //Send a DELETE request to remove the post
      await axios.delete(`http://localhost:4000/posts/${id}`);
      alert('Post deleted successfully!'); //Show success message
      navigate('/'); //Redirect to homepage after deletion
    } catch (error) {
      console.error('Error deleting post:', error); //Log the error
      alert('Failed to delete the post.'); //Show error message
    }
  };

  //If the post data hasn't loaded yet, show a loading message
  if (!post) {
    return <p>Loading post...</p>;
  }

  return (
    <Container className="mt-5">
      {isEditing ? (
        //Displays a form to update the post
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3">
            {/*Input field for the post title*/}
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title} //Controlled input bound to state
              onChange={(e) => setTitle(e.target.value)} //Updates title state on change
              required //Ensures the field is not empty
            />
          </Form.Group>
          <Form.Group className="mb-3">
            {/*Textarea for the post content*/}
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5} //Multi-line input
              value={content} //Controlled input bound to state
              onChange={(e) => setContent(e.target.value)} //Updates content state on change
              required //Ensures the field is not empty
            />
          </Form.Group>
          {/*Submit button to save changes*/}
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
          {/*Button to cancel editing & return to view mode*/}
          <Button
            variant="secondary"
            className="ms-3" //Left margin for spacing
            onClick={handleEditToggle}
          >
            Cancel
          </Button>
        </Form>
      ) : (
        //Displays post details
        <Card className="shadow p-4 border">
          <Card.Body>
            <h1>{post.title}</h1>
            {/*Show creation date*/}
            <p className="text-muted">
              Published on: {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p>{post.content}</p>
            {/*Button to toggle editing mode*/}
            <Button variant="warning" onClick={handleEditToggle}>
              <i className="bi bi-pencil-square me-2"></i>
              Edit Post
            </Button>
            {/*Button to delete the post*/}
            <Button variant="danger" className="ms-3" onClick={handleDelete}>
              <i className="bi bi-trash me-2"></i>
              Delete Post
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
  
};

export default PostDetails;
