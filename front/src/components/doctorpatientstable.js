import React, { useState } from "react";
import "../styles/doctor.css";

function DoctorPatientsTable() {
  const [username, setUsername] = useState("");
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFetchPatients = async () => {
    // Make an API request to fetch family members based on the entered username
    const response = await fetch("http://localhost:4000/api/doctor/getpatients/" + username, {
      method: "GET",
    });

    if (response.ok) {
      setError("");
      setPatients(await response.json());
    } else {
      const json = await response.json();
      setError(await json.error);
      setPatients([]);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter patients based on the search query
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="input-section">
        <label>Doctor's Username: </label>
        <input
          type="text"
          placeholder="Enter Doctor's Username"
          value={username}
          onChange={handleInputChange}
        />
        <button className="button-78" onClick={handleFetchPatients}>
          View Patients
        </button>
      </div>

      <div className="input-section">
        <label>Search Patients: </label>
        <input
          type="text"
          placeholder="Search Patients"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {error && <div className="error">{error}</div>}

      {filteredPatients.length > 0 && (
        <div className="user-table">
          <h2>Patients</h2>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Password</th>
                <th>Gender</th>
                <th>Emergency Name</th>
                <th>Emergency Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient.username}</td>
                  <td>{patient.name}</td>
                  <td>{patient.phoneNumber}</td>
                  <td>{patient.password}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.emergencyFullName}</td>
                  <td>{patient.emergencyPhoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default DoctorPatientsTable;
