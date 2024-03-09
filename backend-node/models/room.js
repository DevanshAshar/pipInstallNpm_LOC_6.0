const mongoose = require("mongoose");
const roomSchema=new mongoose.Schema(
    {
        roomNo:{
            type:Number
        },
        roomType:{
            type:String,
            enum:['Deluxe','Super-Deluxe','Budget']
        },
        amenities:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Amenity'
            }
        ],
        image:[{
            type:String
        }],
    }
)
const Room=mongoose.model('Room',roomSchema)
module.exports=Room