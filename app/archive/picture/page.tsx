import HomeLayout from "@/components/layouts/HomeLayout";
import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import PictureCard from "@/components/PictureCard";

async function page() {
  const cookiesStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookiesStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User not authenticated");
    return;
  }

  const { data: tasks, error } = await supabase
    .from("picture")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error cant fetch the data", error);
    return;
  }

  return (
    <HomeLayout>
      <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 md:p-6 lg:p-8">
        {tasks?.map((task) => (
          <PictureCard
            key={task.id}
            id={task.id}
            title={task.title}
            image={task.image}
            imageId={task.image_id}
          />
        ))}
      </article>
    </HomeLayout>
  );
}

export default page;
