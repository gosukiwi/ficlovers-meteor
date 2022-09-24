import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Flex, Text, Box, Heading } from "@chakra-ui/react";
import { FicsCollection, ChaptersCollection } from "/imports/collections";

export default function Fic() {
  const { id } = useParams();
  const [currentChapter, setCurrentChapter] = useState(null);
  const fic = useTracker(() => {
    const handler = Meteor.subscribe("fics.show", id);

    if (!handler.ready()) return null;

    return FicsCollection.findOne(id);
  }, [id]);

  const chapters = useTracker(() => {
    const handler = Meteor.subscribe("chapters.show", id);

    if (!handler.ready()) return [];

    const chapters = ChaptersCollection.find({ ficId: id }).fetch();
    if (chapters.length > 0) setCurrentChapter(chapters[0]);
    return chapters;
  }, [id]);

  if (fic === null) return null;
  if (chapters.length === 0) return null;
  // TODO: Loading

  return (
    <Flex direction="column">
      <Heading mb={3}>{fic.title}</Heading>
      <Text>{currentChapter.body}</Text>
    </Flex>
  );
}
