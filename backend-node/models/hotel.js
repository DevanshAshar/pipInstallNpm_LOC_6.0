const mongoose = require("mongoose");
const hotelSchema=new mongoose.Schema(
    {
        hotelname:{
            type:String
        },
        staff:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Staff'
            }
        ],
        room:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Room'
            }
        ]
    }
)
const Hotel=mongoose.model('Hotel',hotelSchema)
module.exports=Hotel