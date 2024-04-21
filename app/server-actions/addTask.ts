"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function addTask(formData: FormData) {
  const title = formData.get("title");
  const description = formData.get("desc");
  const status = formData.get("status");

  const cookiesStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiesStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User not authenticated");
    return null;
  }

  const { error } = await supabase.from("task").insert([
    {
      title,
      description,
      status,
      user_id: user.id,
    },
  ]);

  if (error) {
    console.error("Error cant insert the data", error);
  }

  revalidatePath("/archive/task");
  redirect("/archive/task");

  return;
}
