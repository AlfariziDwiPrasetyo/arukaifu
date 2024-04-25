"use server";
import { revalidatePath } from "next/cache";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import deleteImageInCloudinary from "@/utils/deleteImageInCloudinary";

export default async function deleteImage(formData: FormData) {
  try {
    const id = formData.get("id");
    const imageId = formData.get("imageId");
    console.log({ imageId, id });

    const cookiesStore = cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookiesStore,
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("User not authenticated");
      return;
    }
    const publicId = formData.get("imageId") as string;

    if (!publicId || Array.isArray(publicId)) {
      console.log("Invalid Public_id");
      return;
    }

    const deleteImage = await deleteImageInCloudinary(imageId as string);

    if (deleteImage?.success === true) {
      const { error } = await supabase.from("picture").delete().eq("id", id);
      if (error) {
        console.error("Error cant delete", error);
        return;
      }
      revalidatePath("/archive/picture");
      console.log("Successfully Delete The Image");
      return;
    } else {
      return console.error("Image cant be deleted");
    }
  } catch (error: any) {
    return console.error(error.message);
  }
}
