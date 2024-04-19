"use client";
import React from "react";
import { FaRegSquarePlus } from "react-icons/fa6";

function AddForm() {
  const openModal = () => {
    const modal = document.getElementById("add_modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <section className="w-full">
      <button onClick={openModal}>
        <FaRegSquarePlus />
      </button>
      <dialog id="add_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Note</h3>
          <form action="add_form" method="post">
            <div>
              <label className="form-control w-full max-w-xl">
                <div className="label">
                  <span className="label-text">Title</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  name="title"
                  id="title"
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xl">
                <div className="label">
                  <span className="label-text">Note</span>
                </div>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Type here"
                  name="desc"
                  id="desc"
                ></textarea>
              </label>
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
}

export default AddForm;
