import { Meteor } from "meteor/meteor";
import React, { useState, useRef } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Flex, Input, Box, Text } from "@chakra-ui/react";
import { FiX } from "react-icons/fi";
import { TagsCollection } from "/imports/collections";

export default function TagSelector({ value, onChange, max }) {
  const [search, setSearch] = useState("");
  const [showMatches, setShowMatches] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const inputRef = useRef(null);

  const tags = useTracker(() => {
    if (search === "") return [];

    const handler = Meteor.subscribe("tags.byName", search);
    if (!handler.ready()) return [];

    return TagsCollection.find({
      name: { $regex: new RegExp(`^${search}`), $options: "i" },
    }).fetch();
  }, [search]);

  const handleTagSearchChanged = (e) => {
    setSearch(e.target.value);
    setShowMatches(true);
  };

  const removeTag = (tag) => {
    onChange(value.filter((t) => t !== tag));
  };

  const addTag = (tag) => {
    setSearch("");
    if (value.includes(tag)) return;
    if (max && value.length >= max) return;

    onChange([...value, tag]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.includes(search)) return;

    Meteor.call("tags.insert", search, (err) => {
      if (err) removeTag(search);
    });

    addTag(search);
  };

  const handleTagSearchKeyDown = (e) => {
    if (e.key === "Backspace" && search === "" && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  const focusInput = () => {
    if (!hasFocus) inputRef.current.focus();
  };

  return (
    <Flex
      as="form"
      direction="column"
      onSubmit={handleSubmit}
      borderRadius="md"
      border="1px"
      color="gray.200"
      p={2}
      bg="white"
      position="relative"
      alignItems="flex-start"
      justifyContent="flex-start"
      boxShadow={hasFocus ? "outline" : "none"}
      onClick={focusInput}
    >
      <Flex flexWrap="wrap" gap={2} color="black" fontSize="sm">
        {value.map((tag) => (
          <Flex
            key={tag}
            bg="cyan.400"
            color="white"
            px={3}
            py={1}
            borderRadius="md"
            alignItems="center"
            gap={2}
            _hover={{ bg: "cyan.500" }}
          >
            <Text noOfLines={1}>{tag}</Text>
            <FiX cursor="pointer" onClick={() => removeTag(tag)} />
          </Flex>
        ))}

        <Input
          ref={inputRef}
          value={search}
          onChange={handleTagSearchChanged}
          onKeyDown={handleTagSearchKeyDown}
          border="none"
          _focus={{ boxShadow: "none" }}
          color="black"
          width={100}
          height="auto"
          p={0}
          onBlur={() => {
            setTimeout(() => setShowMatches(false), 200);
            setHasFocus(false);
          }}
          onFocus={() => setHasFocus(true)}
        />
      </Flex>
      {showMatches && tags.length > 0 && (
        <Box
          width="100%"
          color="black"
          fontSize="sm"
          bg="white"
          overflow="hidden"
          mt={3}
        >
          {tags.map((tag) => (
            <Box
              borderRadius="md"
              p={3}
              key={tag._id}
              onClick={() => addTag(tag.name)}
              cursor="pointer"
              _hover={{ bg: "cyan.400", color: "white" }}
            >
              {tag.name}
            </Box>
          ))}
        </Box>
      )}
    </Flex>
  );
}
