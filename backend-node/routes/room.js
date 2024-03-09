const express=require('express')
const multer=require('multer')
const router=new express.Router()
const formidable = require("express-formidable");
const {addRoom,roomDetails, allRooms, roomDate, invoice}=require('../controllers/room')
router.post('/addRoom',formidable({ multiples: true }),addRoom)
router.post('/roomDetails',roomDetails)
router.post('/invoice',invoice) 
router.post('/allRooms',allRooms)
router.post('/roomDate',roomDate)
module.exports=router