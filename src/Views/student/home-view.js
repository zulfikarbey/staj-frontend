import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import ListItem from "./Components/list-item";

import { useSelector, useDispatch } from "react-redux";

import {
  getStudentInternshipList,
  addStudentAttachmentToSublistItemUnderInternship,
} from "../../redux/Modules/InternshipList/studentinternshiplist";

export default function HomeView() {
  const internshiplist = useSelector((state) => state.internshiplist);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudentInternshipList(auth.token));
  }, []);

  function uploadfile(data) {
    dispatch(
      addStudentAttachmentToSublistItemUnderInternship(
        auth.token,
        data.data,
        data.ids
      )
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          {internshiplist.map((item) => (
            <ListItem item={item} uploadfile={uploadfile} />
          ))}
        </Col>
      </Row>
    </Container>
  );
}
