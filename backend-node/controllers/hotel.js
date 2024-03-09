const express = require("express");
const Hotel=require('../models/hotel')
const Staff=require('../models/staff')
const newHotel=async(req,res)=>{
    try {
        const {hotelName}=req.body 
        const uid=userData._id
        const user=await Staff.findById(uid)
        user.role='Admin'
        await user.save()
        const hotel=new Hotel({hotelName,staff:[user._id]})
        console.log(hotel)
        await hotel.save()
        res.status(200).json({hotel})
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error });
    }
}
module.exports={newHotel}