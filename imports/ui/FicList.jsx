import React from "react";
import { Link } from "react-router-dom";
import { Flex, Text, Box, Heading, Image } from "@chakra-ui/react";
import { FiChevronRight, FiSettings, FiEdit3 } from "react-icons/fi";

function Fic({ title, description, id }) {
  return (
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
        <Heading size="sm">{title}</Heading>
        <Text>{description}</Text>
      </Box>
      <Flex alignItems="center">
        <Flex
          as={Link}
          to={`/editor/${id}`}
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
  );
}

export default function FicList({ fics }) {
  return (
    <Flex flexDirection="column">
      {fics.map((f) => (
        <Fic
          key={f._id}
          id={f._id}
          title={f.title}
          description={f.description}
        />
      ))}
    </Flex>
  );
}
