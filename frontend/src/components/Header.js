import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>QuizApp</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/help">
                <Nav.Link>
                  <i className="fas fa-handshake"></i> Help
                </Nav.Link>
              </LinkContainer>
              <a
                className="git-link"
                href="https://github.com/alavir-ua/mern-quiz-app.git"
                rel="noreferrer"
                target="_blank"
              >
                <i className="fab fa-github"></i> Github
              </a>
              <LinkContainer to="/feedback">
                <Nav.Link>
                  <i className="fas fa-envelope"></i> Feedback
                </Nav.Link>
              </LinkContainer>
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            </Nav>
            <Nav className="ml-auto">
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isModerator && userInfo.isAdmin && (
                <NavDropdown title="Admin menu" id="adminmenu">
                  <LinkContainer to="/admin/quizlist">
                    <NavDropdown.Item>Quizes</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo && userInfo.isAdmin && !userInfo.isModerator && (
                <NavDropdown title="Admin menu" id="adminmenu">
                  <LinkContainer to="/admin/quizlist">
                    <NavDropdown.Item>Quizes</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
