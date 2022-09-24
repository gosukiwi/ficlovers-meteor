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
  useMediaQuery,
} from "@chakra-ui/react";

import {
  FiPlus,
  FiDelete,
  FiEdit,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";

function ChapterListSmall({
  chapter,
  index,
  moveUp,
  moveDown,
  deleteChapter,
  changeChapter,
  hasChanges,
}) {
  const t = useTranslator();

  return (
    <Flex direction="column">
      <Flex
        borderTopLeftRadius="md"
        borderBottomLeftRadius="md"
        borderTopRightRadius="md"
        bg="white"
        alignItems="center"
      >
        <Text p={3} textAlign="center" fontSize="xs" color="gray.500">
          {index + 1}.
        </Text>
        <Text pr={3} noOfLines={1} flexGrow={1} fontSize="xs">
          {chapter.title}
        </Text>
      </Flex>
      <Flex justifyContent="flex-end" fontSize="11px">
        <Box
          cursor="pointer"
          borderBottomLeftRadius="md"
          bg="gray.50"
          color="black"
          p={3}
          onClick={() => moveUp(chapter)}
        >
          <FiArrowUp />
        </Box>
        <Box
          cursor="pointer"
          bg="gray.50"
          color="black"
          p={3}
          onClick={() => moveDown(chapter)}
        >
          <FiArrowDown />
        </Box>
        <Box
          cursor="pointer"
          bg="cyan.400"
          color="white"
          p={3}
          onClick={() => {
            if (hasChanges) {
              if (confirm(t("editor.unsaved"))) changeChapter(chapter);
            } else {
              changeChapter(chapter);
            }
          }}
        >
          <FiEdit />
        </Box>
        <Box
          cursor="pointer"
          bg="red.400"
          color="white"
          p={3}
          borderBottomRightRadius="md"
          onClick={() => deleteChapter(chapter)}
        >
          <FiDelete />
        </Box>
      </Flex>
    </Flex>
  );
}

function ChapterListRegular({
  chapter,
  index,
  moveUp,
  moveDown,
  deleteChapter,
  changeChapter,
  hasChanges,
}) {
  const t = useTranslator();

  return (
    <Flex borderRadius="md" bg="white" alignItems="center">
      <Text
        pl={3}
        mr={1.5}
        textAlign="center"
        fontSize="xs"
        color="gray.500"
        mr={1}
      >
        {index + 1}.
      </Text>
      <Text noOfLines={1} flexGrow={1} fontSize="xs">
        {chapter.title}
      </Text>
      <Box
        cursor="pointer"
        bg="gray.50"
        color="black"
        p={3}
        onClick={() => moveUp(chapter)}
      >
        <FiArrowUp />
      </Box>
      <Box
        cursor="pointer"
        bg="gray.50"
        color="black"
        p={3}
        onClick={() => moveDown(chapter)}
      >
        <FiArrowDown />
      </Box>
      <Box
        cursor="pointer"
        bg="cyan.400"
        p={3}
        onClick={() => {
          if (hasChanges) {
            if (confirm(t("editor.unsaved"))) changeChapter(chapter);
          } else {
            changeChapter(chapter);
          }
        }}
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
  );
}

export default function Chapters({
  ficId,
  chapters,
  setError,
  changeChapter,
  hasChanges,
}) {
  const t = useTranslator();
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [isLargerThan720] = useMediaQuery("(min-width: 720px)");

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

  const moveUp = () => {};

  const moveDown = () => {};

  return (
    <Flex gap={3} mt={3} direction="column">
      {chapters.map((chapter, index) =>
        isLargerThan720 ? (
          <ChapterListRegular
            key={chapter._id}
            chapter={chapter}
            index={index}
            moveUp={moveUp}
            moveDown={moveDown}
            deleteChapter={deleteChapter}
            changeChapter={changeChapter}
            hasChanges={hasChanges}
          />
        ) : (
          <ChapterListSmall
            key={chapter._id}
            chapter={chapter}
            index={index}
            moveUp={moveUp}
            moveDown={moveDown}
            deleteChapter={deleteChapter}
            changeChapter={changeChapter}
            hasChanges={hasChanges}
          />
        )
      )}
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
