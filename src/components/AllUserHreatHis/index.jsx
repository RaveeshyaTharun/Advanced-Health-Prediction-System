import React, { useEffect, useState } from 'react';
import './HeartDiseaseHistory.css';
import axios from 'axios';

import {
  Container, Paper, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';

const UserHeartDiseaseHistory = () => {
  const [history, setHistory] = useState([]);
  const [clicked, setClicked] = useState(false); // State for navbar toggle

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/history-hearts-disease');
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching prediction history:', error);
      }
    };

    fetchHistory();
  }, []);

  const handleClick = () => {
    setClicked(!clicked); // Toggle the navbar
  };

  // Function to format the date and time in Sri Lanka's time zone
  const formatDateTime = (dateString) => {
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Colombo',
      timeZoneName: 'short'
    }).format(new Date(dateString));
  };

  return (
    <>
      <nav className="navbar-admin">
        <a href="#">
        <svg xmlns="#" 
	          width="40"
	          height="40" fill="none" 
	          viewBox="0 0 40 40">
	          <path fill="#F06225" d="M20 0c11.046 0 20 8.954 20 20v14a6 6 0 0 1-6 6H21v-8.774c0-2.002.122-4.076 1.172-5.78a10 10 0 0 1 6.904-4.627l.383-.062a.8.8 0 0 0 0-1.514l-.383-.062a10 10 0 0 1-8.257-8.257l-.062-.383a.8.8 0 0 0-1.514 0l-.062.383a9.999 9.999 0 0 1-4.627 6.904C12.85 18.878 10.776 19 8.774 19H.024C.547 8.419 9.29 0 20 0Z"></path>
	          <path fill="#F06225" d="M0 21h8.774c2.002 0 4.076.122 5.78 1.172a10.02 10.02 0 0 1 3.274 3.274C18.878 27.15 19 29.224 19 31.226V40H6a6 6 0 0 1-6-6V21ZM40 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path>
          </svg>
        </a>
        <div>
          <ul id="navbar" className={clicked ? "active" : ""}>
            <li><a className="active" href="/admin">Back</a></li>
            <li><a href="/login">Log Out</a></li>
          </ul>
        </div>
        <div id="mobile" onClick={handleClick}>
          <i id="bar" className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </nav>
      <Container maxWidth="lg">
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold' }}>
            Prediction History
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Date & Time (Sri Lanka)</strong></TableCell> {/* Updated header */}
                  <TableCell align="center">Age</TableCell>
                  <TableCell align="center">Sex</TableCell>
                  <TableCell align="center">Chest Pain Type</TableCell>
                  <TableCell align="center">Resting BP</TableCell>
                  <TableCell align="center">Cholesterol</TableCell>
                  <TableCell align="center">Fasting Blood Sugar</TableCell>
                  <TableCell align="center">Resting ECG</TableCell>
                  <TableCell align="center">MaxHR</TableCell>
                  <TableCell align="center">Exercise Angina</TableCell>
                  <TableCell align="center">Oldpeak</TableCell>
                  <TableCell align="center">ST Slope</TableCell>
                  <TableCell align="center">CA</TableCell>
                  <TableCell align="center">Thal</TableCell>
                  <TableCell align="center">Result</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{formatDateTime(record.date)}</TableCell> {/* Formatted Date & Time */}
                    <TableCell align="center">{record.features.Age}</TableCell>
                    <TableCell align="center">{record.features.Sex === '1' ? 'Male' : 'Female'}</TableCell>
                    <TableCell align="center">{record.features.ChestPainType}</TableCell>
                    <TableCell align="center">{record.features.RestingBP}</TableCell>
                    <TableCell align="center">{record.features.Cholesterol}</TableCell>
                    <TableCell align="center">{record.features.FastingBS}</TableCell>
                    <TableCell align="center">{record.features.RestingECG}</TableCell>
                    <TableCell align="center">{record.features.MaxHR}</TableCell>
                    <TableCell align="center">{record.features.ExerciseAngina}</TableCell>
                    <TableCell align="center">{record.features.Oldpeak}</TableCell>
                    <TableCell align="center">{record.features.ST_Slope}</TableCell>
                    <TableCell align="center">{record.features.ca}</TableCell>
                    <TableCell align="center">{record.features.thal}</TableCell>
                    <TableCell align="center">
                      {record.result === '0' ? 'No Heart Disease' : 'Heart Disease Detected'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
};

export default UserHeartDiseaseHistory;

