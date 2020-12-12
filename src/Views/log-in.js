import { useDispatch } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function LoginPage() {
  let history = useHistory();

  const dispatch = useDispatch();
  return (
    <Container>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                dispatch({ type: "SET_STUDENT", payload: "öğrencitokeni" });
                history.entries = [];
                history.index = -1;
                history.push("/student/home");
              }}
            >
              Öğrenci
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                dispatch({ type: "SET_COMMISSION", payload: "hocatokeni" });
                history.entries = [];
                history.index = -1;
                history.push("/commission/home");
              }}
            >
              Hoca
            </Button>
          </Form>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  );
}
