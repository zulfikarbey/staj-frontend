import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Container,
  Card,
  Col,
  Row,
  Button,
  FormControl,
  Modal,
  InputGroup,
  Alert,
} from "react-bootstrap";

import { getStudentListFromApi } from "../../redux/Modules/StudentList/studentlist";
import {
  getInternshipList,
  updateSubListItemToOneInternship,
} from "../../redux/Modules/InternshipList/internshiplist";

export default function Home() {
  const studentlist = useSelector((state) => state.studentlist);
  const internshiplist = useSelector((state) => state.internshiplist);
  const auth = useSelector((state) => state.auth);

  const handleClose = () => {
    setShowdocument(false);
  };

  //add or update documentsarea
  const [doctitle, setDocTitle] = useState("");
  const [docstatus, setDocStatus] = useState("");
  const [docbuttons, setDocButtons] = useState(true);

  const [showdocument, setShowdocument] = useState(false);

  const [internshipID, setInternshipID] = useState("");
  const [sublistID, setSublistID] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (studentlist.length === 0) {
      dispatch(getStudentListFromApi(auth.token));
    }
    if (internshiplist.length === 0) {
      dispatch(getInternshipList(auth.token));
    }
  }, []);

  const handleUpdateSubListItemToOneInternship = (dt1, dt2) => {
    setDocTitle(dt1.title);
    setDocStatus(dt1.status);
    setDocButtons(dt1.buttonsStatus);

    setInternshipID(dt2._id);
    setSublistID(dt1._id);
    setShowdocument(true);
  };

  return (
    <Container>
      <Alert variant={"secondary"}>Değerlendirmeyi beklenen stajlar</Alert>
      {internshiplist.map((item) =>
        item.subList.map((sublistitem) => {
          if (sublistitem.status === "beklemede") {
            return (
              <Card>
                <Card.Header>
                  <Row>
                    <Col md={6}>{sublistitem.title}</Col>
                    <Col md={2}>
                      {sublistitem.attachments.map((item) => (
                        <a href={"http://localhost:3000" + item.path}>
                          {item.path}
                        </a>
                      ))}
                    </Col>
                    <Col md={2}>
                      {studentlist.map((studentitem) =>
                        studentitem._id === item.studentID
                          ? studentitem.name
                          : ""
                      )}
                    </Col>
                    <Col md={2}>
                      <Button
                        onClick={() =>
                          handleUpdateSubListItemToOneInternship(
                            sublistitem,
                            item
                          )
                        }
                      >
                        Değerlendir
                      </Button>
                    </Col>
                  </Row>
                </Card.Header>
              </Card>
            );
          }
        })
      )}

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
            <select
              value={docstatus}
              onChange={(e) => setDocStatus(e.target.value)}
            >
              <option value="gönderi bekleniyor">Gönderi bekleniyor</option>
              <option value="beklemede">Beklemede</option>
              <option value="tamamlandı">Tamamlandı</option>
              <option value="reddedildi">Reddedildi</option>
            </select>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>
                Öğrenci butonları kullanılınsın mı?
              </InputGroup.Text>
            </InputGroup.Prepend>

            <select
              value={docbuttons}
              onChange={(e) => setDocButtons(e.target.value)}
            >
              <option value="true">Görünsün</option>
              <option value="false">Görünmesin</option>
            </select>
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
              dispatch(
                updateSubListItemToOneInternship(auth.token, {
                  _id: sublistID,
                  internshipID: internshipID,
                  title: doctitle,
                  status: docstatus,
                  buttonsStatus: docbuttons,
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
