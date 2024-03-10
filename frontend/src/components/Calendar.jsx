import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import axios from 'axios'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

async function fakeFetch(date, { signal }) {
  const resp=await axios.post('http://localhost:5000/room/roomDate',{roomId:'65ec390bd8a8f5ffae63fbe3'})
  var days=resp.data.roomDates
  var daysToHighlight=[]
  days.forEach(element => {
    const date = new Date(element);
    const month = date.getMonth() + 1;
    console.log(month);
    daysToHighlight.push(month)
  });
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      console.log(daysToHighlight)
      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); 
const day = String(today.getDate()).padStart(2, '0');
const fd=year+"-"+month+"-"+day
const initialValue = dayjs(fd);

function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  
    const isSelected =
      !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
  
    return (
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day}>
        {isSelected && 
            <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '24px', // Adjust the font size as per your requirement
              width: '36px', // Adjust the width to make it circular
              height: '36px', // Adjust the height to make it circular
              borderRadius: '50%', // Make it circular
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white', // Change the color of the tick mark
            }}
          >
            ✅
          </span>
        }
      </PickersDay>
    );
  }  

export default function DateCalendarServerRequest() {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  const handleDateClick = (date) => {
    console.log(date); // Log the clicked date
  };  

  return (
    <div style={{backgroundColor: 'white', borderRadius: '20px'}}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
            onClick: handleDateClick,
          },
        }}
      />
    </LocalizationProvider>
    </div>
  );
}