const Staff=require('../models/staff')
const Hotel=require('../models/hotel')
const jwt=require('jsonwebtoken')
const newUser=async(req,res)=>{
    try {
       const {username,password}=req.body 
       const user=new Staff({username,password,role:'Staff'})
       await user.save()
       console.log(user)
       res.status(200).json({user})
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error });
    }
}
const loginUser=async(req,res)=>{
    try {
        const {username,password}=req.body
        var token
        const user=await Staff.findOne({username})
        if(user.password==password)
        {
            token = jwt.sign(
                { _id: user._id },
                process.env.SECRET_KEY,
                { expiresIn: "1d" }
              );
        }
        return res.status(200).json({ token, user});
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error });
    }
}
const addStaff=async(req,res)=>{
    try {
        const {username,hotelId}=req.body
        const user=await Staff.findOne({username})
        const hotel=await Hotel.findById(hotelId)
        hotel.staff.push(user._id)
        await hotel.save()
        res.status(200).json({hotel})
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error });
    }
}
module.exports={newUser,addStaff,loginUser}