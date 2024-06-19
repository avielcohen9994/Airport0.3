import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navbar1= () => {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light" className='shadow'>
        <Container>
          <Navbar.Brand href="#home">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Auth">Auth</Nav.Link>
            <Nav.Link href="/Airport">Airport</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbar1;