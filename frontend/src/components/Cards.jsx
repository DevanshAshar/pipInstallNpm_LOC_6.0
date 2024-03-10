import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {clean_room, unclean_room, image} from '../assets'
import { Box, Modal } from '@mui/material';
import Calendar from './Calendar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function Cards({room}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
    localStorage.setItem("roomId", room._id)
  };
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const handleClick = async() => {
    // const response = await fetch('https://pipinstallnpm-loc-6-0.onrender.com/room/invoice', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     roomId: room._id
    //   })
    // });

    const response= await axios.post('http://localhost:5000/room/invoice',{roomId:room._id},{ responseType: 'blob' })
    const invoiceBlob = new Blob([response.data], { type: 'application/pdf' });
    const invoiceUrl = URL.createObjectURL(invoiceBlob);
    const link = document.createElement('a');
    link.href = invoiceUrl;
    link.download = 'report.pdf';
    link.click();
    URL.revokeObjectURL(invoiceUrl);

    if (response.status === 200) {
      const data = await response.json();
      console.log(data)
    } else {
      console.error('Login failed:', response.statusText);
    }
  }

  const handleView = () => {
    navigate('/rooms')
  }

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
    padding: 2
  };

  return (
    <div>
    <Card sx={{ maxWidth: 300, borderRadius: 4 }}>
      <CardMedia
        sx={{ height: 200 }}
        image={room.image[0]}
        title="green iguana"
      />
      <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #37BFD1, #C1F3F5)',}}>
        <Typography gutterBottom variant="h5" component="div">
          Room {room.roomNo}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Type: Room {room.roomType}
        </Typography>
        <CardActions>
          <Button size="small" style={{padding: '5px', backgroundColor: 'white', color: 'black'}} onClick={handleOpen}>Schedule</Button>
          <Button size="small" style={{padding: '5px', backgroundColor: 'white', color: 'black'}} onClick={handleClick}>Report</Button>
        </CardActions>
      </CardContent>
    </Card>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box sx={style}>
      <Calendar />
      <Button style={{backgroundColor: 'black', color: 'white', marginTop: 10, marginLeft: 150}} onClick={handleView}>
          View
      </Button>
      </Box>
    </Modal>
    </div>
  );
}