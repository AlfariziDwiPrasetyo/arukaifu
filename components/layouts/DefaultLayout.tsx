import React from "react";
import Navbar from "../Navbar";

function DefaultLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default DefaultLayout;
