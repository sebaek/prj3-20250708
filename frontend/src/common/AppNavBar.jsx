import { Link, NavLink } from "react-router";
import {
  Button,
  Container,
  FormControl,
  InputGroup,
  Nav,
  Navbar,
  Form,
} from "react-bootstrap";
import { useContext, useState } from "react";
import { AuthenticationContext } from "./AuthenticationContextProvider.jsx";

export function AppNavBar() {
  const [keyword, setKeyword] = useState("");
  const { user, isAdmin } = useContext(AuthenticationContext);

  function handleSearchFormSubmit() {
    console.log("조회 폼 서브밋");
  }

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand to="/" as={Link}>
            PRJ3
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link as={NavLink} to="/">
                HOME
              </Nav.Link>
              {user !== null && (
                <Nav.Link as={NavLink} to="/board/add">
                  새글
                </Nav.Link>
              )}
            </Nav>
            <Nav className="order-lg-3">
              {user === null && (
                <Nav.Link as={NavLink} to="/signup">
                  가입
                </Nav.Link>
              )}
              {isAdmin() && (
                <Nav.Link as={NavLink} to="/member/list">
                  회원목록
                </Nav.Link>
              )}
              {user === null && (
                <Nav.Link as={NavLink} to="/login">
                  로그인
                </Nav.Link>
              )}
              {user !== null && (
                <Nav.Link as={NavLink} to="/logout">
                  로그아웃
                </Nav.Link>
              )}
              {user !== null && (
                <Nav.Link as={NavLink} to={`/member?email=${user.email}`}>
                  {user.nickName}
                </Nav.Link>
              )}
            </Nav>

            <Form
              inline
              onSubmit={handleSearchFormSubmit}
              className="order-lg-2 mx-lg-auto"
            >
              <InputGroup>
                <FormControl
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                ></FormControl>
                <Button type="submit">검색</Button>
              </InputGroup>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
