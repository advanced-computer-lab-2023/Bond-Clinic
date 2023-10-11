import React from "react";
import '../styles/packages.css'
import UpdateDoctorForm from "../components/updatedoctor.js";
import DoctorPatientsTable from "../components/doctorpatientstable";

export default function Doctor(){

return (
    
    <main>

    <div><UpdateDoctorForm/></div>
    <div><DoctorPatientsTable/></div>

    </main>
)
}