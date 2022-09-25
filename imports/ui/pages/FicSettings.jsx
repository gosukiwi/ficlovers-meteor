import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { useTranslator } from "/imports/ui/i18n";
import { useParams, useNavigate, Link as RRLink } from "react-router-dom";
import {
  Flex,
  Input,
  Textarea,
  Text,
  Box,
  Heading,
  Image,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { FicsCollection } from "/imports/collections";
import TagSelector from "/imports/ui/TagSelector";

export default function FicSettings() {
  const { id } = useParams();
  const t = useTranslator();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const fic = useTracker(() => {
    const handler = Meteor.subscribe("user.fics.byId", id);

    if (!handler.ready()) return null;

    const fic = FicsCollection.findOne(id);
    setTitle(fic.title);
    setDescription(fic.description);
    return fic;
  }, [id]);

  if (fic === null) return null;
  // TODO: Loading screen

  return (
    <Flex gap={3} direction="column">
      <Heading>{t("fic_settings.heading")}</Heading>

      <FormControl variant="floating">
        <FormLabel>{t("fic_settings.title")}</FormLabel>
        <Input
          required
          bg="white"
          value={title}
          focusBorderColor="cyan.400"
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>

      <FormControl variant="floating">
        <FormLabel>{t("fic_settings.description")}</FormLabel>
        <Textarea
          required
          maxLength={500}
          bg="white"
          focusBorderColor="cyan.400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>

      <FormControl variant="floating">
        <FormLabel>{t("fic_settings.tags")}</FormLabel>
        <TagSelector />
      </FormControl>
    </Flex>
  );
}
