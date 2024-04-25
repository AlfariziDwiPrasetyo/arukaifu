import HomeLayout from "@/components/layouts/HomeLayout";
import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import TasksCard from "@/components/TasksCard";

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
    .from("task")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error cant fetch the data", error);
    return;
  }

  return (
    <HomeLayout>
      <article className="w-full flex space-y-5 flex-col justify-between items-center p-2 md:p-2 lg:p-3">
        {tasks?.map((task) => (
          <TasksCard
            key={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
            id={task.id}
          />
        ))}
      </article>
    </HomeLayout>
  );
}

export default page;
