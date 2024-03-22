import { React } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Offcanvas,
  Dropdown,
} from "react-bootstrap";
import { Link, useSubmit } from "react-router-dom";
import { Person } from "@mui/icons-material";
import "./Header.css";

const Header = (props) => {
  const expand = "xxl";

  
  return (
    <Navbar
      key={expand}
      bg="#ffffff"
      expand={expand}
      className="mb-3 px-2 py-0"
      variant="#ffffff"
    >
      <Navbar.Brand
        href="#"
        className="fs-2 fw-bold d-flex justify-content-center"
      >
        {props.title}
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls={`offcanvasNavbar-expand-${expand}`}
        className=""
      />
      <Navbar.Offcanvas
        id={`offcanvasNavbar-expand-${expand}`}
        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
            Offcanvas
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form className="d-flex w-100">
            <FormControl
              type="search"
              placeholder="Search"
              aria-label="Search"
              className="search-field"
            />
          </Form>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown
              title="Dropdown"
              id={`offcanvasNavbarDropdown-expand-${expand}`}
            >
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<Person />} id="profile-dropdown" align={"end"}>
              <Nav.Link>Profile</Nav.Link>
              <Nav.Link>Settings</Nav.Link>
              <NavDropdown.Divider />
              <Nav.Link as={Link} to={"/logout"}>Logout</Nav.Link>
            </NavDropdown>
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Navbar>
  );
};

export default Header;
