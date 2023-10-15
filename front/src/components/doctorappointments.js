import React, { useState, useEffect } from "react";

export default function DoctorAppointmentsTable() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch user's appointments from your backend API
    handleFetchAppointments();
  });

  const handleFetchAppointments = async () => {
    // Make an API request to fetch appointments for the patient
    const response = await fetch("http://localhost:4000/api/doctor/getappointments/" + username, {
      method: "GET",
    });

    if (response.ok) {
      setAppointments(await response.json());
    } else {
      setAppointments([]);
    }
  };

  const handleFilterAppointments = () => {
    // Filter appointments based on selected date range and status
    const filtered = appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      
      if (
        (!startDate || !endDate || (startDateObj <= appointmentDate && appointmentDate <= endDateObj)) &&
        (!selectedStatus || appointment.status === selectedStatus)
      ) {
        return true;
      }
      return false;
    });

    setFilteredAppointments(filtered);
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <>
      <div className="input-section">
        <label>Doctor UserName: </label>
        <input
          type="text"
          placeholder="Enter Doctor's Username"
          value={username}
          onChange={handleInputChange}
        />
        <button className="button-78" onClick={handleFetchAppointments}>Get Appointments</button>
      </div>

      <div>
        <h2>Appointments</h2>
        <label>Filter by Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>Filter by End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <label>Filter by Status:</label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </select>
        <button className="button-78" onClick={handleFilterAppointments}>View Appointments</button>
        <button className="button-78" onClick={handleFetchAppointments}>Reset Filters</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Doctor</th>
            {/* Add other appointment-related columns here */}
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.length > 0
            ? filteredAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.date}</td>
                  <td>{appointment.status}</td>
                  <td>{appointment.doctor}</td>
                  {/* Add other appointment-related fields here */}
                </tr>
              ))
            : (
              <tr>
                <td colSpan="3">No matching appointments found.</td>
              </tr>
            )}
        </tbody>
      </table>
    </>
  );
}
