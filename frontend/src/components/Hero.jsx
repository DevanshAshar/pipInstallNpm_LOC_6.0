import styles from "../style";
import { discount, robot } from "../assets";
import GetStarted from "./GetStarted";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Hero = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [hotelName, setHotelName] = useState("");
  const token = localStorage.getItem("token");

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 'none',
    p: 4,
    borderRadius: 3,
    padding: 5
  };

  const handleAddHotel = async () => {
    const response = await fetch('http://localhost:5000/hotel/newHotel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        hotelName: hotelName,
      })
    });

    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem("hotelId", data.hotel._id)
      console.log(data.message);
      navigate('/admin');
    } else {
      console.error('failed:', response.statusText);
    }
  }

  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">20%</span> Discount For{" "}
            <span className="text-white">1 Month</span> Account
          </p>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            Simplify Hotel Management <br className="sm:block hidden" />{" "}
            <span className="text-gradient">with Image Analysis</span>{" "}
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0" onClick={handleOpen}>
            <GetStarted />
          </div>
        </div>

        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Effortlessly monitor room cleanliness, inventory, and more with our advanced Image Analysis system.
        </p>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={robot} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={style}>
            <Typography variant='h4' style={{color: 'Black', marginTop: '10px', marginBottom: '30px'}}>Add Hotel</Typography>
            <TextField 
              id="outlined-basic" 
              label="Hotel Name" 
              variant="outlined" 
              fullWidth 
              value={hotelName} 
              onChange={(e) => setHotelName(e.target.value)} // Update hotel name state
            />
            <Button style={{backgroundColor: 'black', color: 'white', marginTop: 30}} onClick={handleAddHotel}>
                Add
            </Button>
        </Box>
      </Modal>
    </section>
  );
};

export default Hero;
