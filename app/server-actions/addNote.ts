"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function addNote(formData: FormData) {
  const title = formData.get("title");
  const note = formData.get("note");

  console.log(title, note);

  const cookiesStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiesStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User is not authenticated");
    return;
  }

  const { error } = await supabase.from("notes").insert([
    {
      title,
      note,
      user_id: user.id,
    },
  ]);

  if (error) {
    console.error("Error cant insert the data", error);
  }

  revalidatePath("/archive");
  return { message: "Success" };
}
