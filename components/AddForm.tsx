"use client";
import React from "react";
import { addNote } from "@/app/server-actions/addNote";
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
          <form action={addNote}>
            {/* Input modal */}
            <div>
              <label htmlFor="title" className="form-control w-full max-w-xl">
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
              <label htmlFor="note" className="form-control w-full max-w-xl">
                <div className="label">
                  <span className="label-text">Note</span>
                </div>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Type here"
                  name="note"
                  id="note"
                ></textarea>
              </label>
            </div>

            {/* save modal button */}
            <div className="flex justify-end">
              <button type="submit" className="btn right my-5">
                Save
              </button>
            </div>
          </form>

          {/* Close the modal button */}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </section>
  );
}

export default AddForm;
