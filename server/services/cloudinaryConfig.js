const cloudinary = require('cloudinary');

// Cloudinary Config

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.uploads = file => {
  return new Promise(resolve => {
    cloudinary.uploader.upload(
      file,
      result => {
        resolve({ url: result.url, id: result.public_id });
      },
      { resource_type: 'auto' }
    );
  });
};
// result URL will be returned for accessing the image.
