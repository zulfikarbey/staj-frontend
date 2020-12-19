import React, { useState, useEffect } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import {
  getStudentListFromApi,
  updateStudentToApi,
  addStudentToApi,
} from "../../redux/Modules/StudentList/studentlist";

import {
  ListGroup,
  Container,
  Row,
  Alert,
  Col,
  Button,
  Modal,
  InputGroup,
  FormControl,
  Spinner,
} from "react-bootstrap";

export default function StudentCrud() {
  const studentlist = useSelector((state) => state.studentlist);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const [_id, setId] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registerDate, setRegisterDate] = useState("");

  useEffect(() => {
    dispatch(getStudentListFromApi(auth.token));
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function addNewStudent() {
    setIsNew(true);
    setNumber("");
    setName("");
    setRegisterDate("");
    setEmail("");
    handleShow();
  }
  function updateExistStudent(_id, _number, _name, _email, _registerDate) {
    setIsNew(false);
    setId(_id);
    setNumber(_number);
    setName(_name);
    var date = moment(_registerDate).format("YYYY-MM-DD");
    setRegisterDate(date);
    setEmail(_email);
    handleShow();
  }

  function getDays(date) {
    var now = moment(new Date()); //todays date
    var end = moment(date); // another date
    var duration = moment.duration(now.diff(end));
    var days = duration.asYears();
    return Math.ceil(days);
  }

  return (
    <Container>
      <Alert variant={"secondary"}>
        <Button onClick={() => addNewStudent()}>Ekle</Button>
      </Alert>
      <ListGroup>
        <ListGroup.Item>Öğrenciler</ListGroup.Item>
        {studentlist.length === 0 ? (
          <center>
            Henüz öğrenci girişi yapılmadı
          </center>
        ) : (
          studentlist.map((item) => (
            <ListGroup.Item action variant="light">
              <Row>
                {" "}
                <Col md={3}>No: {item.number}</Col>
                <Col md={3}>Adı: {item.name}</Col>
                <Col md={3}>Sınıfı: {getDays(item.registerDate)} </Col>
                <Col md={3}>
                  <Button
                    size={"sm"}
                    onClick={() => {
                      updateExistStudent(
                        item._id,
                        item.number,
                        item.name,
                        item.email,
                        item.registerDate
                      );
                    }}
                  >
                    Düzenle
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Öğrenci</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Numarası</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={(e) => setNumber(e.target.value)}
              value={number}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Ad soyad</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>e-mail</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Kayıt Tarihi</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type={"date"}
              onChange={(e) => setRegisterDate(e.target.value)}
              value={registerDate}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              isNew
                ? dispatch(
                    addStudentToApi(auth.token, {
                      name: name,
                      email: email,
                      registerDate: registerDate,
                      number: number,
                    })
                  )
                : dispatch(
                    updateStudentToApi(auth.token, {
                      _id: _id,
                      name: name,
                      email: email,
                      registerDate: registerDate,
                      number: number,
                    })
                  );
              handleClose();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
