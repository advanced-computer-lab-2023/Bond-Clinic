import React, { useState, useEffect} from "react";
import axios from 'axios'
export default function Patient(){
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
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
    );
}
    