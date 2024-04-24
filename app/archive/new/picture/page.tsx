"use client";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import { CldUploadButton, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { addPicture } from "@/app/server-actions/addNote";

function page() {
  const [imageValue, setImageValue] = useState<
    CloudinaryUploadWidgetInfo | string
  >();

  return (
    <DefaultLayout>
      <section className="max-w-full p-6">
        <form action={addPicture}>
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

          <div className="mt-5">
            <CldUploadButton
              onSuccess={(result) => {
                setImageValue(result.info);
              }}
              onAbort={() => console.error("Aborting")}
              children={"Upload An Image"}
              className="btn btn-primary"
              uploadPreset="archive_picture"
            />
          </div>

          <input
            type="hidden"
            name="image"
            value={imageValue as string | undefined}
          />
        </form>
      </section>
    </DefaultLayout>
  );
}

export default page;
