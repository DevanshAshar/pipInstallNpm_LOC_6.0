import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import styles from "../style";
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Cards from './Cards';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Calendar from './Calendar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
  // const rooms = [
  //   { roomNo: 101 },
  //   { roomNo: 102 },
  //   { roomNo: 103 },
  //   { roomNo: 104 },
  //   { roomNo: 105 },
  //   { roomNo: 106 },
  //   { roomNo: 107 },
  //   { roomNo: 108 },
  // ];

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/rooms')
  }
  const [staffName, setstaffName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [files, setFiles] = useState([]);
  const [roomType, setRoomType] = React.useState('');
  const [roomNo, setRoomNo] = React.useState('');
  const [rooms, setRooms] = useState([])

  const handleChange = (event) => {
    setRoomType(event.target.value);
  };
  const hotelId = localStorage.getItem("hotelId")
  const requestData = {
    hotelId: hotelId, // Include hotelId from localStorage
  };

  const [modalType, setModalType] = useState(null); // State to track modal type

  const handleOpen = (type) => {
    setModalType(type);
    setOpen(true);
  };
  
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
    padding: 5
  };

  const handleAddStaff = async () => {
    const response = await fetch('http://localhost:5000/user/addStaff', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: staffName,
        hotelId: hotelId
      })
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log(data.message);
      navigate('/admin');
    } else {
      console.error('failed:', response.statusText);
    }

    handleClose()
  }

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/room/allRooms', requestData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Response:', response.data);
        setRooms(response.data.rooms)
        if (response.status === 200) {
          console.log('Data fetched successfully');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []); // Empty dependency array to execute once on component mount  

  const handleAddRoom = async () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('image', files[i]);
    }
    formData.append('roomNo', roomNo); // Append room number
    formData.append('roomType', roomType);
    formData.append('hotelId', hotelId);

    try {
      const response = await axios.post('http://localhost:5000/room/addRoom', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if(response.status == 200){
        console.log('Response:', response.data);
      }
      // alert('Files uploaded successfully');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files');
    }

    handleClose();
  };

  return (
    <div style={{ backgroundColor: '#161724', minHeight: '100vh', overflow: 'auto' }}>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <button type="button" onClick={() => handleOpen("room")} className={`py-3 px-3 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ml-[1160px] mr-[50px]`}>
            Add Room
        </button>
        <button type="button" onClick={() => handleOpen("staff")} className={`py-3 px-3 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none`}>
            Add Staff
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', padding: '20px' }}>
        {rooms.map((room, index) => (
            <>
                <div key={room.roomNo}>
                    <Cards key={index} room={room}/>
                </div>
            </>
        ))}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={style}>
          {
            modalType === "staff" ? (
              <>
                <Typography variant='h4' style={{color: 'Black', marginTop: '10px', marginBottom: '30px'}}>Add your Staff</Typography>
                <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth onChange={(e) => setstaffName(e.target.value)} />
                <Button style={{backgroundColor: 'black', color: 'white', marginTop: 30}} onClick={handleAddStaff}>
                    Add Staff
                </Button>
              </>
            ) : (
              <>
                <Typography variant='h4' style={{color: 'Black', marginTop: '10px', marginBottom: '30px'}}>Add Room</Typography>
                <TextField id="outlined-basic" label="Room No" variant="outlined" fullWidth onChange={(e) => setRoomNo(e.target.value)}/>
                <FormControl fullWidth style={{marginTop: 30}}>
                  <InputLabel id="demo-simple-select-label">Room Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={roomType}
                    label="Room Type"
                    onChange={handleChange}
                  >
                    <MenuItem value={"Budget"}>Budget</MenuItem>
                    <MenuItem value={"Deluxe"}>Deluxe</MenuItem>
                    <MenuItem value={"Super-Deluxe"}>Super-Deluxe</MenuItem>
                  </Select>
                </FormControl>
                <input type="file" multiple onChange={handleFileChange} style={{marginTop: '10%'}}/>
                <Button style={{backgroundColor: 'black', color: 'white', marginTop: 30}} onClick={handleAddRoom}>
                    Add Room
                </Button>
              </>
            )
          }
        </Box>
      </Modal>
    </div>
  );
}

export default Admin;
