import { Meteor } from "meteor/meteor";
import { Link, useParams } from "react-router-dom";
import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { useTranslator } from "/imports/ui/i18n";
import ValidationErrors from "/imports/ui/ValidationErrors";
import { FicsCollection, ChaptersCollection } from "/imports/collections";
import {
  Spacer,
  Heading,
  Flex,
  Text,
  Input,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";

import { ChevronRightIcon } from "@chakra-ui/icons";
import CKEditor from "/imports/ui/CKEditor";

export default function Editor() {
  const { id } = useParams();
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterBody, setChapterBody] = useState("");
  const [error, setError] = useState(null);
  const t = useTranslator();

  const fic = useTracker(() => {
    const handler = Meteor.subscribe("fics");

    if (!handler.ready()) return null;

    return FicsCollection.findOne(id);
  }, [id]);

  const chapters = useTracker(() => {
    const handler = Meteor.subscribe("chapters");

    if (!handler.ready()) return [];

    const chapters = ChaptersCollection.find({ ficId: id }).fetch();
    if (chapters.length > 0) {
      const [currentChapter] = chapters;
      setChapterTitle(currentChapter.title);
      setChapterBody(currentChapter.body);
    }

    return chapters;
  }, [id]);

  const saveChapter = () => {
    Meteor.call("chapters.insert", chapterTitle, chapterBody, id, (err) => {
      setError(<ValidationErrors error={err} />);
    });
  };

  if (!fic) return null;

  return (
    <Flex direction="column">
      <Breadcrumb
        fontSize="xs"
        separator={<ChevronRightIcon color="gray.400" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/write">
            Write
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>Editor</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to={`/fics/${fic._id}`}>
            {fic.title}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Heading mt={3}>{fic.title}</Heading>
      {error}
      <Input
        required
        value={chapterTitle}
        onChange={(e) => setChapterTitle(e.target.value)}
        mt={3}
        bg="white"
        size="lg"
        placeholder={t("editor.title")}
      />
      <Flex gap={3} mt={3} direction="column">
        {chapters.map((chapter, index) => (
          <Flex
            key={chapter._id}
            p={3}
            borderRadius="md"
            bg="white"
            alignItems="center"
          >
            <Text textAlign="center" fontSize="xs" color="gray.500" mr={1}>
              CHAPTER {index + 1}:
            </Text>
            <Text textAlign="center" fontSize="xs">
              {chapter.title}
            </Text>
          </Flex>
        ))}
      </Flex>
      <CKEditor
        mt={3}
        placeholder={t("editor.placeholder")}
        value={chapterBody}
        onChange={setChapterBody}
      />
      <Flex>
        <Button size="sm" colorScheme="gray" mt={3}>
          Back
        </Button>
        <Spacer />
        <Button size="sm" colorScheme="red" mt={3} mr={2}>
          <Text>Delete</Text>
        </Button>
        <Button
          onClick={saveChapter}
          size="sm"
          colorScheme="cyan"
          color="white"
          mt={3}
        >
          Save
        </Button>
      </Flex>
    </Flex>
  );
}
