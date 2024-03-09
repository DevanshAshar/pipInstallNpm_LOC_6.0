const express=require('express')
const multer=require('multer')
const router=new express.Router()
const authentication=require('../middleware/auth')
const formidable = require("express-formidable");
const {addInspect, inspDet, unFn}=require('../controllers/inspect')
router.post('/addInspect',authentication.verifyToken,formidable({ multiples: true }),addInspect)
router.post('/inspDet',inspDet)
router.post('/unFn',unFn)
module.exports=router