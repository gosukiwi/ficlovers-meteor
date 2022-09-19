import React from "react";
import { Routes, Route } from "react-router-dom";
import i18n from "meteor/universe:i18n";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import FicsIndex from "./pages/FicsIndex";
import FicsNew from "./pages/FicsNew";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
// locales
import "/imports/locales/en-us.i18n.yml";

const getLang = () =>
  navigator.languages?.[0] ||
  navigator.language ||
  navigator.browserLanguage ||
  navigator.userLanguage ||
  "en-US";

export default function App() {
  // i18n.setLocale(getLang());
  // For now the only locale is "en-US".
  // TODO: add spanish before launch!
  i18n.setLocale("en-US");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="fics" element={<FicsIndex />} />
        <Route path="write" element={<FicsNew />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
