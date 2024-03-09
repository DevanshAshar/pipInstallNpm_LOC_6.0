import React, { useEffect, useRef, useState } from 'react'
import {clean_room, unclean_room, image} from '../assets'
import ImageSlider from './ImageSlider';
import Navbar from './Navbar';
import styles from "../style";
import { Typography } from '@mui/material';
import Calendar from './Calendar';
import './styles3.css'
import Upload from './Upload';

const Staff = () => {

    const [items, setItems] = useState([
        { id: 1, name: 'Refrigrator', checked: false },
        { id: 2, name: 'AC', checked: false },
        { id: 3, name: 'TV', checked: false },
        { id: 4, name: 'Fan', checked: false },
      ]);
    
      const handleCheckboxChange = (itemId) => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, checked: !item.checked } : item
          )
        );
      };
    
      const handleSave = () => {
        const uncheckedItems = items.filter((item) => !item.checked);
        // Do something with the unchecked items (e.g., save to state or perform an action)
        console.log('Unchecked items:', uncheckedItems);
      };

  return (
    <div style={{backgroundColor: '#161724', minHeight: '100vh', overflow: 'auto'}}>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
            <Navbar />
        </div>
        </div>

        <Typography variant='h4' style={{color: 'white', marginLeft: '60px', marginTop: '20px', background: 'linear-gradient(-50deg, #37BFD1, #C1F3F5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Room 101</Typography>
        <div style={{width: '100vw', marginLeft: '65px', marginTop: '80px', display: 'flex', color: 'white'}}>
            <Upload />
            <div style={{marginLeft: '200px'}}>
            <Typography variant='h4' style={{color: 'white', marginTop: '20px', marginBottom: '30px', background: 'linear-gradient(-50deg, #37BFD1, #C1F3F5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Select Working Amenities</Typography>
                    {items.map((item) => (
                        <div key={item.id} style={{display: 'flex'}}>
                            <input
                                type="checkbox"
                                checked={item.checked}
                                onChange={() => handleCheckboxChange(item.id)}
                                style={{height: '20px', width: '20px', marginRight: 30, marginBottom: 30}}
                            />
                            <Typography variant='h5'>{item.name}</Typography>
                        </div>
                    ))}
                <button onClick={handleSave} style={{background: '#35BDD0', outline: 0, border: 0, color: 'black', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, padding: '8px 13px'}}>Save List</button>
            </div>
        </div>
    </div>
  )
}

export default Staff