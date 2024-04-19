"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function deleteNote(formData: FormData) {
  const id = formData.get("id");

  const cookiesStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiesStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User not authenticated");
    return;
  }

  const { data, error } = await supabase.from("notes").delete().eq("id", id);

  if (error) {
    console.error("Error cant delete", error);
    return;
  }

  revalidatePath("/archive-list");

  return { message: "Success" };
}
