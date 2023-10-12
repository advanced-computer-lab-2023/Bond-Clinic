import React, { useState } from "react";

function FamilyMembersTable() {
  const [username, setUsername] = useState("");
  const [familyMembers, setFamilyMembers] = useState([]);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFetchFamilyMembers = async () => {
    // Make an API request to fetch family members based on the entered username
    try {
        const response = await fetch("http://localhost:4000/api/patient/getfamily/"+username, {
          method: "GET",
        });
  
        if (response.ok) {
          setError("");
        setFamilyMembers(await response.json())
        console.log(familyMembers)
           
        } else {
          const data = await response.json();
          setError(data.error || "User NOT Found");
          setFamilyMembers([])
        }
      } catch (error) {
        console.error("Error updating doctor:", error);
        setError("An error occurred while Getting Family Members.");
      }
  };

  return (
    <>
      <div className="input-section">
        <label >Patient UserName : </label>
        <input
          type="text"
          placeholder="Enter Patient's Username"
          value={username}
          onChange={handleInputChange}
        />
        <button className="button-78" onClick={handleFetchFamilyMembers}>View Family Members</button>
      </div>

      {error && <div className="error">{error}</div>}

      {familyMembers.length > 0 && (
        <div className="user-table">
          <h2>Family Members</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>National ID</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Relation to Patient</th>
              </tr>
            </thead>
            <tbody>
              {familyMembers.map((member) => (
                <tr key={member._id}>
                  <td>{member.name}</td>
                  <td>{member.nationalID}</td>
                  <td>{member.age}</td>
                  <td>{member.gender}</td>
                  <td>{member.relationToPatient}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default FamilyMembersTable;
