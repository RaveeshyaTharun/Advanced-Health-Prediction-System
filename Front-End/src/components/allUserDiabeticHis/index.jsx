import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Button } from '@mui/material';
import { Print as PrintIcon } from '@mui/icons-material';
import './AA.css';

function PredictionHistory() {
  const [history, setHistory] = useState([]);
  const printRefs = useRef({});
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = () => {
    axios.get('http://localhost:5000/all_diabetic_history')
      .then(response => {
        setHistory(response.data);
      })
      .catch(error => {
        console.error('Error fetching history:', error);
      });
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  const fieldNames = [
    'Pregnancies',
    'Glucose Level',
    'Blood Pressure',
    'Skin Thickness',
    'Insulin Level',
    'Body Mass Index (BMI)',
    'Diabetes Pedigree Function',
    'Age'
  ];

  const handlePrint = (index) => {
    const printContent = printRefs.current[index];
    const printWindow = window.open('', '', 'width=800,height=600');
    
    if (printWindow) {
      printWindow.document.write('<html><head><title>Print</title></head><body>');
      printWindow.document.write(printContent.innerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    } else {
      alert("Unable to open print window. Please allow pop-ups for this website.");
    }
  };

  return (
    <>
      <nav>
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
            <li><a className="active" href="/userDiabeticHis">Diabetic History</a></li>
            <li><a  href="/admin">Back</a></li>
            <li><a href="/home">Logout</a></li>
          </ul>
        </div>
        <div id="mobile" onClick={handleClick}>
          <i id="bar" className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </nav>

      <Container maxWidth="lg">
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h5" align="center" gutterBottom style={{ fontWeight: 'bold' }}>
            Prediction History
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Index</TableCell>
                  <TableCell>Features</TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Print</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Box ref={(el) => (printRefs.current[index] = el)}>
                        {entry.features.map((value, idx) => (
                          <Typography key={idx} variant="body2">
                            <strong>{fieldNames[idx]}:</strong> {value}
                          </Typography>
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>{entry.result}</TableCell>
                    <TableCell>{new Date(entry.date).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outlined" 
                        color="primary" 
                        startIcon={<PrintIcon />} 
                        onClick={() => handlePrint(index)}
                      >
                        Print
                      </Button>
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
}

export default PredictionHistory;


