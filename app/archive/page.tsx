import Card from "@/components/Card";
import HomeLayout from "@/components/layouts/HomeLayout";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

async function page() {
  const cookiesStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiesStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: notes, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user?.id);

  if (!user) {
    console.error("User is not authenticated");
    return;
  }

  if (error) {
    console.error(error.message);
  }

  return (
    <HomeLayout>
      <article className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 md:p-6 lg:p-8">
        {notes?.map((note) => (
          <Card
            key={note.id}
            title={note.title}
            note={note.note}
            id={note.id}
          />
        ))}
      </article>
    </HomeLayout>
  );
}

export default page;
