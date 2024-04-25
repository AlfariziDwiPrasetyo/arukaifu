"use server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function deleteImageInCloudinary(imageId: string) {
  try {
    const publicId = imageId;

    if (!publicId || Array.isArray(publicId)) {
      console.log("Invalid Public_id");
      return;
    }

    const result = await cloudinary.v2.uploader.destroy(publicId);

    if (result.result === "ok") {
      console.log("Successfully Delete The Image");
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  } catch (error: any) {
    console.log(error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}
