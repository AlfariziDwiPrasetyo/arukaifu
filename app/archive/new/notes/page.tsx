"use client";
import ReactQuill from "react-quill";
import React, { useState, useEffect, ComponentType } from "react";
import { FaSave } from "react-icons/fa";
import "react-quill/dist/quill.snow.css";
import { addNote } from "@/app/server-actions/addNote";

function Page() {
  const [isClient, setIsClient] = useState(false);
  const [ReactQuill, setReactQuill] = useState<ComponentType<any> | null>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);

      import("react-quill").then((module) => {
        setReactQuill(() => module.default as ComponentType<any>);
      });
    }
  }, []);

  if (!isClient || !ReactQuill) {
    return null;
  }

  return (
    <>
      <section className="max-w-full p-6">
        <form action={addNote}>
          <div className="flex justify-end">
            <button type="submit" className="btn">
              <FaSave />
            </button>
          </div>

          <div className="mt-5">
            <input
              type="text"
              placeholder="Title.."
              className="input input-bordered w-full max-w-xl"
              name="title"
              id="title"
            />
          </div>

          <div className="w-full text-base-content mt-5">
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              placeholder="Type here ..."
            />
          </div>

          <input type="hidden" name="note" id="note" value={value} />
        </form>
      </section>
    </>
  );
}

export default Page;
