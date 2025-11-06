import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloud = async (filePath, folder) => {
  const result = await cloudinary.v2.uploader.upload(filePath, { folder });
  return result.secure_url;
};
