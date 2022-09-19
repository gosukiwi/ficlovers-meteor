import { Meteor } from "meteor/meteor";
import React from "react";
import { useTranslator } from "/imports/ui/i18n";
import {
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
} from "@chakra-ui/react";

export default function ValidationError({ error }) {
  const t = useTranslator();
  if (!error) return null;

  let message;
  if (error.details) {
    const details = JSON.parse(error.details);
    message = Object.entries(details).map(([index, { name, type }]) => {
      const errorMessage = t(`validation.${type}`, { field: name });

      return (
        <Text textTransform="capitalize" key={index}>
          {errorMessage}
        </Text>
      );
    });
  } else if (Meteor.isDevelopment) {
    message = error.reason;
  } else {
    message = null;
  }

  return (
    <Alert status="error" flexDirection="column">
      <Stack direction="row">
        <AlertIcon />
        <AlertTitle>{t("validation.title")}</AlertTitle>
      </Stack>
      <AlertDescription textAlign="center">{message}</AlertDescription>
    </Alert>
  );
}
