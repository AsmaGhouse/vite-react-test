import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { PageRoutes } from "./pages/PageRoutes";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <PageRoutes allowAll />
    </BrowserRouter>
  </StrictMode>
);
