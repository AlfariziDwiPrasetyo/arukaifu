"use client";
import React, { useState, useEffect } from "react";
import { FaSave } from "react-icons/fa";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import fetchTaskById from "@/app/server-actions/fetchTaskById";
import { updateTask } from "@/app/server-actions/updateTask";

function Page({ params }: { params: { id: string } }) {
  const [content, setContent] = useState({
    title: "",
    description: "",
  });
  const id = params.id;

  const [selectValue, setSelectValue] = useState<string>("not-started");

  const handleValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      const { title, description } = await fetchTaskById(id);
      setContent({
        title,
        description,
      });
    };
    getData();
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent((prevContent) => ({
      ...prevContent,
      title: e.target.value,
    }));
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent((prevContent) => ({
      ...prevContent,
      description: e.target.value,
    }));
  };

  return (
    <DefaultLayout>
      <section className="max-w-full p-6">
        <form action={updateTask}>
          <div className="flex justify-end">
            <button type="submit" className="btn">
              <FaSave />
            </button>
          </div>

          <div className="w-full mt-5">
            <input
              type="text"
              placeholder="Title"
              value={content.title}
              className="input input-bordered w-full"
              name="title"
              id="title"
              onChange={handleTitleChange}
            />
          </div>

          <div className="text-base-content mt-5">
            <textarea
              className="w-full textarea textarea-bordered"
              value={content.description}
              placeholder="Type here ..."
              onChange={handleDescriptionChange}
              name="desc"
              id="desc"
            />
          </div>

          <div className="w-full">
            <select
              title="status"
              id="status"
              className="select select-bordered w-full max-w-xs"
              value={selectValue}
              onChange={handleValueChange}
            >
              <option value="not-started">not-started</option>
              <option value="on-progress">on-progress</option>
              <option value="complete">complete</option>
            </select>
          </div>

          <input type="hidden" id="status" name="status" value={selectValue} />

          <input type="hidden" name="id" value={id} />
        </form>
      </section>
    </DefaultLayout>
  );
}

export default Page;
