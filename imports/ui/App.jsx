import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import FicsIndex from "./pages/FicsIndex";
import FicsNew from "./pages/FicsNew";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="fics" element={<FicsIndex />} />
        <Route path="write" element={<FicsNew />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
