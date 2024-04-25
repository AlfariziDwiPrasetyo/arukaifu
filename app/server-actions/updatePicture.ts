"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import deleteImageInCloudinary from "@/utils/deleteImageInCloudinary";

export async function updatePicture(formData: FormData) {
  const title = formData.get("title");
  const imageValue = formData.get("image");
  const { public_id, secure_url: image } = JSON.parse(imageValue as string);
  const id = formData.get("id");
  const pastImageId = formData.get("imageId");

  const cookiesStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiesStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User is not authenticated");
    return;
  }

  const deleteImage = await deleteImageInCloudinary(pastImageId as string);

  if (deleteImage?.success === true) {
    const { error } = await supabase
      .from("picture")
      .update({
        title,
        image,
        image_id: public_id,
      })
      .match({ id, user_id: user.id });

    if (error) {
      console.error("Error cant update the data", error);
      return;
    }

    revalidatePath("/archive/picture");
    redirect("/archive/picture");
  } else {
    return console.log("Error cant update the picture");
  }
}
