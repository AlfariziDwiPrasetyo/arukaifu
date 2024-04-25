import deleteTask from "@/app/server-actions/deleteTask";
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import deleteImage from "@/app/server-actions/deleteImage";

type PictureCardProps = {
  title: string;
  image: string;
  id: string;
  imageId: string;
};

function PictureCard({ title, image, id, imageId }: PictureCardProps) {
  return (
    <div className="mt-5">
      <div className="w-full bg-base-300 max-w-full rounded-md">
        <div className="max-w-xl p-3">
          <Image
            className="rounded-md w-92 h-52 object-cover"
            loading="lazy"
            alt={title}
            src={image}
            height={300}
            width={300}
          />
          <div className="flex mt-3 justify-end">
            <form action={deleteImage}>
              <input type="hidden" name="imageId" value={imageId} />
              <input type="hidden" name="id" value={id} />
              <button type="submit" aria-label="delete image">
                <MdDelete size={15} />
              </button>
            </form>
            <Link href={`/archive/update/picture/${id}`}>
              <button className="ml-3">
                <MdEdit size={15} />
              </button>
            </Link>
          </div>
        </div>
        <div className="px-3 pb-3 -mt-3">
          <h1 className="text-bold text-2xl text-base-content">{title}</h1>
        </div>
      </div>
    </div>
  );
}

export default PictureCard;
