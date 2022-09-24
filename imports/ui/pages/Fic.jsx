import { Meteor } from "meteor/meteor";
import React from "react";
import { useParams } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Flex, Text, Box, Heading } from "@chakra-ui/react";
import { FicsCollection, ChaptersCollection } from "/imports/collections";

export default function Fic() {
  const { id } = useParams();
  const fic = useTracker(() => {
    const handler = Meteor.subscribe("fics.public");

    if (!handler.ready()) return null;

    return FicsCollection.findOne(id);
  }, [id]);

  const chapters = useTracker(() => {
    const handler = Meteor.subscribe("chapters.public");

    if (!handler.ready()) return [];

    return ChaptersCollection.find({ ficId: fic.id }).fetch();
  }, [fic, id]);

  console.log(chapters);

  if (fic === null) return;
  if (chapters.length === 0) return;
  // TODO: Loading

  return (
    <Flex>
      <Heading>{fic.title}</Heading>
    </Flex>
  );
}
