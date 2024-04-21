"use client";
import React, { ChangeEvent, useState } from "react";
import { FaSave } from "react-icons/fa";
import "react-quill/dist/quill.bubble.css";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import addTask from "@/app/server-actions/addTask";

function Page() {
  const [selectValue, setSelectValue] = useState<string>("not-started");

  const handleValueChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };

  return (
    <DefaultLayout>
      <section className="max-w-full p-6">
        <form action={addTask}>
          <div className="flex justify-end">
            <button type="submit" className="btn">
              <FaSave />
            </button>
          </div>

          <div className="mt-5">
            <input
              type="text"
              placeholder="Title.."
              className="input input-bordered w-full max-w-full"
              name="title"
              id="title"
            />
          </div>

          <div className="w-full text-base-content mt-5">
            <textarea
              placeholder="Description.."
              className="textarea textarea-bordered w-full max-w-full"
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
        </form>
      </section>
    </DefaultLayout>
  );
}

export default Page;
