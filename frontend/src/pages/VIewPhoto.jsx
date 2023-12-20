import React from "react";
import { useLocation, useParams } from "react-router-dom";

import image1 from "../images/doctors/1702611267807-315153928-medical1.png";
import image2 from "../images/doctors/1702611267811-203727448-medical2.jpg";
import image3 from "../images/doctors/1702611267812-91768319-medical3.png";
const ViewPhoto = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const url = queryParams.get("url");
  console.log(url);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ alignSelf: "center" }}>Medical ID</h2>
        <img height="200px" src={image1} alt="documents" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "50px",
        }}
      >
        <h2 style={{ alignSelf: "center" }}>Medical Licenses</h2>
        <img height="200px" src={image2} alt="documents" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ alignSelf: "center" }}>Medical Degree</h2>
        <img height="200px" src={image3} alt="documents" />
      </div>
    </div>
  );
};

export default ViewPhoto;
