const PDFDocument = require('pdfkit');
const fs = require('fs');
const axios=require('axios')
const path=require('path')
const Inspect = require('../models/inspect'); // Import the model for Inspect
async function downloadImage(imageUrl) {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    
    // Create the temp directory if it doesn't exist
    const tempDir = path.join(__dirname, 'temp');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }

    // Generate file path
    const filePath = path.join(tempDir, `image_${Date.now()}.jpg`);

    // Write image data to file
    fs.writeFileSync(filePath, response.data);

    // Return file path
    return filePath;
}
  
  async function buildPDFForLast7Inspections(roomId, onDataCallback, onEndCallback) {
    try {
      const inspections = await Inspect.find({ roomId }).sort({ date: -1 }).limit(7).populate('staff');
      const doc = new PDFDocument();
      doc.fontSize(20).text('Inspection Report - Last 7 Inspections');
      doc.moveDown();
      doc.fontSize(16).text(`Inspection`, { underline: true });
      for (const inspection of inspections) {  
        doc.moveDown();
        doc.fontSize(12).text(`Inspection Date: ${inspection.date}`);
        // doc.fontSize(12).text(`Inspected By: ${inspection.staff.username}`);
        // doc.fontSize(12).text(`Staff Role: ${inspection.staff.role}`); // Add staff role
        doc.moveDown();
        for (const imageUrl of inspection.img) {
          try {
            const imagePath = await downloadImage(imageUrl);
            doc.image(imagePath, { width: 400 });
            fs.unlinkSync(imagePath);
            doc.moveDown();
          } catch (error) {
            console.error('Error downloading image:', error.message);
          }
        }
  
        doc.moveDown();
        doc.fontSize(12).text('Unidentified Electronic Items:');
        inspection.unFnElectronicItems.forEach((item) => {
          doc.fontSize(12).text(item);
        });
        doc.moveDown();
        doc.fontSize(12).text('Damaged Items:');
        inspection.damaged.forEach((item) => {
          doc.fontSize(12).text(item);
        });
        doc.moveDown();
      }
  
      doc.end();
  
      doc.on('data', onDataCallback);
      doc.on('end', onEndCallback);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
}
  
module.exports = { buildPDFForLast7Inspections };
