import React from "react";
import { useLocation, useParams } from "react-router-dom";

import image1 from "../images/doctors/1702611267807-315153928-medical1.png";

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
      }}
    >
      <img height="200px" src={image1} alt="documents" />
    </div>
  );
};

export default ViewPhoto;
