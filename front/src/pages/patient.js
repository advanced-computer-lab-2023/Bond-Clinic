import '../styles/doctor.css'
import { Link } from "react-router-dom";
export default function Patient(){

    return(      
      <>

<div  className="Upper-Section">
<div className="role-buttons">
    <h1 className='title'>Patient Home</h1>
    <Link to="/patient/appointments" className="button">
            Appointments
          </Link>
          <Link to="/patient/familymembers" className="button">
            Family Members
          </Link>
          <Link to="/patient/prescriptions" className="button">
            Prescriptions
          </Link>
          <Link to="/patient/doctors" className="button">
            Doctors
          </Link>
          </div>
      

      </div>
    </>
    );
}
    