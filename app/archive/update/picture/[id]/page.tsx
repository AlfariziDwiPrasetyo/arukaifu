"use client";
import React, { useState, useEffect, ComponentType } from "react";
import { FaSave } from "react-icons/fa";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { updatePicture } from "@/app/server-actions/updatePicture";
import { CloudinaryUploadWidgetInfo, CldUploadButton } from "next-cloudinary";
import fetchPictureById from "@/app/server-actions/fetchPictureById";

function Page({ params }: { params: { id: string } }) {
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);
  const [content, setContent] = useState({
    title: "",
    image_id: "",
  });
  const [imageValue, setImageValue] = useState<
    CloudinaryUploadWidgetInfo | string | null
  >();
  const id = params.id;

  useEffect(() => {
    const getData = async () => {
      const { title, image, image_id } = await fetchPictureById(id);
      setContent({
        title,
        image_id,
      });
      setImageValue(image);
    };
    getData();
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent((prevContent) => ({
      ...prevContent,
      title: e.target.value,
    }));
  };

  return (
    <DefaultLayout>
      <section className="max-w-full p-6">
        <form action={updatePicture}>
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
          <input type="hidden" name="imageId" value={content.image_id} />
          <input type="hidden" name="id" value={id} />
        </form>
      </section>
    </DefaultLayout>
  );
}

export default Page;
