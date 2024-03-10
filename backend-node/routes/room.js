const express=require('express')
const multer=require('multer')
const router=new express.Router()
const FormData = require('form-data');
const upload = multer();
const formidable = require("express-formidable");
const {addRoom,roomDetails, allRooms, roomDate, invoice, damagedItems}=require('../controllers/room')
router.post('/addRoom',formidable({ multiples: true }),addRoom)
router.post('/roomDetails',roomDetails)
router.post('/damagedItems',upload.none(),damagedItems)
router.post('/invoice',invoice) 
router.post('/allRooms',allRooms)
router.post('/roomDate',roomDate)
module.exports=router