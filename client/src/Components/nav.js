//IMPORT
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


//Navigation Bar - Bootstrap , Handles Links
const NavigationBar = () => {
  return (
        <Navbar bg="success" variant="dark" fixed="top">
          <Container>
          <Navbar.Brand href="/" className="fw-bold text-uppercase">
            The Blog
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/" className="ms-3">Home</Nav.Link>
            <Nav.Link href="/create" className="ms-3">Create</Nav.Link>
            </Nav>
          </Container>
      </Navbar>
  );
};

//export to app
export default NavigationBar;