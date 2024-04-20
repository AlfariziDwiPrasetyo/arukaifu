import { deleteNote } from "@/app/server-actions/deleteNote";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import RenderQuillContent from "./RenderQuillContent";

type CardProps = {
  title: string;
  note: string;
  id: string;
};

function Card({ title, note, id }: CardProps) {
  return (
    <div className="card w-52 md:w-96 text-neutral-content bg-neutral">
      <div className="card-body text-pretty">
        <h2 className="card-title tracking-tight">{title}</h2>
        <RenderQuillContent content={note} />
        <div className="flex card-actions justify-end">
          <button>
            <FaEdit />
          </button>
          <form action={deleteNote}>
            <input type="hidden" name="id" value={id} />
            <button type="submit">
              <MdDelete />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Card;
