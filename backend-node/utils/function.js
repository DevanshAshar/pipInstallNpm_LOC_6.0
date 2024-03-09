const Replicate=require('replicate')
const axios=require('axios')
const fn=async(image)=>{
  console.log('idhar')
  console.log(image)
    const replicate = new Replicate({
        auth: 'r8_doVeIKc4CvJYnsDMXxtPRlG3Aelclj31DQ6S4'
      });
      const output = await replicate.run(
        "rossjillian/controlnet:795433b19458d0f4fa172a7ccf93178d2adb1cb8ab2ad6c8fdc33fdbcd49f477",
        {
          input: {
            eta: 0,
            seed: 20,
            // image: "https://1000awesomethings.com/wp-content/uploads/2010/09/tornado-hit-our-hotel-room.jpg",
            image,
            scale: 9,
            steps: 20,
            prompt:"A photorealistic image of a clean and organized hotel room. The bed is made with crisp white sheets, tucked in tightly at the corners. The pillows are neatly fluffed and arranged on the bed. The rest of the room is clean and free of clutter",
            scheduler: "DDIM",
            structure: "hough",
            num_outputs: 1,
            low_threshold: 100,
            high_threshold: 200,
            negative_prompt: "Longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
            image_resolution: 512,
            return_reference_image: false
          }
        }
      );
      return output
}
module.exports={fn}