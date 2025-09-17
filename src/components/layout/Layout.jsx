import React from "react";
import Header from "./Header";
import ScrollLayout from "../ui/ScrollLayout";

export default function Layout({ children }) {
  return (
    <>
      {/* <ScrollLayout> */}
      <Header />
      {children}
      {/* </ScrollLayout> */}
    </>
  );
}
