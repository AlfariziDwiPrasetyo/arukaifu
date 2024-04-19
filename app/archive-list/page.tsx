import Card from "@/components/Card";
import React from "react";
import { FaRegSquarePlus } from "react-icons/fa6";

function page() {
  return (
    <main className="max-w-full w-full flex flex-col justify-center items-center">
      <section className="flex items-center flex-between w-full p-6">
        <div className="w-full">
          <h1 className="text-3xl md:3xl">Notes</h1>
        </div>
        <div>
          <button className="">
            <FaRegSquarePlus />
          </button>
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
