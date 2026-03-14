const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function splitPdf() {
  const sourcePdfPath = path.join(__dirname, 'public/hq-source.pdf');
  const hqData = fs.readFileSync(sourcePdfPath);
  const pdfDoc = await PDFDocument.load(hqData);
  const pageCount = pdfDoc.getPageCount();
  console.log(`Total pages: ${pageCount}`);
  
  const departments = [
    'presidency',
    'secretary',
    'treasury',
    'partnership',
    'communications',
    'events',
    'animation',
    'logistics',
    'travel'
  ];

  for (let i = 0; i < Math.min(pageCount, departments.length); i++) {
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
    newPdf.addPage(copiedPage);
    const pdfBytes = await newPdf.save();
    fs.writeFileSync(path.join(__dirname, `public/pdfs/${departments[i]}.pdf`), pdfBytes);
    console.log(`Saved public/pdfs/${departments[i]}.pdf`);
  }
  
  // Also replace epsci-files.pdf with the hq version
  fs.copyFileSync(sourcePdfPath, path.join(__dirname, 'public/epsci-files.pdf'));
  console.log('Replaced public/epsci-files.pdf');
}

splitPdf().catch(console.error);
