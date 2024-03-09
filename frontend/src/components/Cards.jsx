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

export default function Cards({roomNo}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <div>
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        sx={{ height: 200 }}
        image={clean_room}
        title="green iguana"
      />
      <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #37BFD1, #C1F3F5)',}}>
        <Typography gutterBottom variant="h5" component="div">
          Room {roomNo}
        </Typography>
        <CardActions>
          <Button size="small" style={{padding: '5px', backgroundColor: 'white', color: 'black'}} onClick={handleOpen}>Calendar</Button>
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