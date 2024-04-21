"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function deleteTask(formData: FormData) {
  const id = formData.get("id");

  const cookiesStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiesStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User not authenticated");
    return null;
  }

  const { error } = await supabase.from("task").delete().eq("id", id);

  if (error) {
    console.error("Error cant delete the data", error);
  }

  revalidatePath("/archive/task");
  redirect("/archive/task");

  return;
}
