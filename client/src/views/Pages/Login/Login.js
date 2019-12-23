import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Spinner
} from "reactstrap";
import { connect } from "react-redux";
import { LoginAction } from "../../../store/action";
import jumpTo from "../../../utils/navigation";

const Login = props => {
  const [values, setValues] = useState({
    email: "SirCumference@doe.com",
    password: "123456"
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  {props.login_loading && (
                    <Spinner
                      style={{ width: "3rem", height: "3rem" }}
                      color="info"
                    />
                  )}
                  <Form>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="email"
                        placeholder="Email"
                        autoComplete="off"
                        value={values.email}
                        onChange={handleChange("email")}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Password"
                        autoComplete="off"
                        value={values.password}
                        onChange={handleChange("password")}
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button
                          color="primary"
                          className="px-4"
                          onClick={() =>
                            props.handleFormSubmit(
                              values.email,
                              values.password,
                              props
                            )
                          }
                        >
                          Login
                        </Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">
                          Forgot password?
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = state => ({
  login_loading: state.login.token_loading,
  login_error: state.login.error
});

const mapDispatchToProps = dispatch => {
  return {
    handleFormSubmit: (email, password) => {
      dispatch(LoginAction(email, password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
