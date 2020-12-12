import React from "react";

import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";

export default function ListItem(props) {
  return (
    <ListGroup>
      <ListGroup.Item>{props.item.listTitle}</ListGroup.Item>
      {props.item.sublist.map((item) => (
        <ListGroup.Item
          action
          onDoubleClick={() => props.handleShow()}
          variant={item.status === "beklemede" ? "primary" : "secondary"}
        >
          <Container>
            <Row>
              <Col md={6}>{item.title}</Col>
              <Col md={4}>{item.status}</Col>
              <Col md={2}>
                {item.buttonsStatus ? (
                  <div>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => alert("yüklendi")}
                    >
                      Yükle
                    </Button>{" "}
                    <Button variant="outline-primary" size="sm">
                      Sil
                    </Button>{" "}
                  </div>
                ) : null}
              </Col>
            </Row>
          </Container>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
