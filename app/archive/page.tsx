import Card from "@/components/Card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { FaRegSquarePlus } from "react-icons/fa6";
import React from "react";
import Link from "next/link";

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
    <main className="max-w-full w-full flex flex-col justify-center items-center">
      <section className="flex items-center flex-between w-full p-6">
        <div className="w-full">
          <h1 className="text-3xl md:3xl">Notes</h1>
        </div>
        <div>
          <button aria-label="add note">
            <Link aria-label="Go to page new/notes" href={"/archive/new/notes"}>
              <FaRegSquarePlus />
            </Link>
          </button>
        </div>
      </section>

      <article className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {notes?.map((note) => (
          <Card
            key={note.id}
            title={note.title}
            note={note.note}
            id={note.id}
          />
        ))}
      </article>
    </main>
  );
}

export default page;
