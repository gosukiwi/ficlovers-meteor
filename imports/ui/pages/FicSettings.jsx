import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { useTranslator } from "/imports/ui/i18n";
import { useParams, Link as RRLink } from "react-router-dom";
import {
  Flex,
  Input,
  Textarea,
  Heading,
  FormControl,
  FormLabel,
  Button,
  Switch,
  Spacer,
  Select,
} from "@chakra-ui/react";
import { FicsCollection, LANGUAGES } from "/imports/collections";
import TagSelector from "/imports/ui/TagSelector";

export default function FicSettings() {
  const { id } = useParams();
  const t = useTranslator();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [isNSFW, setIsNSFW] = useState(false);
  const [isCrossover, setIsCrossover] = useState(false);
  const [disclaimer, setDisclaimer] = useState("");
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const fic = useTracker(() => {
    const handler = Meteor.subscribe("user.fics.byId", id);

    if (!handler.ready()) return null;

    const fic = FicsCollection.findOne(id);
    setTitle(fic.title);
    setDescription(fic.description);
    setIsNSFW(fic.nsfw);
    setIsCrossover(fic.crossover);
    setDisclaimer(fic.disclaimer);
    setLanguage(fic.language);
    if (fic.tags) setTags(fic.tags.map((t) => t.name));
    return fic;
  }, [id]);

  const handleSaveButtonClicked = () => {
    Meteor.call(
      "fics.updateSettings",
      {
        id,
        title,
        description,
        tags,
        language,
        disclaimer,
        nsfw: isNSFW,
        crossover: isCrossover,
      },
      (err) => {
        console.log("DONE!", err);
      }
    );
  };

  if (fic === null) return null;
  // TODO: Loading screen

  return (
    <Flex gap={3} direction="column">
      <Heading>{t("fic_settings.heading")}</Heading>

      <FormControl>
        <FormLabel>{t("fic_settings.title")}</FormLabel>
        <Input
          required
          bg="white"
          value={title}
          focusBorderColor="cyan.400"
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>

      <FormControl>
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

      <FormControl>
        <FormLabel>{t("fic_settings.tags")}</FormLabel>
        <TagSelector value={tags} onChange={setTags} />
      </FormControl>

      <FormControl>
        <FormLabel>{t("fic_settings.disclaimer")}</FormLabel>
        <Textarea
          bg="white"
          placeholder={t("shared.disclaimer")}
          value={disclaimer}
          onChange={(e) => setDisclaimer(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>{t("fic_settings.crossover")}</FormLabel>
        <Switch
          colorScheme="cyan"
          isChecked={isCrossover}
          onChange={() => setIsCrossover(!isCrossover)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>{t("fic_settings.nsfw")}</FormLabel>
        <Switch
          colorScheme="cyan"
          isChecked={isNSFW}
          onChange={() => setIsNSFW(!isNSFW)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>{t("fic_settings.language")}</FormLabel>
        <Select
          bg="white"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </Select>
      </FormControl>

      <Flex mt={3} gap={3} justifyContent="flex-end">
        <Button as={RRLink} to="/write" colorScheme="gray">
          {t("fic_settings.back")}
        </Button>
        <Spacer />
        <Button as={RRLink} to={`/editor/${id}`} colorScheme="gray">
          {t("fic_settings.editor")}
        </Button>
        <Button as={RRLink} to={`/fics/${id}`} colorScheme="gray">
          {t("fic_settings.preview")}
        </Button>
        <Button
          onClick={handleSaveButtonClicked}
          colorScheme="cyan"
          color="white"
        >
          {t("fic_settings.save")}
        </Button>
      </Flex>
    </Flex>
  );
}
