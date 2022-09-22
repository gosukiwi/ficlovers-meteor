import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useTranslator } from "/imports/ui/i18n";
import ValidationErrors from "/imports/ui/ValidationErrors";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import { FiPlus, FiDelete, FiEdit } from "react-icons/fi";

export default function EditorChapters({
  ficId,
  chapters,
  setError,
  setCurrentChapter,
}) {
  const t = useTranslator();
  const [newChapterTitle, setNewChapterTitle] = useState("");

  const insertChapter = (e) => {
    e.preventDefault();
    if (newChapterTitle === "") return;

    Meteor.call("chapters.insert", newChapterTitle, "", ficId, (err) => {
      setNewChapterTitle("");
      setError(<ValidationErrors error={err} />);
    });
  };

  const deleteChapter = (chapter) => {
    Meteor.call("chapters.delete", chapter._id, (err) => {
      setError(<ValidationErrors error={err} />);
    });
  };

  return (
    <Flex gap={3} mt={3} direction="column">
      {chapters.map((chapter, index) => (
        <Flex
          key={chapter._id}
          borderRadius="md"
          bg="white"
          alignItems="center"
        >
          <Text p={3} textAlign="center" fontSize="xs" color="gray.500" mr={1}>
            CHAPTER {index + 1}:
          </Text>
          <Text p={3} noOfLines={1} flexGrow={1} fontSize="xs">
            {chapter.title}
          </Text>
          <Box
            cursor="pointer"
            bg="cyan.400"
            p={3}
            onClick={() => setCurrentChapter(chapter)}
          >
            <FiEdit color="white" />
          </Box>
          <Box
            cursor="pointer"
            bg="red.400"
            p={3}
            borderTopRightRadius="md"
            borderBottomRightRadius="md"
            onClick={() => deleteChapter(chapter)}
          >
            <FiDelete color="white" />
          </Box>
        </Flex>
      ))}
      <Flex as="form" onSubmit={insertChapter}>
        <InputGroup size="md">
          <Input
            p={3}
            borderRadius="md"
            bg="white"
            placeholder={t("editor.new_chapter")}
            value={newChapterTitle}
            onChange={(e) => setNewChapterTitle(e.target.value)}
          />
          <InputRightElement width="3.5rem">
            <Button h="1.75rem" size="sm" colorScheme="gray" type="submit">
              <FiPlus />
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Flex>
  );
}
