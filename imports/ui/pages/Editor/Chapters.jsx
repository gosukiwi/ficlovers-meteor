import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useTranslator } from "/imports/ui/i18n";
import ValidationErrorAlert from "/imports/ui/ValidationErrorAlert";
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

import { FiPlus, FiX, FiEdit3, FiArrowUp, FiArrowDown } from "react-icons/fi";

function ChapterListItemSmall({
  chapter,
  index,
  moveUp,
  moveDown,
  deleteChapter,
  changeChapter,
  hasChanges,
  current,
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
        <Text
          as={current ? "strong" : "p"}
          pr={3}
          noOfLines={1}
          flexGrow={1}
          fontSize="xs"
          cursor="pointer"
          onClick={() => {
            if (hasChanges) {
              if (confirm(t("editor.unsaved"))) changeChapter(chapter);
            } else {
              changeChapter(chapter);
            }
          }}
        >
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
          bg="red.400"
          color="white"
          p={3}
          borderBottomRightRadius="md"
          onClick={() => deleteChapter(chapter)}
        >
          <FiX />
        </Box>
      </Flex>
    </Flex>
  );
}

function ChapterListItemRegular({
  chapter,
  index,
  moveUp,
  moveDown,
  deleteChapter,
  changeChapter,
  hasChanges,
  current,
}) {
  const t = useTranslator();

  return (
    <Flex borderRadius="md" bg="white" alignItems="center">
      <Text pl={3} mr={1.5} textAlign="center" fontSize="xs" color="gray.500">
        {index + 1}.
      </Text>
      <Text
        as={current ? "strong" : "p"}
        noOfLines={1}
        flexGrow={1}
        fontSize="xs"
        cursor="pointer"
        onClick={() => {
          if (hasChanges) {
            if (confirm(t("editor.unsaved"))) changeChapter(chapter);
          } else {
            changeChapter(chapter);
          }
        }}
      >
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
        bg="red.400"
        color="white"
        p={3}
        borderTopRightRadius="md"
        borderBottomRightRadius="md"
        onClick={() => deleteChapter(chapter)}
      >
        <FiX />
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
  current,
}) {
  const t = useTranslator();
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [isLargerThan720] = useMediaQuery("(min-width: 720px)");

  const insertChapter = (e) => {
    e.preventDefault();
    if (newChapterTitle === "") return;

    Meteor.call("chapters.insert", newChapterTitle, "", ficId, (err) => {
      setNewChapterTitle("");
      setError(<ValidationErrorAlert error={err} />);
    });
  };

  const deleteChapter = (chapter) => {
    Meteor.call("chapters.delete", chapter._id, (err) => {
      setError(<ValidationErrorAlert error={err} />);
    });
  };

  const moveUp = (chapter) => {
    Meteor.call("chapters.moveUp", chapter, (err) => {
      setError(<ValidationErrorAlert error={err} />);
    });
  };

  const moveDown = (chapter) => {
    Meteor.call("chapters.moveDown", chapter, (err) => {
      setError(<ValidationErrorAlert error={err} />);
    });
  };

  return (
    <Flex gap={3} mt={3} direction="column">
      {chapters.map((chapter, index) =>
        isLargerThan720 ? (
          <ChapterListItemRegular
            key={chapter._id}
            current={current._id === chapter._id}
            chapter={chapter}
            index={index}
            moveUp={moveUp}
            moveDown={moveDown}
            deleteChapter={deleteChapter}
            changeChapter={changeChapter}
            hasChanges={hasChanges}
          />
        ) : (
          <ChapterListItemSmall
            key={chapter._id}
            current={current._id === chapter._id}
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
