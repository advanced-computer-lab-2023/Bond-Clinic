import React, { useState, useEffect} from "react";
import axios from 'axios'
import '../styles/doctor.css'
export default function Patient(){
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState("");
    const [newFamilyMember, setNewFamilyMember] = useState({
      username:"",
      name: "",
      nationalID: "",
      age: "",
      gender: "male",
      relationToPatient: "child", 
    });
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewFamilyMember({
        ...newFamilyMember,
        [name]: value,
      });
    };


    const handleSubmit = (e) => {
      e.preventDefault();
  

      if(newFamilyMember.age==="" || newFamilyMember.gender===""||newFamilyMember.relationToPatient===""
         || newFamilyMember.username===""||newFamilyMember.nationalID===""){
          return setMessage('All Fields MUST be Input')
         }


      // Send a PATCH request to your backend API to add the new family member
      axios
        .patch("http://localhost:4000/api/patient/addfamily", newFamilyMember) // Replace with the actual API endpoint
        .then((response) => {
          // Handle the response as needed
          console.log("New family member added:", response.data);
          setMessage(response.data.familyMembers.pop().name+" Has been added successfully")
          // Clear the form input fields
      setNewFamilyMember({
        username:"",
        name: "",
        nationalID: "",
        age: "",
        gender: "male",
        relationToPatient: "child", // Reset the relation field
      });
          // You can also update the 'users' state to reflect the changes if needed
        })
        .catch((error) => {
          console.error("Error adding family member:", error);
          setMessage("Error while adding family member")
        });
  
      
    };



    const handleUserClick = (user) => {
        setSelectedUser(user);
      };
    useEffect(() => {
        // Fetch user data from your backend API
        axios
          .get("http://localhost:4000/api/doctor") // Replace '/api/users' with the actual API endpoint
          .then((response) => {
            setUsers(response.data);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      }, []);
    return(      
      <>

<div>
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
      </div>


      



        <div>
      <h2 className="table-name">Doctor List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Phone Number</th>
            <th>Hourly Rate</th>
            <th>Affiliation</th>
            <th>Educational Background</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              onClick={() => handleUserClick(user)}
              className={`user-row ${selectedUser === user ? 'selected' : ''}`}
            >
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.dob}</td>
              <td>{user.gender}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.hourlyRate}</td>
              <td>{user.affiliation}</td>
              <td>{user.educationBg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
    );
}
    