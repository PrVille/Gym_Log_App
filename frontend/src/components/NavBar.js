import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"

import { Link } from "react-router-dom"

const NavigationBar = () => {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand to="/" as={Link}>
          GymLog
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to="/overview" as={Link}>
              Overview
            </Nav.Link>
            <Nav.Link to="/statistics" as={Link}>
              Statistics
            </Nav.Link>
            <Nav.Link to="/programs" as={Link}>
              Programs
            </Nav.Link>
            <Nav.Link to="/exercises" as={Link}>
              Exercises
            </Nav.Link>
            <Nav.Link to="/calculators" as={Link}>
              Calculators
            </Nav.Link>
            <Nav.Link to="/logger" as={Link}>
              Logger
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              title="Account"
              className="me-auto"
              id="collasible-nav-dropdown"
              menuVariant="dark"
              align="end"
            >
              <NavDropdown.Item to="/account/profile" as={Link}>Profile</NavDropdown.Item>
              <NavDropdown.Item to="/account/info" as={Link}>Info</NavDropdown.Item>
              <NavDropdown.Item to="/account/settings" as={Link}>Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Sign out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
