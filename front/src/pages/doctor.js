import React from "react";
import '../styles/packages.css'
import UpdateDoctorForm from "../components/updatedoctor.js";
import DoctorPatientsTable from "../components/doctorpatientstable";
import DoctorAppointmentsTable from "../components/doctorappointments";
import LogoutButton from "../components/LogoutButton.js";

export default function Doctor(){

return (
    
    <main>
        <LogoutButton/>
    <div><UpdateDoctorForm/></div>
    <div><DoctorPatientsTable/></div>
    <div><DoctorAppointmentsTable/></div>

    </main>
)
}