const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv=require('dotenv').config()
const Room=require('./routes/room')
const Hotel=require('./routes/hotel')
const Staff=require('./routes/staff')
const Inspect=require('./routes/inspect')
const app = express()
require('./dbConnect')
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use('/room',Room)
app.use('/hotel',Hotel) 
app.use('/inspect',Inspect)
app.use('/user',Staff)
app.listen(5000,()=>{
    console.log('Server on...')
})