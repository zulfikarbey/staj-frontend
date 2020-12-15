import React, { useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Accordion,
  Alert,
  Row,
  Col,
} from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";

import { getStudentListFromApi } from "../../redux/Modules/StudentList/studentlist";
import {
  getInternshipList,
  addInternshipToOneStudent,
  updateInternshipToOneStudent,
  addSubListItemToOneInternship,
  updateSubListItemToOneInternship,
} from "../../redux/Modules/InternshipList/internshiplist";

export default function Internship() {
  const studentlist = useSelector((state) => state.studentlist);
  const internshiplist = useSelector((state) => state.internshiplist);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (studentlist.length === 0) {
      dispatch(getStudentListFromApi(auth.token));
    }
    dispatch(getInternshipList(auth.token));
  }, []);

  return (
    <Container>
      <Alert variant={"secondary"}>selamın aleyküm muhterem hocam</Alert>
      <Accordion>
        {studentlist.map((studentitem, id) => (
          <Card key={id}>
            <Card.Header>
              <Row>
                <Col md={10}>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey={id + 1}
                  >
                    {studentitem.name}
                  </Accordion.Toggle>
                </Col>
                <Col md={2}>
                  <Button
                    onClick={() => {
                      dispatch(
                        addInternshipToOneStudent(auth.token, {
                          title: "2014 yaz stajı",
                          studentID: studentitem._id,
                          subList: [
                            {
                              title: "başvuru belgesi gönderme",
                              status: "beklemede",
                              buttonsStatus: false,
                              attachments: [],
                            },
                            {
                              title: "staj defteri gönderme",
                              status: "beklemede",
                              buttonsStatus: false,
                              attachments: [],
                            },
                          ],
                        })
                      );
                    }}
                    size={"sm"}
                  >
                    Staj Ekle
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Accordion.Collapse eventKey={id + 1}>
              <Card.Body>
                {internshiplist.map((internitem, internid) => {
                  if (internitem.studentID === studentitem._id) {
                    return (
                      <Accordion>
                        <Card>
                          <Card.Header>
                            <Row>
                              <Col md={9}>
                                <Accordion.Toggle
                                  as={Button}
                                  variant="dark"
                                  eventKey={internid + 1}
                                >
                                  {internitem.title}
                                </Accordion.Toggle>
                              </Col>
                              <Col md={3}>
                                <Button
                                  onClick={() =>
                                    dispatch(
                                      updateInternshipToOneStudent(auth.token, {
                                        internshipID: internitem._id,
                                        studentID: studentitem._id,
                                        title: "güncellenmiş staj adı",
                                      })
                                    )
                                  }
                                  size={"sm"}
                                >
                                  Düzenle
                                </Button>{" "}
                                <Button
                                  onClick={() =>
                                    dispatch(
                                      addSubListItemToOneInternship(
                                        auth.token,
                                        {
                                          internshipID: internitem._id,
                                          studentID: studentitem._id,
                                          title: "başvuru belgesi gönderme",
                                          status: "beklemede",
                                          buttonsStatus: false,
                                          attachments: [],
                                        }
                                      )
                                    )
                                  }
                                  size={"sm"}
                                >
                                  Evrak Alanı Ekle
                                </Button>
                              </Col>
                            </Row>
                          </Card.Header>
                          <Accordion.Collapse eventKey={internid + 1}>
                            <Card.Body>
                              {internitem.subList.map(
                                (sublistitem, sublistid) => {
                                  return (
                                    <Alert variant="success">
                                      <Alert.Heading>
                                        {sublistitem.title}
                                      </Alert.Heading>
                                      <Row>
                                        <Col md={10}>{sublistitem.status}</Col>
                                        <Col md={2}>
                                          <Button
                                            onClick={() =>
                                              dispatch(
                                                updateSubListItemToOneInternship(
                                                  auth.token,
                                                  {
                                                    _id: sublistitem._id,
                                                    internshipID:
                                                      internitem._id,
                                                    title: "aliveli",
                                                    status: "OOOOOOOOOOO",
                                                    buttonsStatus: true,
                                                    attachments: [],
                                                  }
                                                )
                                              )
                                            }
                                            size={"sm"}
                                          >
                                            Düzenle
                                          </Button>
                                        </Col>
                                      </Row>
                                    </Alert>
                                  );
                                }
                              )}
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                    );
                  }
                })}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </Container>
  );
}
