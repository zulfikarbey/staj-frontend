import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Container, Card, Col, Row } from "react-bootstrap";

import { getStudentListFromApi } from "../../redux/Modules/StudentList/studentlist";
import { getInternshipList } from "../../redux/Modules/InternshipList/internshiplist";

export default function Home() {
  const studentlist = useSelector((state) => state.studentlist);
  const internshiplist = useSelector((state) => state.internshiplist);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (studentlist.length === 0) {
      dispatch(getStudentListFromApi(auth.token));
    }
    if (internshiplist.length === 0) {
      dispatch(getInternshipList(auth.token));
    }
  }, []);

  return (
    <Container>
      {internshiplist.map((item) =>
        item.subList.map((sublistitem) => {
          if (sublistitem.status === "beklemede") {
            return (
              <Card>
                <Card.Header>
                  <Row>
                    <Col md={10}>{sublistitem.title}</Col>
                    <Col md={2}>
                      {studentlist.map((studentitem) =>
                        studentitem._id === item.studentID
                          ? studentitem.name
                          : ""
                      )}
                    </Col>
                  </Row>
                </Card.Header>
              </Card>
            );
          }
        })
      )}
    </Container>
  );
}
