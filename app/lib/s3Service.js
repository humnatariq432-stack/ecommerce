import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
// Initialize the S3 client
const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  },
});

/**
 * Upload a file to S3
 * @param {Buffer} fileBuffer - The file buffer
 * @param {string} fileName - Original file name (for naming)
 * @param {string} contentType - MIME type
 * @returns {string} fileKey if success, or throws error
 */
export async function uploadFileToS3(fileBuffer, fileName, contentType) {
  const fileKey = `${fileName}`;
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileKey,
    Body: fileBuffer,
    ContentType: contentType,
  };

  try {
    const command = new PutObjectCommand(params);
    const result = await s3Client.send(command);
    console.log('✅ File uploaded to S3:', fileKey, result);
    return fileKey;
  } catch (error) {
    console.error('❌ Failed to upload file to S3:', error);
    throw new Error('File upload to S3 failed');
  }
}

/**
 * Delete a file from S3
 * @param {string} fileKey - S3 object key
 * @returns {object} result if success, or throws error
 */
export async function deleteFileFromS3(fileKey) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileKey,
  };

  try {
    const command = new DeleteObjectCommand(params);
    const result = await s3Client.send(command);
    console.log('🗑️ File deleted from S3:', fileKey, result);
    return result;
  } catch (error) {
    console.error('❌ Failed to delete file from S3:', error);
    throw new Error('File deletion from S3 failed');
  }
}

/**
 * Generate a secure signed URL for accessing a private S3 file
 * @param {string} fileKey - The key (path) of the file in S3
 * @param {number} expiresIn - Expiry time in seconds (default: 300s)
 * @returns {string} Signed URL
 */
export async function getSignedUrlForFile(fileKey, expiresIn = 300, forceDownload = false) {
  try {
    let key = fileKey;
    if (typeof key === 'object' && key !== null) {
      key = key.src || key.fileKey || key.path || key.picSrc || key.key || key.liveSrc || (typeof key.toString === 'function' && key.toString() !== '[object Object]' ? key.toString() : null);
    }
    if (!key || typeof key !== 'string') {
      console.warn('⚠️ getSignedUrlForFile called with invalid fileKey:', fileKey);
      return null;
    }

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      ...(forceDownload && { ResponseContentDisposition: 'attachment' }),
    });

    const result = await getSignedUrl(s3Client, command, { expiresIn }); // in seconds
    console.log('🔐 Signed URL generated:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to generate signed URL:', error);
    return null;
  }
}

/**
 * Download a file from S3 as Base64 string
 * @param {string} fileKey - S3 object key
 * @returns {string} Base64 string of the file
 */
export async function downloadFileAsBase64(fileKey) {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileKey,
    });

    const response = await s3Client.send(command);
    const streamToBuffer = (stream) =>
      new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks)));
      });

    const buffer = await streamToBuffer(response.Body);
    return `data:${response.ContentType};base64,${buffer.toString('base64')}`;
  } catch (error) {
    console.error('❌ Failed to download file from S3 as base64:', error);
    throw new Error('File download from S3 failed');
  }
}

/**
 * Get total size of all objects with a given prefix (folder path) in S3
 * @param {string} prefix - The folder prefix (e.g. companyId/)
 * @returns {number} Total size in bytes
 */
export async function getS3FolderSize(prefix) {
  try {
    let totalSize = 0;
    let isTruncated = true;
    let continuationToken = undefined;

    while (isTruncated) {
      const command = new ListObjectsV2Command({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      });

      const response = await s3Client.send(command);
      
      if (response.Contents) {
        totalSize += response.Contents.reduce((acc, curr) => acc + curr.Size, 0);
      }
      
      isTruncated = response.IsTruncated;
      continuationToken = response.NextContinuationToken;
    }

    console.log(`📊 S3 Size for prefix '${prefix}': ${totalSize} bytes`);
    return totalSize;
  } catch (error) {
    console.error('❌ Failed to get S3 folder size:', error);
    return 0; // Return 0 instead of throwing to avoid breaking the dashboard if S3 fails
  }
}

