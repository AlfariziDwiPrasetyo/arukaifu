"use server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

export default async function fetchAllNote() {
  const cookiesStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookiesStore,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User is not authenticated");
    return;
  }

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error cant fetch the data", error.message);
    return null;
  }

  revalidatePath("/archive");

  return data;
}
