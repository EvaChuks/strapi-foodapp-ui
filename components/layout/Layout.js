import React, { useContext } from "react";
import Link from "next/link";
import Head from "next/head";
import { Container, Nav, Navbar } from "react-bootstrap";
import { logout } from "../../lib/auth";
import AppContext from "../../context/AppContext";

function Layout(props) {
  const title = "Welcome to Nextjs";
  const { user, setUser } = useContext(AppContext);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Food app" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        {/* <script
            src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
            integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
            crossOrigin="anonymous"
          ></script>
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
            integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF"
            crossOrigin="anonymous"
          ></script> */}
        <script src="https://js.stripe.com/v3" />
      </Head>
      <header>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">StrapiFood</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav
                className="ms-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Item>
                  <Link href="/">
                    <a className="nav-link">Home</a>
                  </Link>
                </Nav.Item>
                <Nav.Item className="ms-auto">
                  {user ? (
                    <h5>{user.username}</h5>
                  ) : (
                    <Link href="/users/register">
                      <a className="nav-link">Sign Up</a>
                    </Link>
                  )}
                </Nav.Item>

                <Nav.Item>
                  {user ? (
                    <Link href="/">
                      <a
                        className="nav-link"
                        onClick={() => {
                          logout();
                          setUser(null);
                        }}
                      >
                        Logout
                      </a>
                    </Link>
                  ) : (
                    <Link href="/users/login">
                      <a className="nav-link">Sign In</a>
                    </Link>
                  )}
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <style jsx>
        {`
          a {
            color: white;
          }
          h5 {
            color: white;
            padding-top: 11px;
          }
        `}
      </style>
      <Container>{props.children}</Container>
    </div>
  );
}

export default Layout;
