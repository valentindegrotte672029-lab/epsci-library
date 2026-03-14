const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

const doc = new jsPDF();
const imageDir = path.join(__dirname, 'public/images/departments');
const images = [
  'presidency.jpg',
  'secretary.jpg',
  'partnership.jpg',
  'animation.jpg',
  'travel.jpg'
];

async function generate() {
  for (let i = 0; i < images.length; i++) {
    const imgPath = path.join(imageDir, images[i]);
    if (fs.existsSync(imgPath)) {
      const imgData = fs.readFileSync(imgPath).toString('base64');
      if (i > 0) doc.addPage();
      
      const title = images[i].split('.')[0].toUpperCase();
      doc.setFontSize(20);
      doc.text(title, 20, 20);
      
      // Preserve aspect ratio roughly (A4 is ~210x297mm)
      // Standard image is landscape/portrait, let's fit to width
      doc.addImage(imgData, 'JPEG', 10, 30, 190, 250, undefined, 'FAST');
    }
  }
  
  const pdfOutput = doc.output();
  fs.writeFileSync(path.join(__dirname, 'public/department_dossier.pdf'), pdfOutput, 'binary');
  console.log('PDF generated at public/department_dossier.pdf');
}

generate();
