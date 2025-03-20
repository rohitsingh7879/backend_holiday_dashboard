const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const path = require('path');


AWS.config.update({
  accessKeyId: process.env.IAM_USER_KEY, 
  secretAccessKey: process.env.IAM_USER_SECRET, 
  region:process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME, 
    key: function (req, file, cb) {
      // Save the file with a unique timestamp in the filename
      cb(null, `uploads/${Date.now()}-${file.originalname}`);
    },
  }),
});

const fileUploadMiddleware = upload.array('files', 10);

module.exports = fileUploadMiddleware;