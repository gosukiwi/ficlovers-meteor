import React from "react";
import { Meteor } from "meteor/meteor";
import i18n from "meteor/universe:i18n";
import { createRoot } from "react-dom/client";
import App from "/imports/ui/App";
import { BrowserRouter } from "react-router-dom";
// import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
// locales
import "/imports/locales/en-us.i18n.yml";

// const getLang = () =>
//   navigator.languages?.[0] ||
//   navigator.language ||
//   navigator.browserLanguage ||
//   navigator.userLanguage ||
//   "en-US";

Meteor.startup(() => {
  // const theme = extendTheme({
  //   shadows: {
  //     outline: "0 0 0 3px red",
  //   },
  // });

  // i18n.setLocale(getLang());
  // For now the only locale is "en-US".
  // TODO: add spanish before launch!
  i18n.setLocale("en-US");

  const container = document.getElementById("react-target");
  const root = createRoot(container);

  root.render(
    <ChakraProvider>
      {/* <ChakraProvider theme={theme}> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  );
});
