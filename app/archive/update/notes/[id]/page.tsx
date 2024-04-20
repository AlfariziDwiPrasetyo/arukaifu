"use client";
import React, { useState, useEffect, ComponentType } from "react";
import { FaSave } from "react-icons/fa";
import "react-quill/dist/quill.bubble.css";
import fetchDataById from "@/app/server-actions/fetchNoteById";
import { updateNote } from "@/app/server-actions/updateNote";

function Page({ params }: { params: { id: string } }) {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [ReactQuill, setReactQuill] = useState<ComponentType<any> | null>(null);
  const [content, setContent] = useState({
    title: "",
    note: "",
  });
  const id = params.id;
  console.log(content);

  useEffect(() => {
    const getData = async () => {
      const { title, note } = await fetchDataById(id);
      setContent({
        title,
        note,
      });
    };
    getData();
  }, []);

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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent((prevContent) => ({
      ...prevContent,
      title: e.target.value,
    }));
  };

  const handleNoteChange = (value: string) => {
    setContent((prevContent) => ({
      ...prevContent,
      note: value,
    }));
  };

  return (
    <>
      <section className="max-w-full p-6">
        <form action={updateNote}>
          <div className="flex justify-end">
            <button type="submit" className="btn">
              <FaSave />
            </button>
          </div>

          <div className="mt-5">
            <input
              type="text"
              placeholder="Title"
              value={content.title}
              className="input input-bordered w-full max-w-xl"
              name="title"
              id="title"
              onChange={handleTitleChange}
            />
          </div>

          <div className="w-full text-base-content mt-5">
            <ReactQuill
              theme="bubble"
              value={content.note}
              placeholder="Type here ..."
              onChange={handleNoteChange}
            />
          </div>

          <input
            type="hidden"
            name="note"
            id="note"
            defaultValue={content.note}
          />
          <input type="hidden" name="id" value={id} />
        </form>
      </section>
    </>
  );
}

export default Page;
