import { Routes, Route } from "react-router";
import App from "../App.tsx";
import { About } from "./About.tsx";
import { Contact } from "./Contact.tsx";

export const PageRoutes = ({ allowAll = true }) => {
  if (allowAll) {
    return (
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    );
  }

  return <h1>UnAuthorized</h1>;
};
