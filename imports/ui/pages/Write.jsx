import React from "react";
import { useTranslator } from "/imports/ui/i18n";
import { Heading, Flex, Button } from "@chakra-ui/react";
import FicList from "/imports/ui/FicList";
import { Link } from "react-router-dom";

export default function Write() {
  const t = useTranslator();

  return (
    <Flex gap="12px" flexDirection="column">
      <Heading size="md">{t("write.work_in_progress")}</Heading>
      <FicList />
      <Heading size="md">{t("write.published")}</Heading>
      <FicList />
      <Button as={Link} to="/new" colorScheme="cyan" color="white">
        {t("write.new")}
      </Button>
    </Flex>
  );
}
