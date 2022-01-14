var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'ddmnmzkxh',
    api_key: '392514584485432',
    api_secret: '3ZzG1x5aUNPDZRSD6YZV3BEtpYo'
});

console.log (cloudinary.url('sample'));
