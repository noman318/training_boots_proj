import Container from "react-bootstrap/Container";
import {useDispatch, useSelector} from 'react-redux'
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
// eslint-disable-next-line no-unused-vars
import { isAdmin, isLoggedIn, doLogout } from "../services/MyData";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";

function Header() {

  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  
  const logoutHandler = () => {
   dispatch(logout())
  }

  return (
    <header>
          <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect styles={{paddingTop:'0.2px', paddingBottom:'0.7px'}}>
        <Container>            
          <LinkContainer to='/'>
            <Navbar.Brand>MyStore</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              
              {userInfo ? (
                <NavDropdown title={userInfo.firstName} id='username' >
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown> 
                
              ):
              
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              }
            
{/*               
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown> */}
          
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
