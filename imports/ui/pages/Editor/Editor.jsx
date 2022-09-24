import { Meteor } from "meteor/meteor";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Box, Heading, Flex, Input, Button } from "@chakra-ui/react";
import { useTranslator } from "/imports/ui/i18n";
import { FicsCollection, ChaptersCollection } from "/imports/collections";
import SimpleEditor from "/imports/ui/Editor";
import ValidationErrorAlert from "/imports/ui/ValidationErrorAlert";
import SuccessAlert from "/imports/ui/SuccessAlert";
import Breadcrumb from "/imports/ui/pages/Editor/Breadcrumb";
import Chapters from "/imports/ui/pages/Editor/Chapters";

export default function Editor() {
  const { id } = useParams();
  const [currentChapter, setCurrentChapter] = useState(null);
  const [initialChapter, setInitialChapter] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [alert, setAlert] = useState(null);
  const t = useTranslator();
  const navigate = useNavigate();

  const fic = useTracker(() => {
    const handler = Meteor.subscribe("fics.user");

    if (!handler.ready()) return null;

    return FicsCollection.findOne(id);
  }, [id]);

  const chapters = useTracker(() => {
    const handler = Meteor.subscribe("chapters.user");

    if (!handler.ready()) return [];

    const chapters = ChaptersCollection.find(
      { ficId: id },
      { sort: { order: 1 } }
    ).fetch();

    if (chapters.length > 0 && currentChapter === null) {
      setCurrentChapter(chapters[0]);
      setInitialChapter(chapters[0]);
      setHasChanges(false);
    }
    return chapters;
  }, [id]);

  const updateChapter = () => {
    Meteor.call("chapters.update", currentChapter, (err) => {
      setAlert(<ValidationErrorAlert error={err} />);
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

  const publishFic = () => {
    Meteor.call("fics.publish", id, (err) => {
      if (err) {
        setAlert(<ValidationErrorAlert error={err} />);
      } else {
        setAlert(<SuccessAlert title={t("editor.published")} />);
      }
    });
  };

  const draftFic = () => {
    Meteor.call("fics.wip", id, (err) => {
      if (err) {
        setAlert(<ValidationErrorAlert error={err} />);
      } else {
        setAlert(<SuccessAlert title={t("editor.setted_as_wip")} />);
      }
    });
  };

  if (!fic) return null;
  if (!currentChapter) return null;
  // TODO: Show loading

  return (
    <Flex direction="column">
      <Breadcrumb fic={fic} />
      <Heading mt={3}>{fic.title}</Heading>
      {alert}
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
        setError={setAlert}
        chapters={chapters}
        ficId={id}
        changeChapter={changeChapter}
        hasChanges={hasChanges}
        current={currentChapter}
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
      <Flex gap={3} justifyContent="flex-end">
        <Button
          onClick={() => navigate("/write")}
          size="sm"
          bg="gray.200"
          _hover={{
            backgroundColor: "gray.300",
          }}
          mt={3}
        >
          Back
        </Button>
        {fic.status === "published" ? (
          <Button
            onClick={draftFic}
            size="sm"
            colorScheme="cyan"
            color="white"
            mt={3}
          >
            {t("editor.wip")}
          </Button>
        ) : (
          <Button
            onClick={publishFic}
            size="sm"
            colorScheme="cyan"
            color="white"
            mt={3}
          >
            {t("editor.publish")}
          </Button>
        )}
        <Button
          onClick={updateChapter}
          _hover={{
            backgroundColor: "gray.300",
          }}
          size="sm"
          bg="gray.200"
          mt={3}
        >
          Save
        </Button>
      </Flex>
    </Flex>
  );
}
