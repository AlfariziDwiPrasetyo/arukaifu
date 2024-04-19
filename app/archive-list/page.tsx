import AddForm from "@/components/AddForm";
import Card from "@/components/Card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

async function page() {
  const cookiesStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiesStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: archive, error } = await supabase
    .from("archives")
    .select("*")
    .eq("user_id", user?.id);

  if (!user) {
    console.error("User is not authenticated");
    return;
  }

  if (error) {
    console.log(error.message);
  }

  console.log(archive);

  return (
    <main className="max-w-full w-full flex flex-col justify-center items-center">
      <section className="flex items-center flex-between w-full p-6">
        <div className="w-full">
          <h1 className="text-3xl md:3xl">Notes</h1>
        </div>
        <div>
          <AddForm />
        </div>
      </section>

      <article className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        <Card />
        <Card />
        <Card />
      </article>
    </main>
  );
}

export default page;
