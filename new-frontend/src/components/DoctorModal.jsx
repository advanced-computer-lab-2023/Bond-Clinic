import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function RegistrationModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    window.location.assign("/doctor/home");
  };
  const handleShow = async () => {
    console.log(props.data);
    const response = await fetch("http://localhost:4000/api/doctor", {
      method: "POST",
      body: JSON.stringify(props.data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (response.ok) {
      setShow(true);
    } else {
      alert(json.error);
    }
  };
  return (
    <>
      <Button
        className="card-button"
        variant="primary"
        onClick={handleShow}
        size="lg"
      >
        Submit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thank You</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Thank you for registering in El7a2ni Virtual Clinic.
          <br />
          We will check your application and contact you as soon as possible.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default RegistrationModal;
