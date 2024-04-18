import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Card() {
  return (
    <div className="card w-52 md:w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Card title!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
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
