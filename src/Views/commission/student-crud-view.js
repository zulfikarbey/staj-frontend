import React, { useState, useEffect } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import { getStudentListFromApi } from "../../redux/Modules/StudentList/studentlist";

import {
  ListGroup,
  Container,
  Row,
  Col,
  Button,
  Modal,
  InputGroup,
  FormControl,
} from "react-bootstrap";

export default function StudentCrud() {
  const studentlist = useSelector((state) => state.studentlist);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(getStudentListFromApi(auth.token));
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function getDays(date) {
    var now = moment(new Date()); //todays date
    var end = moment(date); // another date
    var duration = moment.duration(now.diff(end));
    var days = duration.asYears();
    return Math.ceil(days);
  }

  return (
    <Container>
      <ListGroup>
        <ListGroup.Item>Öğrenciler</ListGroup.Item>
        {studentlist.map((item) => (
          <ListGroup.Item action variant="light">
            <Row>
              {" "}
              <Col md={3}>No: {item.number}</Col>
              <Col md={3}>Adı: {item.name}</Col>
              <Col md={3}>Sınıfı: {getDays(item.registerDate)} </Col>
              <Col md={3}>
                <Button size={"sm"} onClick={() => handleShow()}>
                  Düzenle
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <button onClick={() => console.log("ekledim")}>Ekle</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Öğrenci</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Numarası</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Ad soyad</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>e-mail</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Kayıt Tarihi</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl />
          </InputGroup>
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
    </Container>
  );
}
