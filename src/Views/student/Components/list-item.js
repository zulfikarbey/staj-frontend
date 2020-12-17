import React from "react";

import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Dropdown,
} from "react-bootstrap";

export default function ListItem(props) {
  return (
    <ListGroup>
      <ListGroup.Item>{props.item.title}</ListGroup.Item>
      {props.item.subList.map((item) => (
        <ListGroup.Item
          action
          variant={item.status === "beklemede" ? "primary" : "secondary"}
        >
          <Container>
            <Row>
              <Col md={7}>{item.title}</Col>
              <Col md={2}>{item.status}</Col>
              <Col md={3}>
                <Row>
                  <Col>
                    {" "}
                    {item.buttonsStatus === "true" ? (
                      <input
                        type="file"
                        name="avatar"
                        multiple
                        onChange={(e) =>
                          props.uploadfile({
                            data: e,
                            ids: {
                              internID: props.item._id,
                              sublistitemID: item._id,
                            },
                          })
                        }
                      />
                    ) : null}{" "}
                  </Col>
                  <Col>
                    <Dropdown>
                      <Dropdown.Toggle
                        size={"sm"}
                        variant="success"
                        id="dropdown-basic"
                      >
                        Dosyalar
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {item.attachments.map((file) => (
                          <Dropdown.Item
                            href={"http://localhost:3000" + file.path}
                          >
                            {file.path}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
