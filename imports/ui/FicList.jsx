import React from "react";
import { useTranslator } from "/imports/ui/i18n";
import { Flex, Text, Box, Heading, Image } from "@chakra-ui/react";
import { FiChevronRight, FiSettings, FiEdit3 } from "react-icons/fi";

export default function Write() {
  const t = useTranslator();

  return (
    <Flex flexDirection="column">
      <Flex bg="white" borderRadius="md">
        <Image
          m={4}
          boxSize="60px"
          borderRadius="md"
          mr={2}
          objectFit="cover"
          src="http://placekitten.com/60/60"
          alt="Dan Abramov"
        />
        <Box m={4} flexGrow={1}>
          <Heading size="sm">Fic Title</Heading>
          <Text>This is the Fic description</Text>
        </Box>
        <Flex alignItems="center">
          <Flex
            height="100%"
            alignItems="center"
            p={5}
            bg="cyan.400"
            color="white"
          >
            <FiEdit3 />
          </Flex>
          <Flex height="100%" alignItems="center" p={5}>
            <FiSettings />
          </Flex>
          <Flex height="100%" alignItems="center" p={5}>
            <FiChevronRight />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
