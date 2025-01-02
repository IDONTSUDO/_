import React from "react";
import ReactDOM from "react-dom/client";
import "reflect-metadata";
import { extensions } from "./core/extensions/extensions";
import { RouterProvider } from "react-router-dom";
import { router } from "./core/routers/routers";
import { ThemeStore } from "./core/store/theme_store";

extensions();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
export const themeStore = new ThemeStore();

root.render(
  <>
    <RouterProvider router={router} />
  </>
);