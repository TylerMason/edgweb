const fs = require('fs');
const { JSDOM } = require('jsdom');

// Read SVG file content
const svgFilePath = './public/mapv2.svg';
const svgContent = fs.readFileSync(svgFilePath, 'utf-8');

// Parse the SVG content
const dom = new JSDOM(svgContent, { contentType: "image/svg+xml" });
const document = dom.window.document;

// Get all 'rect' elements
const rects = document.getElementsByTagName('rect');

// Extract the IDs of the 'rect' elements
const rectIds = Array.from(rects).map(rect => rect.id).filter(id => id);

// Write the IDs to a text file
const outputPath = './rect_ids.txt';
fs.writeFile(outputPath, rectIds.join('\n'), (err) => {
    if (err) {
        console.error('Error writing to file', err);
    } else {
        console.log(`Rect IDs saved to ${outputPath}`);
    }
});
