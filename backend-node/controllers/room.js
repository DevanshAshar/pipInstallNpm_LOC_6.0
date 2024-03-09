const Hotel=require('../models/hotel')
const Room=require('../models/room')
const fs=require('fs')
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

const roomDetails=async(req,res)=>{
    try {
        const {roomId,date}=req.body
        const room=await Inspect.findById({roomId,date})
        res.status(200).json({room})
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error })
    }
}
module.exports={addRoom,roomDetails}