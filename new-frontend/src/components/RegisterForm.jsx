import { useState } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import DoctorModal from "./DoctorModal.jsx";
import PatientModal from "./PatientModal.jsx";

const RegisterForm = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    phoneNumber: "",
    hourlyRate: "",
    affiliation: "",
    educationBg: "",
    emergencyFullName: "",
    emergencyPhoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (props.type == "doctor")
    return (
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minBreakpoint="xxs"
      >
        <div className="card">
          <h3 className="card-title">Doctor Registration Form</h3>
          <Form className="card-body">
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Username"
                  className="mb-3"
                >
                  <Form.Control
                    name="username"
                    type="text"
                    placeholder="john"
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <Form.Text id="passwordHelpBlock" muted>
                    Your password must be 8-20 characters long, contain letters
                    and numbers, and must not contain spaces, special
                    characters, or emoji.
                  </Form.Text>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Date of birth"
                  className="mb-3"
                >
                  <Form.Control
                    name="dob"
                    type="date"
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Gender"
                  className="mb-3"
                >
                  <Form.Select
                    name="gender"
                    onChange={handleChange}
                    className="mb-3"
                  >
                    <option value="">Select your Gender</option>
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Phone Number"
                  className="mb-3"
                >
                  <Form.Control
                    name="phoneNumber"
                    type="tel"
                    placeholder="01xxxxxxxxx"
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Hourly Rate"
                  className="mb-3"
                >
                  <Form.Control
                    name="hourlyRate"
                    type="number"
                    placeholder="EGP"
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Enter your Affiliation"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="affiliation"
                    placeholder="Enter your Affiliation"
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Enter your Educational Background"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="educationBg"
                    placeholder="Cairo University"
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
              <Row>
                <DoctorModal data={formData}></DoctorModal>
              </Row>
            </Row>
          </Form>
        </div>
      </ThemeProvider>
    );
  else if (props.type == "patient")
    return (
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minBreakpoint="xxs"
      >
        <div className="card">
          <h2 className="card-title">Patient Registration Form</h2>
          <Form className="card-body">
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Username"
                  className="mb-3"
                >
                  <Form.Control
                    name="username"
                    type="text"
                    placeholder="john"
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <Form.Text id="passwordHelpBlock" muted>
                    Your password must be 8-20 characters long, contain letters
                    and numbers, and must not contain spaces, special
                    characters, or emoji.
                  </Form.Text>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Phone Number"
                  className="mb-3"
                >
                  <Form.Control
                    name="phoneNumber"
                    type="tel"
                    placeholder="01xxxxxxxxx"
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Date of birth"
                  className="mb-3"
                >
                  <Form.Control
                    name="dob"
                    type="date"
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Gender"
                  className="mb-3"
                >
                  <Form.Select
                    name="gender"
                    onChange={handleChange}
                    className="mb-3"
                  >
                    <option value="">Select your Gender</option>
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Emergency Contact Full Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Emergency"
                    name="emergencyFullName"
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Emergency Contact Phone Number"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Emergency"
                    name="emergencyPhoneNumber"
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <PatientModal data={formData}></PatientModal>
            </Row>
          </Form>
        </div>
      </ThemeProvider>
    );
};
export default RegisterForm;
