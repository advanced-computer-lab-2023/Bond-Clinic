import Row from "react-bootstrap/Row";
import NavBar from "../../components/NavBar.jsx";
import { useParams } from "react-router-dom";
const AdminHome = () => {
  const { username } = useParams();
  return (
    <>
      <Row className="nav-bar">
        <NavBar></NavBar>
      </Row>
      <Row className="body">
        <h2 className="text">Welcome {username}!</h2>
      </Row>
    </>
  );
};

export default AdminHome;
