import Container from "react-bootstrap/Container";
import { Nav, Navbar } from "react-bootstrap";
// eslint-disable-next-line no-unused-vars
import { isAdmin, isLoggedIn, doLogout } from "../services/MyData";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
  return (
    <div className="d-flex flex-column site_container">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <LinkContainer to={"/"}>
            <Navbar.Brand>MyStore</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {!isLoggedIn() && (
              <Nav className="ml-auto">
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/registration">
                  <Nav.Link>SignUp</Nav.Link>
                </LinkContainer>
              </Nav>
            )}

            {isLoggedIn() && (
              <Nav className="ml-auto">
                <LinkContainer to="/cart">
                  <Nav.Link>Cart</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login" onClick={() => doLogout()}>
                  <Nav.Link>Log Out</Nav.Link>
                </LinkContainer>
                
                  <Nav className="me-auto">
                    <LinkContainer to="/addproduct">
                      <Nav.Link>AddProduct</Nav.Link>
                    </LinkContainer>
                  </Nav>
                
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
