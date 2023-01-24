import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"

import { Link } from "react-router-dom"

const CollapsibleExample = () => {
  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Container fluid >
        <Navbar.Brand to="/" as={Link} >
          GymLog
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to="/diary" as={Link}>
              Diary
            </Nav.Link>
            <Nav.Link to="/logger" as={Link}>
              Logger
            </Nav.Link>
            <Nav.Link to="/programs" as={Link}>
              Programs
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Account" className="me-auto" id="collasible-nav-dropdown" menuVariant="dark" align="end">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Info
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Sign out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CollapsibleExample
