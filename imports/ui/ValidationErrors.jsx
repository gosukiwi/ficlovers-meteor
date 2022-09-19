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

  const details = JSON.parse(error.details);

  return (
    <Alert status="error" flexDirection="column">
      <Stack direction="row">
        <AlertIcon />
        <AlertTitle>{t("validation.title")}</AlertTitle>
      </Stack>
      <AlertDescription textAlign="center">
        {Object.entries(details).map(([index, { name, type }]) => {
          const message = t(`validation.${type}`, { field: name });

          return (
            <Text textTransform="capitalize" key={index}>
              {message}
            </Text>
          );
        })}
      </AlertDescription>
    </Alert>
  );
}
