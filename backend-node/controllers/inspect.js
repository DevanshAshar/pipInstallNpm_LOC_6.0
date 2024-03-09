const Room=require('../models/room')
const Inspect=require('../models/inspect')
const {fn}=require('../utils/function')
const fs=require('fs')
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret:process.env.api_secret
});
const addInspect=async(req,res)=>{
    try {
        const {roomId}=req.fields
        const inspect=new Inspect({roomId,inspected:true,date:new Date().toLocaleDateString("de-DE"),staff:userData._id,unFnElectronicItems})
        await inspect.save()
        const { image } = req.files
        if (image.length>1) {
            const uploadPromises = image.map(file => {
                return new Promise((resolve, reject) => {
                    cloudinary.uploader.upload(file.path, { allowed_formats: ['jpg', 'jpeg', 'png'] }, (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result.url);
                        }
                    });
                });
            });
            const uploadedImages = await Promise.all(uploadPromises);
            inspect.img.push(...uploadedImages);
            await inspect.save();
        }
        else{
            const file = image;
                const uploadResult = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload(file.path, { allowed_formats: ['jpg', 'jpeg', 'png'] }, (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result.url);
                        }
                    });
                });
                inspect.img.push(uploadResult);
                await inspect.save();
                fs.unlink(file.path, (err) => {
                    if (err) {
                        console.error("Error deleting file:", err);
                    }
                });
        }
        res.status(200).json({inspect})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error})
    }
}
const unFn=async(req,res)=>{
    try {
        const {roomId,unFnElectronicItems}=req.body
        const room=await Inspect.find({roomId})
        room.unFnElectronicItems=unFnElectronicItems
        await room.save()
        res.status(200).json({room})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error})
    }
}
const inspDet=async(req,res)=>{
    try {
        const {roomId,date}=req.body
        const insp=await Inspect.find({roomId,date})
        const image=insp[insp.length-1].img[0]
        // const image="https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F70a9a762-7c36-11e6-bfdb-4199e9559171.jpg?crop=2250%2C1266%2C0%2C117&resize=685"
        let prompt="A photorealistic image of a clean and organized hotel room. The bed is made with crisp white sheets, tucked in tightly at the corners. The pillows are neatly fluffed and arranged on the bed. The rest of the room is clean and free of clutter"
        const op=await fn(image,prompt)
        // const resp=await axios.post('',{})
        res.status(200).json({insp,op})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error})
    }
}
module.exports={addInspect,inspDet,unFn}