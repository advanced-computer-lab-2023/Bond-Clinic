import React from "react";
import '../styles/packages.css'
import UpdateDoctorForm from "../components/updatedoctor.js";
import DoctorPatientsTable from "../components/doctorpatientstable";
import DoctorAppointmentsTable from "../components/doctorappointments";
import LogoutButton from "../components/LogoutButton.js";
import {  useNavigate, Link} from 'react-router-dom';
import ChangePasswordForm from "../components/ChangePasswordForm";
import ViewContract from "../components/ViewContract";
import handleAddTimeSlot from "../pages/admin";

export default function Doctor(){

return (
    
    <main>
        <LogoutButton/>
    <div><UpdateDoctorForm/></div>
    <div><DoctorPatientsTable/></div>
    <div><DoctorAppointmentsTable/></div>
    <div className="select-buttons">
                    <button className="button-78" onClick={handleAddTimeSlot}>
                        Add Time Slot
                    </button>
                </div>
    <div>
      <ViewContract/>
    </div>
    
    <Link to="/doctor/wallet" className="button">
            Wallet
          </Link>
        <ChangePasswordForm/>
    </main>
)
}