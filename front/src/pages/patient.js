import '../styles/doctor.css'
import { Link } from "react-router-dom";
export default function Patient(){

    return(      
      <>

<div  className="Upper-Section">
        {/* Add a form for adding a new family member */}
        <form onSubmit={handleSubmit}>
        <h2>Add a New Family Member</h2>
          
        <label>Your Username:</label>
          <input
            type="text"
            name="username"
            value={newFamilyMember.username}
            onChange={handleInputChange}
          />

          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newFamilyMember.name}
            onChange={handleInputChange}
          />

          <label>National ID:</label>
          <input
            type="text"
            name="nationalID"
            value={newFamilyMember.nationalID}
            onChange={handleInputChange}
          />

          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={newFamilyMember.age}
            onChange={handleInputChange}
          />

          <label>Gender:</label>
          <select
            name="gender"
            onChange={handleInputChange}
            value={newFamilyMember.gender}
          >
            <option  value="male">Male</option>
            <option  value="female">Female</option>
          </select>

          <label>Relation to Patient:</label>
          <select
            name="relationToPatient"
            onChange={handleInputChange}
            value={newFamilyMember.relationToPatient}
          >
            <option value="wife">Wife</option>
            <option value="husband">Husband</option>
            <option value="child">Child</option>
          </select>

          <button type="submit" className="button-78">Add Family Member</button>
        </form>
        {message && <div className="Message"  >{message} </div>}
=======
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
    