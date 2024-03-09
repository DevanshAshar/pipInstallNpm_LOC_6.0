const mongoose = require("mongoose");
const staffSchema=new mongoose.Schema(
    {
        username:{
            type:String
        },
        password:{
            type:String
        },
        role:{
            type:String,
            enum:['Admin','Staff']
        },
        scores:[
            {type:Number}
        ]
    }
)
const Staff=mongoose.model('Staff',staffSchema)
module.exports=Staff