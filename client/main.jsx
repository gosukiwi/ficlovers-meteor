import React from "react";
import { Meteor } from "meteor/meteor";
import { createRoot } from "react-dom/client";
import App from "/imports/ui/App";
import { BrowserRouter } from "react-router-dom";
import "meteor/universe:i18n";
import { ChakraProvider } from "@chakra-ui/react";

Meteor.startup(() => {
  const container = document.getElementById("react-target");
  const root = createRoot(container);

  root.render(
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  );
});
