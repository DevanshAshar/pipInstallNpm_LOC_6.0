import React from 'react'
import {clean_room, unclean_room, image} from '../assets'
import ImageSlider from './ImageSlider';
import Navbar from './Navbar';
import styles from "../style";
import { Typography } from '@mui/material';
import Calendar from './Calendar';
import CarouselSlider from './CarouselSlider';

const Rooms = () => {

    const slides = [
        { beforeurl: clean_room, afterurl: unclean_room, title: "beach" },
        { beforeurl: image, afterurl: unclean_room, title: "boat" },
        { beforeurl: clean_room, afterurl: image, title: "forest" },
        { beforeurl: image, afterurl: unclean_room, title: "city" },
        { beforeurl: clean_room, afterurl: unclean_room, title: "italy" },
      ];

    const slides2 = [
        {url: clean_room},
        {url: image},
        {url: clean_room},
        {url: image},
        {url: clean_room},
      ];

  return (
    <div style={{backgroundColor: '#161724', minHeight: '100vh', overflow: 'auto'}}>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
            <Navbar />
        </div>
        </div>

        <Typography variant='h4' style={{color: 'white', marginLeft: '60px', marginTop: '20px', background: 'linear-gradient(-50deg, #37BFD1, #C1F3F5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Room 101</Typography>
        <div style={{display: 'flex'}}>
            <div style={{width: '700px', height: '480px', marginLeft: '100px', marginTop: '40px'}}>
                <ImageSlider slides={slides} />
            </div>
        </div>
        <div style={{width: '700px', height: '450px', marginLeft: '390px', marginTop: '30px'}}>
            <Typography variant='h3' style={{color: 'white', marginLeft: '130px',marginBottom: '20px', background: 'linear-gradient(-50deg, #37BFD1, #C1F3F5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>After cleaning images</Typography>
            <CarouselSlider slides={slides2}/>
        </div>
    </div>
  )
}

export default Rooms