import React from "react";
import Navbar from "../Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arukaifu",
  description:
    "Arukaifu was built for me to archive something important that i frequently forget",
};

function DefaultLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default DefaultLayout;
