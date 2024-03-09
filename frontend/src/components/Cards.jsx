import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {clean_room, unclean_room, image} from '../assets'
import { Modal } from '@mui/material';
import Calendar from './Calendar'

export default function Cards({room}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleClick = async() => {
    const response = await fetch('https://pipinstallnpm-loc-6-0.onrender.com/room/invoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        roomId: room._id
      })
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log(data)
    } else {
      console.error('Login failed:', response.statusText);
    }
  }
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
      <Calendar />
    </Modal>
    </div>
  );
}