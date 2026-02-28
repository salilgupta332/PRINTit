const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const crypto = require("crypto");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// upload
exports.uploadToS3 = async (file) => {
  const fileExt = file.originalname.split(".").pop();
  const key = `assignments/${crypto.randomBytes(16).toString("hex")}.${fileExt}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );

  return key; // 🔴 now we return KEY not URL
};

// secure download link
exports.getSignedFileUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,

    ResponseContentDisposition: "inline",
    ResponseContentType: "application/pdf",
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
  return signedUrl;
};
