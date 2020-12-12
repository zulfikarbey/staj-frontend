import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import { useDispatch } from "react-redux";

import React from "react";

export default function StudentLinks() {
  const dispatch = useDispatch();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>Komisyon</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link className={"nav-link"} to="/commission/home">
            Anasayfa
          </Link>
          <Link className={"nav-link"} to="/commission/internship">
            Staj
          </Link>
          <Link className={"nav-link"} to="/commission/studentcrud">
            Öğrenci
          </Link>
          <Link className={"nav-link"} to="/commission/setting">
            ayarlar
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
