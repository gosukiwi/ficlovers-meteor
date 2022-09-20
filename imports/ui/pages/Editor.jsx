import { Meteor } from "meteor/meteor";
import { Link, useParams } from "react-router-dom";
import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import {
  Box,
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
import EditorChapters from "/imports/ui/pages/EditorChapters";
import { useTranslator } from "/imports/ui/i18n";
import { FicsCollection, ChaptersCollection } from "/imports/collections";
import SimpleEditor from "/imports/ui/Editor";
import ValidationErrors from "/imports/ui/ValidationErrors";

function EditorBreadcrumb({ fic }) {
  if (!fic) return null;

  return (
    <Breadcrumb fontSize="xs" separator={<ChevronRightIcon color="gray.400" />}>
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
  );
}

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

  // TODO
  const updateChapter = () => {
    Meteor.call("chapter.update", currentChapter._id, (err) => {
      setError(<ValidationErrors error={err} />);
    });
  };

  if (!fic) return null;

  return (
    <Flex direction="column">
      <EditorBreadcrumb fic={fic} />
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
      <EditorChapters setError={setError} chapters={chapters} ficId={id} />
      <Box mt={3}>
        <SimpleEditor
          value={chapterBody}
          onChange={(e) => setChapterBody(e.target.value)}
        />
      </Box>
      <Flex>
        <Button size="sm" colorScheme="gray" mt={3}>
          Back
        </Button>
        <Spacer />
        <Button size="sm" colorScheme="red" mt={3} mr={2}>
          <Text>Delete</Text>
        </Button>
        <Button
          onClick={updateChapter}
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
