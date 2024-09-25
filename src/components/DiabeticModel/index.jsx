import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Grid, TextField, Button, Typography, Paper, CircularProgress, Box
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import './Predictor.module.css'; // Ensure this path is correct

function UserAccount() {
  const [inputData, setInputData] = useState({
    Pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    SkinThickness: '',
    Insulin: '',
    BMI: '',
    DiabetesPedigreeFunction: '',
    Age: ''
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false); // State for navbar toggle
  const [history, setHistory] = useState([]); // State for prediction history

  // Handle input changes
  const handleChange = (event) => {
    setInputData({ ...inputData, [event.target.id]: event.target.value });
  };

  // Handle form submission and send prediction request
  const handleSubmit = () => {
    // Ensure all fields are filled
    const isEmptyField = Object.values(inputData).some(field => field === '');
    if (isEmptyField) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    axios.post('http://localhost:5000/predict', inputData)
      .then(response => {
        setResult(response.data.result); // Expecting 'diabetic' or 'not diabetic'
        setLoading(false);
        fetchHistory(); // Fetch history after prediction
      })
      .catch(error => {
        console.error('Error predicting:', error);
        setLoading(false);
      });
  };

  // Fetch prediction history from backend
  const fetchHistory = () => {
    axios.get('http://localhost:5000/history')
      .then(response => {
        setHistory(response.data);
      })
      .catch(error => {
        console.error('Error fetching history:', error);
      });
  };

  // Fetch history on component mount
  useEffect(() => {
    fetchHistory();
  }, []);

  // Toggle navbar visibility
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
            <li><a  href="/userDiabeticHis">History</a></li>
            <li><a  href="/userAcc">Back</a></li>
            <li><a href="/home">Logout</a></li>
          </ul>
        </div>
        <div id="mobile" onClick={handleClick}>
          <i id="bar" className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </nav>

      <Container maxWidth="lg">
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold' }}>
            Diabetes Prediction
          </Typography>

          <form>
            <Grid container spacing={2}>
              {Object.keys(inputData).map((key) => (
                <Grid item xs={12} sm={6} key={key}>
                  <TextField
                    id={key}
                    label={key}
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={inputData[key]}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              ))}
            </Grid>

            <Box 
              display="flex" 
              justifyContent="center" 
              alignItems="center" 
              style={{ marginTop: '20px' }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{ padding: '10px 20px', fontSize: '16px', fontWeight: 'bold' }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Predict'}
              </Button>
            </Box>
          </form>

          {result && (
            <Paper elevation={2} style={{ padding: '20px', marginTop: '20px', textAlign: 'center' }}>
              {result === 'not diabetic' ? (
                <>
                  <CheckCircleIcon color="success" style={{ fontSize: 50 }} />
                  <Typography variant="h6" style={{ marginTop: '10px' }}>
                    The person is not diabetic
                  </Typography>
                </>
              ) : (
                <>
                  <ErrorIcon color="error" style={{ fontSize: 50 }} />
                  <Typography variant="h6" style={{ marginTop: '10px' }}>
                    The person is diabetic
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

export default UserAccount;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Container, Grid, TextField, Button, Typography, Paper, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box
// } from '@mui/material';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import ErrorIcon from '@mui/icons-material/Error';
// import './Predictor.module.css'; // Ensure this path is correct

// function UserAccount() {
//   const [inputData, setInputData] = useState({
//     Pregnancies: '',
//     Glucose: '',
//     BloodPressure: '',
//     SkinThickness: '',
//     Insulin: '',
//     BMI: '',
//     DiabetesPedigreeFunction: '',
//     Age: ''
//   });
//   const [result, setResult] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [clicked, setClicked] = useState(false); // State for navbar toggle
//   const [history, setHistory] = useState([]); // State for prediction history

//   const handleChange = (event) => {
//     setInputData({ ...inputData, [event.target.id]: event.target.value });
//   };

//   const handleSubmit = () => {
//     // Ensure all fields are filled
//     const isEmptyField = Object.values(inputData).some(field => field === '');
//     if (isEmptyField) {
//       alert('Please fill all fields');
//       return;
//     }

//     setLoading(true);
//     axios.post('http://localhost:5000/predict', inputData)
//       .then(response => {
//         setResult(response.data.result);
//         setLoading(false);
//         fetchHistory(); // Fetch history after prediction
//       })
//       .catch(error => {
//         console.error('Error predicting:', error);
//         setLoading(false);
//       });
//   };

//   const fetchHistory = () => {
//     axios.get('http://localhost:5000/history')
//       .then(response => {
//         setHistory(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching history:', error);
//       });
//   };

//   useEffect(() => {
//     fetchHistory(); // Fetch history on component mount
//   }, []);

//   const handleClick = () => {
//     setClicked(!clicked); // Toggle the navbar
//   };

//   return (
//     <>
//       <nav>
//         <a href="#">
//           <svg 
//             id="logo-15" 
//             width="49" 
//             height="48" 
//             viewBox="0 0 49 48" 
//             fill="none" 
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path 
//               d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z" 
//               className="ccustom" 
//               fill="#17CF97"
//             />
//             <path 
//               d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z" 
//               className="ccustom" 
//               fill="#17CF97"
//             />
//             <path 
//               d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z" 
//               className="ccustom" 
//               fill="#17CF97"
//             />
//             <path 
//               d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z" 
//               className="ccustom" 
//               fill="#17CF97"
//             />
//           </svg>
//         </a>
//         <div>
//           <ul id="navbar" className={clicked ? "active" : ""}>
//             <li><a className="active" href="/userDiabeticHis">History</a></li>
//             <li><a className="active" href="/userAcc">Back</a></li>
//             <li><a href="/home">Logout</a></li>
//           </ul>
//         </div>
//         <div id="mobile" onClick={handleClick}>
//           <i id="bar" className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
//         </div>
//       </nav>

//       <Container maxWidth="lg">
//         <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
//           <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold' }}>
//             Diabetes Prediction
//           </Typography>

//           <form>
//             <Grid container spacing={2}>
//               {Object.keys(inputData).map((key) => (
//                 <Grid item xs={12} sm={6} key={key}>
//                   <TextField
//                     id={key}
//                     label={key}
//                     type="number"
//                     variant="outlined"
//                     fullWidth
//                     value={inputData[key]}
//                     onChange={handleChange}
//                     InputLabelProps={{ shrink: true }}
//                   />
//                 </Grid>
//               ))}
//             </Grid>

//             <Box 
//               display="flex" 
//               justifyContent="center" 
//               alignItems="center" 
//               style={{ marginTop: '20px' }}
//             >
//               <Button
//                 variant="contained"
//                 color="primary"
//                 style={{ padding: '10px 20px', fontSize: '16px', fontWeight: 'bold' }}
//                 onClick={handleSubmit}
//                 disabled={loading}
//               >
//                 {loading ? <CircularProgress size={24} /> : 'Predict'}
//               </Button>
//             </Box>
//           </form>

//           {result && (
//             <Paper elevation={2} style={{ padding: '20px', marginTop: '20px', textAlign: 'center' }}>
//               {result === '0' ? (
//                 <>
//                   <CheckCircleIcon color="success" style={{ fontSize: 50 }} />
//                   <Typography variant="h6" style={{ marginTop: '10px' }}>
//                     The person is not diabetic
//                   </Typography>
//                 </>
//               ) : (
//                 <>
//                   <ErrorIcon color="error" style={{ fontSize: 50 }} />
//                   <Typography variant="h6" style={{ marginTop: '10px' }}>
//                     The person is diabetic
//                   </Typography>
//                 </>
//               )}
//             </Paper>
//           )}

//           {/* <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
//             <Typography variant="h5" align="center" gutterBottom style={{ fontWeight: 'bold' }}>
//               Prediction History
//             </Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Index</TableCell>
//                     <TableCell>Features</TableCell>
//                     <TableCell>Result</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {history.map((entry, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{index + 1}</TableCell>
//                       <TableCell>{`Pregnancies: ${entry.features[0]}, Glucose: ${entry.features[1]}, BloodPressure: ${entry.features[2]}, SkinThickness: ${entry.features[3]}, Insulin: ${entry.features[4]}, BMI: ${entry.features[5]}, DiabetesPedigreeFunction: ${entry.features[6]}, Age: ${entry.features[7]}`}</TableCell>
//                       <TableCell>{entry.result === 0 ? 'Not Diabetic' : 'Diabetic'}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper> */}
//         </Paper>
//       </Container>
//     </>
//   );
// }

// export default UserAccount;


