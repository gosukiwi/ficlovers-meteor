import { Meteor } from "meteor/meteor";
import React, { useState, useRef } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Flex, Input, Box, Text } from "@chakra-ui/react";
import { FiX } from "react-icons/fi";
import { TagsCollection } from "/imports/collections";

export default function TagSelector() {
  const [tagSearch, setTagSearch] = useState("");
  const [showMatches, setShowMatches] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [hasFocus, setHasFocus] = useState(false);
  const inputRef = useRef(null);

  const tags = useTracker(() => {
    if (tagSearch === "") return [];

    const handler = Meteor.subscribe("tags.byName", tagSearch);
    if (!handler.ready()) return [];

    return TagsCollection.find({
      name: { $regex: new RegExp(`^${tagSearch}`), $options: "i" },
    }).fetch();
  }, [tagSearch]);

  const handleTagSearchChanged = (e) => {
    setTagSearch(e.target.value);
    setShowMatches(true);
  };

  const removeTag = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedTags.includes(tagSearch)) {
      setTagSearch("");
      return;
    }

    Meteor.call("tags.insert", tagSearch, (err) => {
      if (err) removeTag(tagSearch);
    });

    setTagSearch("");
    setSelectedTags([...selectedTags, tagSearch]);
  };

  const handleTagSearchKeyDown = (e) => {
    if (e.key === "Backspace" && tagSearch === "" && selectedTags.length > 0) {
      removeTag(selectedTags[selectedTags.length - 1]);
    }
  };

  const addTag = (tag) => {
    if (selectedTags.includes(tag)) return;

    setSelectedTags([...selectedTags, tag]);
    setTagSearch("");
  };

  const focusInput = () => {
    if (!hasFocus) inputRef.current.focus();
  };

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit}
      borderRadius="md"
      border="1px"
      color="gray.200"
      px={3}
      py={1}
      bg="white"
      position="relative"
      alignItems="center"
      boxShadow={hasFocus ? "outline" : "none"}
      onClick={focusInput}
    >
      <Flex flexWrap="wrap" gap={2} color="black" fontSize="sm">
        {selectedTags.map((tag) => (
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
          value={tagSearch}
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
          borderRadius="md"
          position="absolute"
          left="0"
          top="60px"
          overflow="hidden"
        >
          {tags.map((tag) => (
            <Box
              borderBottom="1px"
              borderColor="gray.200"
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
