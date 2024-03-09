const express=require('express')
const router=new express.Router()
const {newHotel}=require('../controllers/hotel')
router.post('/newHotel',newHotel)
module.exports=router