import React from "react";
import ThemeController from "./ThemeController";
import { FiLogOut } from "react-icons/fi";

function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <h1 className="text-2xl tracking-tight pl-5">
          <b className="underline decoration-indigo-500">Aru</b>
          <b>kaifu</b>
        </h1>
      </div>
      <div className="flex-none p-3">
        <form action="/auth/signout" method="post">
          <button type="submit">
            <FiLogOut size={20} />
          </button>
        </form>
      </div>
      <div className="flex-none p-3">
        <ThemeController w="1.25" h="1.25" />
      </div>
    </div>
  );
}

export default Navbar;
