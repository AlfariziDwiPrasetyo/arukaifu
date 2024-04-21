"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateTask(formData: FormData) {
  const title = formData.get("title");
  const description = formData.get("desc");
  const status = formData.get("status");
  const id = formData.get("id");

  const cookiesStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiesStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User is not authenticated");
    return;
  }

  const { error } = await supabase
    .from("task")
    .update({
      title,
      description,
      status,
    })
    .match({ id, user_id: user.id });

  if (error) {
    console.error("Error cant update the data", error);
    return;
  }

  revalidatePath("/archive/task");
  redirect("/archive/task");

  return {
    status: 302,
    message: "Success",
  };
}
