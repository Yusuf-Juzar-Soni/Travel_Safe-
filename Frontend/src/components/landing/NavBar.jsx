import React, { Component } from 'react';
import {
  Navbar, Nav, Dropdown, Col,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../../images/navbar_logo.svg';
import { userLogout } from '../../actions/account/loginUserAction';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      name: localStorage.getItem('name'),
    };
  }

  // handle logout to destroy the cookie
  handleLogout = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('date');
    window.location.reload();
    window.location.assign('/');
    this.props.userLogout();
  };

  render() {
    let navUser = null;
    let nameDropDown = null;
    // let navLocation = null;
    nameDropDown = (
      <Dropdown>
        <Dropdown.Toggle style={{ backgroundColor: '#FF6337'}} id="dropdown-basic">
          &nbsp;
          {this.state.name}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item><Link to="/profile" className="nav-link">Profile Page</Link></Dropdown.Item>
          <Dropdown.Item><Link to="/" className="nav-link" onClick={this.handleLogout}>Log out</Link></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    if (localStorage.getItem('idToken')) {
      // navLocation = '/home';
      navUser = (
        <div className="collapse navbar-collapse navbar-right" id="navbarNav">
          <Navbar.Brand>
            <Link to="/home">
              <h2 style={{color:"white"}}><img src={Logo} width="90" height="auto" className="d-inline-block align-top" alt="Splitwise" />TravelSafe</h2>
            </Link>
          </Navbar.Brand>
          <Nav className="mr-auto" />
          <Nav.Item><Nav.Link>{nameDropDown}</Nav.Link></Nav.Item>
        </div>
      );
    } else {
      // navLocation = '/';
      navUser = (
        <div className="collapse navbar-collapse navbar-right" id="navbarNav">
          <Navbar.Brand>
          <Link to="/">
              <h2 style={{color:"white"}}><img src={Logo} width="90" height="auto" className="d-inline-block align-top" alt="Splitwise" />TravelSafe</h2>
            </Link>
          </Navbar.Brand>
          <Nav className="mr-auto" />
          <Nav.Item className="btn" style={{backgroundColor: '#FF6337',"marginRight": "15px","borderRadius": "5px"}} variant="light"><Link to="/login">&nbsp;Login</Link></Nav.Item>
          <Nav.Item className="btn" style={{backgroundColor: '#FF6337',"marginRight": "15px","borderRadius": "5px"}} variant="light"><Link to="/signup">&nbsp;Sign Up</Link></Nav.Item>
        </div>
      );
    }

    return (
      <div>
        <Navbar width="100%" style={{ backgroundColor: '#008B8b' }}>
          <Col xs lg="1">
            {'\u00A0'}
          </Col>
          {navUser}
          <Col xs lg="1">
            {'\u00A0'}
          </Col>
        </Navbar>
      </div>
    );
  }
}
export default connect(null, { userLogout })(NavBar);
