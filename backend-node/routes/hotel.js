const express=require('express')
const router=new express.Router()
const authentication=require('../middleware/auth')
const {newHotel}=require('../controllers/hotel')
router.post('/newHotel',authentication.verifyToken,newHotel)
module.exports=router