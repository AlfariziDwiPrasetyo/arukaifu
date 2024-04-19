import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Card() {
  return (
    <div className="card w-52 md:w-96 text-neutral-content bg-neutral">
      <div className="card-body text-pretty">
        <h2 className="card-title tracking-tight">Card title!</h2>
        <p className="leading-5 line-clamp-3 tracking-thight">
          If a dog chews shoes whose shoes does he choose? If a dog chews shoes
          whose shoes does he choose? If a dog chews shoes whose shoes does he
          choose? If a dog chews shoes whose shoes does he choose? If a dog
          chews shoes whose shoes does he choose?
        </p>
        <div className="flex card-actions justify-end">
          <button>
            <FaEdit />
          </button>
          <button>
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
