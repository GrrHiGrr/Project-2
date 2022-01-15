var cloudinary = require('cloudinary').v2;

cloudinary.uploader.upload(
    'sample.jpg',
    {
        public_id: 'Profile Picture'
    },
function(error,result) { console.log(error, result);}
);