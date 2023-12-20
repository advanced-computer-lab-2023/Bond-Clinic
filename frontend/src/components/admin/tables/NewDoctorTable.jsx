import React from "react";
import { Space, Table } from "antd";
import { Snackbar, Alert } from "@mui/material";

export default function NewDoctorTable({ data }) {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [severity, setseverity] = React.useState("success");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Hourly Rate (EGP)",
      dataIndex: "hourlyRate",
      key: "hourlyRate",
    },
    {
      title: "Affiliation",
      dataIndex: "affiliation",
      key: "affiliation",
    },
    {
      title: "Educational Background",
      dataIndex: "educationBg",
      key: "eduacationBg",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <button
            style={{
              background: "none",
              border: "none",
              padding: 0,
              color: "#1677ff",
              cursor: "pointer",
            }}
            onClick={() => handleAccept(record)}
          >
            Accept
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              padding: 0,
              color: "#1677ff",
              cursor: "pointer",
            }}
            onClick={() => handleReject(record)}
          >
            Reject
          </button>
        </Space>
      ),
    },
    {
      title: "Documents",
      dataIndex: "documents",
      key: "documents",
      render: (text, record) => (
        <Space size="middle">
          <button
            style={{
              background: "none",
              border: "none",
              padding: 0,
              color: "#1677ff",
              cursor: "pointer",
            }}
            onClick={() => {
              handleClick(record);
            }}
          >
            View
          </button>
        </Space>
      ),
    },
  ];

  const handleClick = async (record) => {
    window.open("../../viewphoto?url=" + record.requiredDocuments.medicalId);
  };

  const handleAccept = async (record) => {
    try {
      console.log(record.username);
      const response = await fetch(
        "http://localhost:4000/api/admin/accept-doctor-register/" +
          record.username,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: `include`,
        }
      );

      const data = await response.json();
      if (response.ok) {
        setseverity("success");
        setSnackbarMessage(
          "Doctor " + record.username + " Accepted Successfuly !"
        );
        setSnackbarOpen(true);
        window.location.reload();
      }
      if (!response.ok) {
        setseverity("error");
        setSnackbarMessage("Error while accpting doctor \n " + data.error);
        setSnackbarOpen(true);
      }
    } catch (error) {
      setseverity("error");
      setSnackbarMessage("Error while accpting doctor \n " + error);
      setSnackbarOpen(true);
    }
  };

  const handleReject = async (record) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/admin/reject-doctor-register/" +
          record.username,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: `include`,
        }
      );

      const data = await response.json();
      if (response.ok) {
        setseverity("success");
        setSnackbarMessage(
          "Doctor " + record.username + " rejected Successfuly !"
        );
        setSnackbarOpen(true);
        window.location.reload();
      }
      if (!response.ok) {
        setseverity("error");
        setSnackbarMessage("Error while rejecting doctor \n " + data.error);
        setSnackbarOpen(true);
      }
    } catch (error) {
      setseverity("error");
      setSnackbarMessage("Error while rejecting doctor \n " + error);
      setSnackbarOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Table columns={columns} dataSource={data} />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
