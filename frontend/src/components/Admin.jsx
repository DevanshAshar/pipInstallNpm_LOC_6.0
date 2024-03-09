import React from 'react';
import Navbar from './Navbar';
import styles from "../style";
import { TextField, Typography } from '@mui/material';
import Cards from './Cards';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Calendar from './Calendar'
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const rooms = [
    { roomNo: 101 },
    { roomNo: 102 },
    { roomNo: 103 },
    { roomNo: 104 },
    { roomNo: 105 },
    { roomNo: 106 },
    { roomNo: 107 },
    { roomNo: 108 },
  ];

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/rooms')
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = (event) => {
    event.stopPropagation();
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

  return (
    <div style={{ backgroundColor: '#161724', minHeight: '100vh', overflow: 'auto' }}>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

        <button type="button" onClick={handleOpen} className={`py-3 px-3 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ml-[1330px]`}>
            Add Staff
        </button>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', padding: '20px' }}>
        {rooms.map((room, index) => (
            <>
                <div onClick={handleClick}>
                    <Cards key={index} roomNo={room.roomNo} />
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
            <Typography variant='h4' style={{color: 'Black', marginTop: '10px', marginBottom: '30px'}}>Add your Staff</Typography>
            <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth />
            <Button style={{backgroundColor: 'black', color: 'white', marginTop: 30}}>
                Add
            </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Admin;
