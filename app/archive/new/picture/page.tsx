"use client";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import { CldUploadButton, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { addPicture } from "@/app/server-actions/addPicture";

function page() {
  const [imageValue, setImageValue] = useState<
    CloudinaryUploadWidgetInfo | string | null
  >();
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);

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
              className="input input-bordered w-full max-w-xl"
              name="title"
              id="title"
            />
          </div>

          <div className="mt-5">
            {isImageUploaded ? (
              <CldUploadButton
                children={"Image Uploaded"}
                className="btn btn-primary btn-disabled"
                uploadPreset="archive_picture"
              />
            ) : (
              <CldUploadButton
                onSuccess={(result) => {
                  console.log(result.info);
                  setImageValue(result.info);
                  setIsImageUploaded(true);
                }}
                onAbort={() => console.log("Aborting")}
                children={
                  isImageUploaded ? "Image Uploaded" : "Upload An Image"
                }
                className="btn btn-primary"
                uploadPreset="archive_picture"
              />
            )}
          </div>

          <input
            type="hidden"
            name="image"
            value={JSON.stringify(imageValue)}
          />
        </form>
      </section>
    </DefaultLayout>
  );
}

export default page;
