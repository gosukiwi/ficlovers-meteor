import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import FicsIndex from "./pages/FicsIndex";
import Write from "./pages/Write";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NewFic from "./pages/NewFic";
import Editor from "./pages/Editor/Editor";
import Fic from "./pages/Fic";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<FicsIndex />} />
        <Route path="write" element={<Write />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="new" element={<NewFic />} />
        <Route path="editor/:id" element={<Editor />} />
        <Route path="fics/:id" element={<Fic />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
