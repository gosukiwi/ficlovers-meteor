import { Meteor } from "meteor/meteor";
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { useParams } from "react-router-dom";
import { useTranslator } from "/imports/ui/i18n";
import FicsCollection from "/imports/db/FicsCollection";
import {
  Box,
  Heading,
  Flex,
  Text,
  Collapse,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";

function ChapterList() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex
      direction="column"
      onClick={onToggle}
      mt={3}
      bg="white"
      p={5}
      borderRadius="md"
    >
      <Flex cursor="pointer" alignItems="center">
        <Box flexGrow={1}>
          <Text as="b">A dummy Chapter</Text>
          <Text color="gray.500">Chapter 1 of 4</Text>
        </Box>
        {isOpen ? <FiChevronDown /> : <FiChevronRight />}
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Flex direction="column">
          <Text py={2}>Chapter 1</Text>
          <Text py={2}>Chapter 2</Text>
          <Text py={2}>Chapter 3</Text>
        </Flex>
      </Collapse>
    </Flex>
  );
}

export default function Editor() {
  const { id } = useParams();
  const t = useTranslator();
  const fic = useTracker(() => {
    const handler = Meteor.subscribe("fics");

    if (!handler.ready()) return null;

    return FicsCollection.findOne(id);
  });

  if (!fic) return null;

  return (
    <Flex direction="column">
      <Heading>{fic.title}</Heading>
      <ChapterList />
      <Input mt={5} bg="white" size="lg" placeholder={t("editor.title")} />
    </Flex>
  );
}
