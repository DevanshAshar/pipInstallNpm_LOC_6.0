const express=require('express')
const multer=require('multer')
const router=new express.Router()
const formidable = require("express-formidable");
const {addRoom,roomDetails}=require('../controllers/room')
router.post('/addRoom',formidable({ multiples: true }),addRoom)
router.post('/roomDetails',roomDetails)
module.exports=router