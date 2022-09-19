import React from "react";
import TypewriterEffect from "typewriter-effect";
import { useTranslator } from "/imports/ui/i18n";

export default function Typewriter() {
  const t = useTranslator();

  return (
    <TypewriterEffect
      onInit={(typewriter) => {
        typewriter
          .typeString(t("typewritter.first"))
          .pauseFor(1500)
          .deleteAll()
          .typeString(t("typewritter.second"))
          .pauseFor(1500)
          .deleteAll()
          .typeString(t("typewritter.third"))
          .pauseFor(1500)
          .deleteAll()
          .typeString(t("typewritter.fourth"))
          .pauseFor(1500)
          .deleteAll()
          .start();
      }}
      options={{ loop: true }}
    />
  );
}
