import { Storage } from '@google-cloud/storage';
import path from 'path';

// Set the path to your service account key (use the environment variable or directly specify it)
const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS || 'path/to/your/service-account-file.json', // Use environment variable or a direct path
});

const bucketName = 'mjtek-upload-storage'; // Replace with your actual bucket name
const bucket = storage.bucket(bucketName);

// Function to upload file to Google Cloud Storage
export const uploadFileToGoogleCloud = async (fileBuffer: Buffer, fileName: string, mimetype: string): Promise<string> => {
  const file = bucket.file(fileName);

  const stream = file.createWriteStream({
    resumable: false,
    contentType: mimetype,
  });

  return new Promise((resolve, reject) => {
    stream.on('finish', () => {
      // Return the file URL once upload finishes
      const fileUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      resolve(fileUrl);
    });

    stream.on('error', (error) => {
      console.error('Error uploading to Google Cloud Storage:', error);
      reject(new Error('Failed to upload file.'));
    });

    // Write the file buffer to Google Cloud Storage
    stream.end(fileBuffer);
  });
};

export const deleteFileFromGoogleCloud = async (filePath: string) => {
  try {
    await storage.bucket(bucketName).file(filePath).delete();
    console.log(`File deleted: ${filePath}`);
  } catch (error) {
    console.error("Error deleting file from GCS:", error);
  }
};

export const getFileFromGoogleCloud = async (filePath: string): Promise<Buffer> => {
  try {
    const file = bucket.file(filePath);
    const [exists] = await file.exists();
    
    if (!exists) {
      throw new Error('File not found in storage');
    }

    const [fileContents] = await file.download();
    return fileContents;
  } catch (error) {
    console.error("Error retrieving file from GCS:", error);
    throw error;
  }
};