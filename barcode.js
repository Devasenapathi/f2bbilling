const bwipjs = require('bwip-js');

// Function to generate a barcode
async function generateBarcode(data) {
    return new Promise((resolve, reject) => {
        bwipjs.toBuffer({
            bcid: 'code128',       // Barcode type
            text: data,            // Data to encode
            scale: 3,              // Scaling factor
            height: 10,            // Bar height
            includetext: true,     // Include human-readable text
        }, (err, png) => {
            if (err) reject(err);
            else resolve(png);
        });
    });
}

// Example usage
const productData = {
    name: 'Product Name',
    price: '$19.99',
    weight: '1.5 kg',
    // ... other fields
};

const barcodeImageBuffer = await generateBarcode(productData.name);

// Now you can save or display the barcode image as needed
