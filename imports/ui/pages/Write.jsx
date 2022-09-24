import { Meteor } from "meteor/meteor";
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Link } from "react-router-dom";
import { Heading, Flex, Button } from "@chakra-ui/react";
import { useTranslator } from "/imports/ui/i18n";
import FicList from "/imports/ui/FicList";
import { FicsCollection } from "/imports/collections";

export default function Write() {
  const t = useTranslator();
  const user = useTracker(() => Meteor.user());
  const fics = useTracker(() => {
    const handler = Meteor.subscribe("user.fics");

    if (!handler.ready()) return [];

    return FicsCollection.find({ userId: user._id }).fetch();
  });

  const wip = fics.filter((f) => f.status === "wip");
  const published = fics.filter((f) => f.status === "published");
  const finished = fics.filter((f) => f.status === "finished");

  return (
    <Flex gap="12px" flexDirection="column">
      <Heading size="md">{t("write.work_in_progress")}</Heading>
      <FicList fics={wip} />
      <Heading size="md">{t("write.published")}</Heading>
      <FicList fics={published} />
      <Heading size="md">{t("write.finished")}</Heading>
      <FicList fics={finished} />
      <Button as={Link} to="/new" colorScheme="cyan" color="white">
        {t("write.new")}
      </Button>
    </Flex>
  );
}
