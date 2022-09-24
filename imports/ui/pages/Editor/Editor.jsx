import { Meteor } from "meteor/meteor";
import { useParams } from "react-router-dom";
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
} from "@chakra-ui/react";
import { useTranslator } from "/imports/ui/i18n";
import { FicsCollection, ChaptersCollection } from "/imports/collections";
import SimpleEditor from "/imports/ui/Editor";
import ValidationErrors from "/imports/ui/ValidationErrors";
import Breadcrumb from "/imports/ui/pages/Editor/Breadcrumb";
import Chapters from "/imports/ui/pages/Editor/Chapters";

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
      <Breadcrumb fic={fic} />
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
      <Chapters
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