import React, { useState } from "react";
import "../styles/doctor.css";

function DoctorPatientsTable() {
  const [username, setUsername] = useState("");
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
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
      setSelectedPatient(null); // Clear the selected patient
    } else {
      const json = await response.json();
      setError(await json.error);
      setPatients([]);
      setSelectedPatient(null); // Clear the selected patient
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
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
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient._id} onClick={() => handleSelectPatient(patient)}>
                  <td>{patient.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedPatient && (
        <div className="user-details">
          <h2>Patient Details</h2>
          <p><strong>Name:</strong> {selectedPatient.name}</p>
          <p><strong>Username:</strong> {selectedPatient.username}</p>
          <p><strong>Phone Number:</strong> {selectedPatient.phoneNumber}</p>
          <p><strong>Password:</strong> {selectedPatient.password}</p>
          <p><strong>Gender:</strong> {selectedPatient.gender}</p>
          <p><strong>Emergency Name:</strong> {selectedPatient.emergencyFullName}</p>
          <p><strong>Emergency Phone Number:</strong> {selectedPatient.emergencyPhoneNumber}</p>
        </div>
      )}
    </>
  );
}

export default DoctorPatientsTable;