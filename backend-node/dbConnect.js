const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL,{}).then(()=>{
    console.log('Connection Succesful');
}).catch((err)=>console.log(err));