import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import FicsIndex from "./pages/FicsIndex";
import Write from "./pages/Write";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NewFic from "./pages/NewFic";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<FicsIndex />} />
        <Route path="write" element={<Write />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="new" element={<NewFic />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
