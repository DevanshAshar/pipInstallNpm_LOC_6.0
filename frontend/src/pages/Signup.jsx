import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { robot } from '../assets';
import './styles2.css'
import { Link, useNavigate } from 'react-router-dom';
import styles from "../style";
import { Navbar } from '../components';

const Signup = () => {
  const navigate = useNavigate();

  // State to store email and password
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // Function to update email and password in formData state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to handle sign-in button click
  const handleSignin = async () => {
    const response = await fetch('https://pipinstallnpm-loc-6-0.onrender.com/user/newUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password
      })
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log(data.message);
      navigate('/login');
    } else {
      console.error('Signup failed:', response.statusText);
    }
  }

  return (
    <div style={{backgroundColor: '#161724', minHeight: '100vh', overflow: 'auto'}}>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
            <Navbar />
        </div>
        </div>
    <Box display='flex' height='80vh' >
      <Box flex='1' display='flex' justifyContent='center' alignItems='center'>
        <img src={robot} style={{ maxHeight: '60vh', maxWidth: '100%' }} alt="demo" />
      </Box>
      <Box flex='1' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
        <Typography fontSize='50px' fontWeight='bold' color='white'>Signup</Typography>
        <Box display='flex' flexDirection='column' alignItems='center' mt={5} width={'30vw'}>
          {/* Input fields for email and password */}
          <TextField
            id="username"
            name="username"
            label="Username"
            variant="filled"
            InputLabelProps={{
                style: { color: 'black' } // Customize label color
            }}
            style={{ marginTop: '30px', width: '80%', color: 'black', borderColor: 'white', backgroundColor: 'white' }}
            value={formData.username}
            onChange={handleInputChange}
        />
          <TextField
            id="password"
            name="password"
            label="Password"
            variant="filled"
            InputLabelProps={{
                style: { color: 'black' } // Customize label color
            }}
            style={{ marginTop: '30px', width: '80%', color: 'black', borderColor: 'white', backgroundColor: 'white' }}
            value={formData.password}
            onChange={handleInputChange}
        />
          {/* Link to signup page */}
          <Link to="/signup" style={{ textDecoration: 'underline' }}>
            <Typography
              style={{
                marginTop: '20px',
                fontWeight: 'bold',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                },
                color: 'white'
              }}
            >
              Already a user?
            </Typography>
          </Link>
          {/* Sign-in button */}
          <Button
            style={{
              border: '1px solid black',
              marginTop: '10%',
              width: '80%',
              fontSize: '20px',
              fontWeight: 'semi-bold',
              backgroundColor: '#35BDD0',
              color: 'black',
              borderRadius: '15px',
            }}
            className='button'
            onClick={handleSignin}
          >
            Sign up
          </Button>
        </Box>
      </Box>
    </Box>
    </div>
  );
}

export default Signup;
