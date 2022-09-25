import React from "react";
import { Box } from "@chakra-ui/react";

export default function Tag({ name }) {
  return (
    <Box
      borderRadius="md"
      px={3}
      py={1}
      bg="cyan.400"
      color="white"
      cursor="pointer"
      fontSize="sm"
      textTransform="lowercase"
      _hover={{ bg: "cyan.500", color: "white" }}
    >
      {name}
    </Box>
  );
}
