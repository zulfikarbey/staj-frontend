import React, { useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";

import ListItem from "./Components/list-item";

export default function HomeView() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const list = [
    {
      listTitle: "dönem1",
      sublist: [
        {
          title: "aliveli",
          status: "gönderin",
          buttonsStatus: true,
          attachments: [],
        },
        {
          title: "",
          status: "beklemede",
          buttonsStatus: false,
          attachments: [],
        },
      ],
    },
    {
      listTitle: "dönem2",
      sublist: [
        {
          title: "",
          status: "beklemede",
          buttonsStatus: false,
          attachments: [],
        },
        {
          title: "",
          status: "beklemede",
          buttonsStatus: false,
          attachments: [],
        },
      ],
    },
    {
      listTitle: "dönem3",
      sublist: [
        {
          title: "",
          status: "beklemede",
          buttonsStatus: false,
          attachments: [],
        },
        {
          title: "",
          status: "beklemede",
          buttonsStatus: false,
          attachments: [],
        },
      ],
    },
  ];

  return (
    <Container>
      <Row>
        <Col>
          {list.map((item) => (
            <ListItem item={item} handleShow={handleShow} />
          ))}

          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              evrak1
              <hr></hr>
              evrak2
              <hr></hr>
              evrak3
              <hr></hr>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}
