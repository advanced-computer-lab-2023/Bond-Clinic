import React from "react";
import { Space, Table } from "antd";
import { Snackbar, Alert } from "@mui/material";

export default function appointmentstable({ data,updateData }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [severity, setseverity] = React.useState("success");
  
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text, record) => <span>{formatDate(text)}</span>,
    },
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Slot",
      dataIndex: "slot",
      key: "slot",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Patient",
      dataIndex: "patient",
      key: "patient",
    },
    {
      title: "Action",
      key: "action",
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
            onClick={() => handlereschedule(record)}
          >
            Re-schedule
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              padding: 0,
              color: "#1677ff",
              cursor: "pointer",
            }}
            onClick={() => handlecancel(record)}
          >
            Cancel
          </button>
        </Space>
      ),
    },
  ];
  
  const handlereschedule = async (record) => {
    try {
      setSnackbarOpen(true);
      setseverity("success");
      setSnackbarMessage("Appointment Re-scheduled");        
      const currentDate = new Date(record.date);
      const nextWeek = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  
      // Format the next week date as a string
      const nextWeekDateString = `${nextWeek.getFullYear()}-${(nextWeek.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${nextWeek.getDate().toString().padStart(2, "0")}`;
  
        const index = data.findIndex((item) => item.date === record.date);

        // Update only the selected item in the parent component's state
        updateData((prevData) => {
          const newData = [...prevData];
          newData[index] = { ...newData[index], date: nextWeekDateString };
          return newData;
        });

     // window.location.reload();

    } catch (error) {
      setseverity("error");
      setSnackbarMessage("Error while accpting doctor \n "+error);        
      setSnackbarOpen(true);
    }
  };
  
  const handlecancel = async (record) => {
    try {
      const index = data.findIndex((item) => item.date === record.date);

      // Update only the selected item in the parent component's state
      updateData((prevData) => {
        const newData = [...prevData];
        newData[index] = { ...newData[index], status: "cancelled" };
        return newData;
      });

      setseverity("success");
      setSnackbarMessage("Appointment Cancelled");        
      setSnackbarOpen(true);
     
      
    } catch (error) {
      setseverity("error");
      setSnackbarMessage("Error while rejecting doctor \n "+error);        
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
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
  </>
  ); 
}
