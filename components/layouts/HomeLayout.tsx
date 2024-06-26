import React from "react";
import Navbar from "../Navbar";
import ArchivePageController from "../ArchivePageController";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive List",
  description: "This is archive list",
};

function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <main className="max-w-full w-full flex flex-col justify-center items-center">
        <ArchivePageController />
        {children}
      </main>
    </>
  );
}

export default HomeLayout;
