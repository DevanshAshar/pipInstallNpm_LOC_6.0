import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from './Navbar';
import styles from '../style';
import { Box, Button, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import { LineChart } from '@mui/x-charts';
// import { LineChart } from '@mui/x-charts/LineChart';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, rating, Report) {
  return { name, rating, Report};
}

const rows = [
  createData('Frozen yoghurt', 4.0),
  createData('Ice cream sandwich', 4.3),
  createData('Eclair', 3.0),
  createData('Cupcake', 4.3),
  createData('Gingerbread', 3.9),
];

export default function CustomizedTables() {
    const [open, setOpen] = useState(false);
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
        width: 550,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 3,
        padding: 5
    };
  return (
    <div style={{backgroundColor: '#161724', minHeight: '100vh', overflow: 'auto'}}>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
            <Navbar />
        </div>
        </div>
        <div style={{width: '50vw', marginLeft: '100px'}}>
            <Typography variant='h3' style={{color: 'white', marginBottom: '20px', marginTop: '20px', background: 'linear-gradient(-50deg, #37BFD1, #C1F3F5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>List of Staffs</Typography>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="right">Average Rating</StyledTableCell>
                    <StyledTableCell align="right">Report</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                        {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.rating}</StyledTableCell>
                    <StyledTableCell align="right">
                        <Button style={{backgroundColor: 'black', color: 'white'}} onClick={handleOpen}>
                            view
                        </Button>
                    </StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
             <Box sx={style}>
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                        {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                        curve: "linear"
                        }
                    ]}
                    width={500}
                    height={300}
                />
             </Box>
            </Modal>
        </div>
    </div>
  );
}
