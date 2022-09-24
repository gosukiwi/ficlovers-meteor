import { Meteor } from "meteor/meteor";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
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
  const [currentChapter, setCurrentChapter] = useState(null);
  const [initialChapter, setInitialChapter] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
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
    if (chapters.length > 0 && currentChapter === null) {
      setCurrentChapter(chapters[0]);
      setInitialChapter(chapters[0]);
      setHasChanges(false);
    }
    return chapters;
  }, [id]);

  const updateChapter = () => {
    Meteor.call("chapters.update", currentChapter, (err) => {
      setError(<ValidationErrors error={err} />);
    });
    setInitialChapter(currentChapter);
    setHasChanges(false);
  };

  useEffect(() => {
    if (currentChapter === null || initialChapter === null) return;

    setHasChanges(
      currentChapter.title !== initialChapter.title ||
        currentChapter.body !== initialChapter.body
    );
  }, [initialChapter, currentChapter]);

  const changeChapter = (another) => {
    setCurrentChapter(another);
    setInitialChapter(another);
    setHasChanges(false);
  };

  if (!fic) return null;
  if (!currentChapter) return null;
  // TODO: Show loading

  return (
    <Flex direction="column">
      <EditorBreadcrumb fic={fic} />
      <Heading mt={3}>{fic.title}</Heading>
      {error}
      <Input
        required
        value={currentChapter.title}
        onChange={(e) =>
          setCurrentChapter((chapter) => ({
            ...chapter,
            title: e.target.value,
          }))
        }
        mt={3}
        bg="white"
        size="lg"
        placeholder={t("editor.title")}
      />
      <EditorChapters
        setError={setError}
        chapters={chapters}
        ficId={id}
        changeChapter={changeChapter}
        hasChanges={hasChanges}
      />
      <Box mt={3}>
        <SimpleEditor
          value={currentChapter.body || ""}
          onChange={(e) =>
            setCurrentChapter((chapter) => ({
              ...chapter,
              body: e.target.value,
            }))
          }
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
