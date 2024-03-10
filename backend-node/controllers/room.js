const Hotel=require('../models/hotel')
const Room=require('../models/room')
const Inspect=require('../models/inspect')
const {buildPDF, buildPDFForLast7Inspections}=require('../utils/buildPdf')
const fs=require('fs')
const { fn } = require('../utils/function')
const { default: axios } = require('axios')
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret:process.env.api_secret
});
const addRoom = async (req, res) => {
    try {
        const { roomNo, roomType, hotelId } = req.fields;
        const room = new Room({ roomNo, roomType });
        await room.save();
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        hotel.room.push(room._id);
        await hotel.save();
        const { image } = req.files;
        if (image && image.length > 0) {
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
            room.image.push(...uploadedImages);
            await room.save();
            image.forEach(file => {
                fs.unlink(file.path, err => {
                    if (err) {
                        console.error("Error deleting file:", err);
                    }
                });
            });
        }
        else
        {
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
                room.image.push(uploadResult);
                await room.save();
                fs.unlink(file.path, (err) => {
                    if (err) {
                        console.error("Error deleting file:", err);
                    }
                });
        }

        res.status(200).json({ room, hotel });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};
const roomDate=async(req,res)=>{
    try {
        const {roomId}=req.body
        const room=await Inspect.find({roomId})
        var roomDates=[]
        room.forEach((elem)=>{
            roomDates.push(elem.date)
        })
        res.status(200).json({roomDates})
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error })
    }
}
const invoice = async (req, res) => {
    try {
      const { roomId } = req.body;
      const onDataCallback = (chunk) => {
        res.write(chunk);
      };
      const onEndCallback = () => {
        res.end();
      };
      buildPDFForLast7Inspections(roomId ,onDataCallback,onEndCallback)
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
    }
  };
  const damagedItems=async(req,res)=>{
    try {
        const {roomId}=req.body
        const room=await Inspect.findOne({roomId})
        // const url=room.img[0]
        // console.log(url)
        const response=await axios.post('https://9639-14-139-125-227.ngrok-free.app/api/damagecheck/',{url:'https://res.cloudinary.com/dcbnv0eyo/image/upload/v1709994354/aykcbamawsgqtwcxkhvp.jpg'})
        const resp=response.data
        let arr=resp.result
        for(i=0;i<arr.length;i++)
        {
            room.damaged[i].item.img=arr[i][2]
            room.damaged[i].item.name=arr[i][1]
            room.damaged[i].item.damaged=arr[i][0]
            await room.save()
        }
        res.status({room})
    } catch (error) {
        console.log(error.message);
      res.status(400).json({ message: error.message });
    }
  }
  const roomDetails = async (req, res) => {
    try {
        const { roomId, date } = req.body;
        const room = await Inspect.findOne({ roomId, date });   
        // console.log(room)
        const imgs = room.img;        
        for (const img of imgs) {
            // console.log(img)
            const aiImg = await fn(img);
            room.aiImg.push(aiImg[0]);
        }

        await room.save();
        
        res.status(200).json({ room });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};
const allRooms=async(req,res)=>{
    try {
        const {hotelId}=req.body
        const hotel=await Hotel.findById(hotelId).populate('room')
        const rooms=hotel.room
        res.status(200).json({rooms})
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error })
    }
}
module.exports={addRoom,roomDetails,allRooms,roomDate,invoice,damagedItems}