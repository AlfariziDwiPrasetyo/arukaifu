"use client";
import React from "react";
import Link from "next/link";
import { FaRegSquarePlus } from "react-icons/fa6";
import { usePathname } from "next/navigation";

function ArchivePageController() {
  const pathname = usePathname();

  const link = {
    notes: "/archive/new/notes",
    picture: "/archive/new/picture",
    task: "/archive/new/task",
  };

  const linkNewArchive = () => {
    if (pathname == "/archive") {
      return link.notes;
    }
    if (pathname == "/archive/picture") {
      return link.picture;
    }
    if (pathname == "/archive/task") {
      return link.task;
    }

    return "";
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <section className="flex items-center flex-between w-full p-6">
      <div className="w-full flex space-x-4">
        <h1
          className={`text-2xl md:3xl lg:3xl ${
            isActive("/archive")
              ? "underline decoration-2 underline-offset-4"
              : ""
          }`}
        >
          <Link aria-label="go to homepage" href="/archive">
            Notes
          </Link>
        </h1>
        <h1
          className={`text-2xl md:3xl lg:3xl ${
            isActive("/archive/picture")
              ? "underline decoration-2 underline-offset-4"
              : ""
          }`}
        >
          <Link aria-label="go to picture page" href="/archive/picture">
            Picture
          </Link>
        </h1>
        <h1
          className={`text-2xl md:3xl lg:3xl ${
            isActive("/archive/task")
              ? "underline decoration-2 underline-offset-4"
              : ""
          }`}
        >
          <Link aria-label="got to task page" href="/archive/task">
            Tasks
          </Link>
        </h1>
      </div>
      <div>
        <button aria-label="add note">
          <Link aria-label="Go to page new/notes" href={linkNewArchive()}>
            <FaRegSquarePlus />
          </Link>
        </button>
      </div>
    </section>
  );
}

export default ArchivePageController;
