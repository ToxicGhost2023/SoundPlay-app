// import { cookies } from "next/headers";

import React from "react";
import Header from "./Header";

function Layout({ children }) {
  return (
    <main className="scroll-smooth">
      <Header />
      {children}
    </main>
  );
}

export default Layout;
