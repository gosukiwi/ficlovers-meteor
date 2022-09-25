import React from "react";
import { Meteor } from "meteor/meteor";
import { createRoot } from "react-dom/client";
import App from "/imports/ui/App";
import i18n from "/imports/ui/i18n";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "/imports/ui/theme";

// const getLang = () =>
//   navigator.languages?.[0] ||
//   navigator.language ||
//   navigator.browserLanguage ||
//   navigator.userLanguage ||
//   "en-US";

Meteor.startup(() => {
  // i18n.setLocale(getLang());
  // For now the only locale is "en-US".
  // TODO: add spanish before launch!
  i18n.setLocale("en-US");

  const container = document.getElementById("react-target");
  const root = createRoot(container);

  root.render(
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  );
});
