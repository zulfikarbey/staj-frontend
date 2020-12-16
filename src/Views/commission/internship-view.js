import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Accordion,
  Alert,
  Row,
  Col,
  Modal,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";

import { getStudentListFromApi } from "../../redux/Modules/StudentList/studentlist";
import {
  getInternshipList,
  addInternshipToOneStudent,
  updateInternshipToOneStudent,
  addSubListItemToOneInternship,
  updateSubListItemToOneInternship,
  addAttachmentToSublistItemUnderInternship,
} from "../../redux/Modules/InternshipList/internshiplist";

export default function Internship() {
  const studentlist = useSelector((state) => state.studentlist);
  const internshiplist = useSelector((state) => state.internshiplist);
  const auth = useSelector((state) => state.auth);

  //add or update internship
  const [internshipTitle, setInternshipTitle] = useState("");

  //add or update documentsarea
  const [doctitle, setDocTitle] = useState("");
  const [docstatus, setDocStatus] = useState("");
  const [docbuttons, setDocButtons] = useState(true);

  const [showinternship, setShowinternship] = useState(false);
  const [showdocument, setShowdocument] = useState(false);

  const [studentID, setStudentID] = useState("");
  const [internshipID, setInternshipID] = useState("");
  const [sublistID, setSublistID] = useState("");

  //ekleme mi düzenle mi?
  const [isAdd, setIsAdd] = useState(true);

  const handleClose = () => {
    setShowinternship(false);
    setShowdocument(false);
  };

  const handleAddInternshipToOneStudent = (data) => {
    setInternshipTitle("");
    setStudentID(data._id);
    setIsAdd(true);
    setShowinternship(true);
  };

  const handleUpdateInternshipToOneStudent = (data) => {
    setInternshipTitle(data.title);
    setStudentID(data.studentID);
    setInternshipID(data._id);
    setIsAdd(false);
    setShowinternship(true);
  };

  const handleAddSubListItemToOneInternship = (data) => {
    setDocTitle("");
    setDocStatus("");
    setDocButtons("");

    setStudentID(data.studentID);
    setInternshipID(data._id);
    setShowdocument(true);
    setIsAdd(true);
  };

  const handleUpdateSubListItemToOneInternship = (dt1, dt2) => {
    setDocTitle(dt1.title);
    setDocStatus(dt1.status);
    setDocButtons(dt1.buttonsStatus);

    setInternshipID(dt2._id);
    setSublistID(dt1._id);
    setShowdocument(true);
    setIsAdd(false);
  };

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
                      handleAddInternshipToOneStudent(studentitem);
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
                                  onClick={() => {
                                    handleUpdateInternshipToOneStudent(
                                      internitem
                                    );
                                  }}
                                  size={"sm"}
                                >
                                  Düzenle
                                </Button>{" "}
                                <Button
                                  onClick={() =>
                                    handleAddSubListItemToOneInternship(
                                      internitem
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
                                              handleUpdateSubListItemToOneInternship(
                                                sublistitem,
                                                internitem
                                              )
                                            }
                                            size={"sm"}
                                          >
                                            Düzenle
                                          </Button>
                                          <input
                                            type="file"
                                            name="avatar"
                                            multiple
                                            onChange={(e) =>
                                              dispatch(
                                                addAttachmentToSublistItemUnderInternship(
                                                  auth.token,
                                                  e,
                                                  {
                                                    internID: internitem._id,
                                                    sublistitemID:
                                                      sublistitem._id,
                                                  }
                                                )
                                              )
                                            }
                                          />
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
      <Modal show={showinternship} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Staj Ekle - Düzenle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Staj Başlığı</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={(e) => setInternshipTitle(e.target.value)}
              value={internshipTitle}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              isAdd
                ? dispatch(
                    addInternshipToOneStudent(auth.token, {
                      title: internshipTitle,
                      studentID: studentID,
                      subList: [
                        {
                          title: "Başvuru belgesi gönderme",
                          status: "beklemede",
                          buttonsStatus: true,
                          attachments: [],
                        },
                        {
                          title: "Staj defteri gönderme",
                          status: "beklemede",
                          buttonsStatus: true,
                          attachments: [],
                        },
                      ],
                    })
                  )
                : dispatch(
                    updateInternshipToOneStudent(auth.token, {
                      internshipID: internshipID,
                      studentID: studentID,
                      title: internshipTitle,
                    })
                  );

              handleClose();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showdocument}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Evrak alan adı</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={(e) => setDocTitle(e.target.value)}
              value={doctitle}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Statüsü</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={(e) => setDocStatus(e.target.value)}
              value={docstatus}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>
                Öğrenci butonları kullanılınsın mı?
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={(e) => setDocButtons(e.target.value)}
              value={docbuttons}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              isAdd
                ? dispatch(
                    addSubListItemToOneInternship(auth.token, {
                      internshipID: internshipID,
                      studentID: studentID,
                      title: doctitle,
                      status: docstatus,
                      buttonsStatus: docbuttons,
                      attachments: [],
                    })
                  )
                : dispatch(
                    updateSubListItemToOneInternship(auth.token, {
                      _id: sublistID,
                      internshipID: internshipID,
                      title: doctitle,
                      status: docstatus,
                      buttonsStatus: docbuttons,
                      attachments: [],
                    })
                  );
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
