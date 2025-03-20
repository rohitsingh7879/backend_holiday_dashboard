const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types'); // Assuming you're using mime-types library for MIME lookup

const uploadImagesOnAwsReturnUrls = async (files) => {
  if (!files || files.length === 0) {
    console.error('No files provided');
    return null; // File validation
  }

  try {
    // Initialize S3 client with the AWS credentials and region
     const s3 = new AWS.S3({
         accessKeyId:  process.env.IAM_USER_KEY,
         secretAccessKey:  process.env.IAM_USER_SECRET,
         region: `${process.env.AWS_REGION}` || 'eu-north-1',
       });
    // Array to store public URLs of successfully uploaded files
    const publicUrls = [];

    // Process each file and upload it to S3
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file || !file.path) {
        console.error('Invalid file or missing file path:', file);
        continue; // Skip invalid files
      }

      const fileStream = fs.createReadStream(file.path); // Create a readable stream from the file

      // Generate a unique file name with timestamp and random hex string
      const randomHex = Math.floor(Math.random() * 0x10000000000000000).toString(16);
      const fileName = `uploads/${Date.now()}_${randomHex}_${path.basename(file.path)}`;

      // Determine MIME type of the file
      const mimeType = mime.lookup(fileName) || 'application/octet-stream';
      if (!mimeType) {
        throw new Error(`Unable to determine MIME type for file: ${file.path}`);
      }

      // Prepare S3 upload parameters (without ACL)
      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME, // Your S3 bucket name
        Key: fileName, // File name in S3
        Body: fileStream, // File stream
        ContentType: mimeType, // MIME type of the file
      };

      // Upload file to S3
      const data = await s3.upload(uploadParams).promise();

      // Delete the file from local storage after upload
      fs.unlinkSync(file.path);

      // Log the successful upload details
      console.log(`Successfully uploaded: ${fileName} to ${data.Location}`);

      // Generate the public URL for the uploaded file
      const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

      // Add the public URL to the array
      publicUrls.push(publicUrl);
    }

    // Return the array of URLs for all successfully uploaded files
    console.log('Public URLs:', publicUrls);
    return publicUrls;

  } catch (error) {
    // Delete the file if any error occurs during upload
    if (files && files.length > 0) {
      files.forEach(file => {
        if (file.path && fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }

    // Log and return null in case of error
    console.error("Error uploading files:", error);
    return null;
  }
};

module.exports = { uploadImagesOnAwsReturnUrls };
