"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addNote(formData: FormData) {
  const title = formData.get("title");
  const image = formData.get("image");

  const cookiesStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiesStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User is not authenticated");
    return;
  }

  const { error } = await supabase.from("picture").insert([
    {
      title,
      image,
      user_id: user.id,
    },
  ]);

  if (error) {
    console.error("Error cant insert the data", error);
  }

  revalidatePath("/archive/picture");
  redirect("/archive/picture");

  return {
    status: 302,
    body: { message: "Success" },
  };
}
