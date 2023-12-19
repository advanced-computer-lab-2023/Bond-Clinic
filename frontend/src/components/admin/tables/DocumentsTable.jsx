import React from "react";
import { Space, Table } from "antd";
import { Snackbar, Alert } from "@mui/material";

export default function DocumentsTable({ data }) {

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [severity, setseverity] = React.useState("success");
  
  const columns = [
    {
        title: "Name",
        dataIndex: "name",
        key:'name'
    },
    {
      title: "ID",
      dataIndex: "medicalId",
      key: "medicalId",
      render: (key) => (
        <Space size="middle">
          <button
            style={{
              background: "none",
              border: "none",
              padding: 0,
              color: "#1677ff",
              cursor: "pointer",
            }}
            onClick={() => handleClick(key)}
          >
            View
          </button>
        </Space>
      ),
    },
    {
      title: "Medical Licenses",
      dataIndex: "medicalLicense",
      key: "medicalLicense",
      render: (key) => (
        <Space size="middle">
          <button
            style={{
              background: "none",
              border: "none",
              padding: 0,
              color: "#1677ff",
              cursor: "pointer",
            }}
            onClick={() => handleClick(key)}
          >
            View
          </button>
        </Space>
      ),
    },
    {
      title: "Medical Degree",
      dataIndex: "medicalDegree",
      key: "medicalDegree",
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
            onClick={() => handleClick(record)}
          >
            View
          </button>
        </Space>
      ),
    },
  ];
  const handleClick = async (record) => {
    console.log(record)
        window.open("../../viewphoto?url="+record.requiredDocuments.medicalDegree);
    }
      
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Table columns={columns} dataSource={data} />
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
  </>
  ); 
}
