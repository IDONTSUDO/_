import React from "react";
import ReactDOM from "react-dom/client";
import "reflect-metadata";
import { extensions } from "./core/extensions/extensions";
import { RouterProvider } from "react-router-dom";
import { router } from "./core/routers/routers";
 
extensions();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
    <RouterProvider router={router} />
  </>
);
