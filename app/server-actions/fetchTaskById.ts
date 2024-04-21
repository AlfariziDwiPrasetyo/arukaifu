"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function fetchTaskById(id: string) {
  const cookiesStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiesStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User not authenticated");
    return;
  }

  const { data, error } = await supabase
    .from("task")
    .select("*")
    .match({ id, user_id: user.id })
    .single();

  if (error) {
    console.error("Error cant fetch the data", error.message);
    return null;
  }

  return data;
}
