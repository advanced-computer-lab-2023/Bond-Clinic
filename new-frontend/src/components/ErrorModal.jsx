import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ErrorModal = () => {
  const [show, setShow] = useState(false);
  const handleErrorClose = () => {
    setShow(false);
  };
  return (
    <>
      <Modal show={show} onHide={handleErrorClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sorry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          We are sorry but it appears that you have encountered an error.
          <br />
          Please check your and try again!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleErrorClose}>
            Close
          </Button>
          <Button variant="error" onClick={handleErrorClose}>
            Try again
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ErrorModal;
