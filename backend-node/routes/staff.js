const express=require('express')
const router=new express.Router()
const {newUser,addStaff, loginUser}=require('../controllers/staff')
router.post('/newUser',newUser)
router.post('/addStaff',addStaff)
router.post('/loginUser',loginUser)
module.exports=router