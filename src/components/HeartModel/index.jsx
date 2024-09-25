import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Grid, TextField, Button, Typography, Paper, CircularProgress, Box, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import './app.css'; // Custom styling

function HeartDisease() {
  const [inputData, setInputData] = useState({
    Age: '',
    Sex: '', // This will be set to "Male" or "Female"
    ChestPainType: '',
    RestingBP: '',
    Cholesterol: '',
    FastingBS: '',
    RestingECG: '',
    MaxHR: '',
    ExerciseAngina: '',
    Oldpeak: '',
    ST_Slope: '',
    ca: '',  // Number of major vessels
    thal: '' // Thalassemia type
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [history, setHistory] = useState([]);

  const handleChange = (event) => {
    setInputData({ ...inputData, [event.target.id || event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    // Ensure all fields are filled
    const isEmptyField = Object.values(inputData).some(field => field === '');
    if (isEmptyField) {
      alert('Please fill all fields');
      return;
    }

    // Convert 'Sex' to numerical value: 'Male' -> 0, 'Female' -> 1
    const inputForPrediction = {
      ...inputData,
      Sex: inputData.Sex === 'Male' ? 0 : 1 // Convert Sex to expected numerical format
    };

    setLoading(true);
    axios.post('http://localhost:5000/predict-heart-disease', inputForPrediction)
      .then(response => {
        setResult(response.data.result);
        setLoading(false);
        fetchHistory(); // Fetch history after prediction
      })
      .catch(error => {
        console.error('Error predicting:', error);
        setLoading(false);
      });
  };

  const fetchHistory = () => {
    axios.get('http://localhost:5000/history-heart-disease')
      .then(response => {
        setHistory(response.data);
      })
      .catch(error => {
        console.error('Error fetching history:', error);
      });
  };

  useEffect(() => {
    fetchHistory(); // Fetch history on component mount
  }, []);

  const handleClick = () => {
    setClicked(!clicked); // Toggle the navbar
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
            <li><a className="active" href="/User-Heart-his">History</a></li>
            <li><a className="active" href="/userAcc">Back</a></li>
            <li><a href="/home">Logout</a></li>
          </ul>
        </div>
        <div id="mobile" onClick={handleClick}>
          <i id="bar" className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </nav>
      <Container maxWidth="md">
        <Paper elevation={5} className="form-container">
          <Typography variant="h3" align="center" gutterBottom className="title">
            Heart Disease Prediction
          </Typography>

          <form>
            <Grid container spacing={3}>
              {/* Dropdown for Sex */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Sex</InputLabel>
                  <Select
                    name="Sex"
                    value={inputData.Sex}
                    onChange={handleChange}
                    label="Sex"
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* Other fields */}
              {Object.keys(inputData).filter(key => key !== 'Sex').map((key) => (
                <Grid item xs={12} sm={6} key={key}>
                  <TextField
                    id={key}
                    label={key.replace(/([A-Z])/g, ' $1')}
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={inputData[key]}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    className="input-field"
                  />
                </Grid>
              ))}
            </Grid>

            <Box 
              display="flex" 
              justifyContent="center" 
              alignItems="center" 
              marginTop="20px"
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={loading}
                className="submit-button"
              >
                {loading ? <CircularProgress size={24} /> : 'Predict'}
              </Button>
            </Box>
          </form>

          {result && (
            <Paper elevation={3} className="result-box">
              {result === '0' ? (
                <>
                  <CheckCircleIcon color="success" style={{ fontSize: 50 }} />
                  <Typography variant="h6" className="result-text success-text">
                    No heart disease detected
                  </Typography>
                </>
              ) : (
                <>
                  <ErrorIcon color="error" style={{ fontSize: 50 }} />
                  <Typography variant="h6" className="result-text error-text">
                    Heart disease detected
                  </Typography>
                </>
              )}
            </Paper>
          )}
        </Paper>
      </Container>
    </>
  );
}

export default HeartDisease;