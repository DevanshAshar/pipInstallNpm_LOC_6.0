const jwt = require('jsonwebtoken')
const Staff=require('../models/staff')
const authentication={

    verifyToken:async(req,res,next)=>{
    try {
        let token=req.header('Authorization')
        if(typeof(token)==="undefined")
        return res.status(401).json({error:'Unauthorized'})
        if(token)
        {
            try {
                const data=jwt.verify(token,process.env.SECRET_KEY)
                const user=await Staff.findById(data._id)
                userData=user
                next()
            } catch (error) {
                return res.status(400).json(error.message)
            }
        }
    
}catch (error) {
    return res.status(401).send(error.message)
}
}
}
module.exports=authentication