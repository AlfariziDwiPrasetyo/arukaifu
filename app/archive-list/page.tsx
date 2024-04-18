import React from "react";

function page() {
  return (
    <section>
      <div className="flex flex-between">
        <h1 className="text-3xl md:5xl">Note</h1>
        <button className="btn btn-primary btn-wide">new note</button>
      </div>
    </section>
  );
}

export default page;
