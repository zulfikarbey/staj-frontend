import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import { useDispatch } from "react-redux";

import React from "react";

export default function StudentLinks() {
  const dispatch = useDispatch();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>Öğrenci</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link className={"nav-link"} to="/student/home">
            Anasayfa
          </Link>
        </Nav>
        <Nav>
          <Link
            className={"nav-link"}
            to="/"
            onClick={() => dispatch({ type: "LOG_OUT" })}
          >
            Çıkış
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
