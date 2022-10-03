import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { useSearchParams, Link } from "react-router-dom";
import { useTranslator } from "/imports/ui/i18n";
import {
  Flex,
  Heading,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  Image,
  Switch,
  Select,
} from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";
import { FicsCollection, LANGUAGES } from "/imports/collections";
import Tag from "/imports/ui/Tag";
import TagSelector from "/imports/ui/TagSelector";

export default function Search() {
  const t = useTranslator();

  // Get search parameters from query string
  const [searchParams, setSearchParams] = useSearchParams();
  const keywordParam = searchParams.get("keyword") || "";
  const tagsParam =
    searchParams.get("tags") === null
      ? []
      : searchParams
          .get("tags")
          .split(",")
          .filter((t) => t !== "");
  const crossoversParam = searchParams.get("crossovers") === "true";
  const nsfwParam = searchParams.get("nsfw") === "true";
  const languageParam = searchParams.get("language") || "";

  const isSearchEmpty = keywordParam === "" && tagsParam.length === 0;

  // state
  const [keyword, setKeyword] = useState(keywordParam);
  const [tags, setTags] = useState(tagsParam);
  const [crossovers, setCrossovers] = useState(crossoversParam);
  const [nsfw, setNsfw] = useState(nsfwParam);
  const [language, setLanguage] = useState(languageParam);

  const [results, isLoading] = useTracker(() => {
    const handler = Meteor.subscribe("fics.search", {
      keyword: keywordParam,
      tags: tagsParam,
      crossover: crossovers,
      nsfw,
      language,
    });

    if (!handler.ready()) return [[], true];

    const query = {
      status: "published",
      crossover: crossovers,
      nsfw,
    };

    if (keywordParam !== "") {
      query.$or = [
        { title: new RegExp(keywordParam) },
        { description: new RegExp(keywordParam) },
      ];
    }

    if (tagsParam.length > 0) {
      query.tags = { $all: tagsParam };
    }

    if (language !== "") {
      query.language = language;
    }

    if (keywordParam === "" && tagsParam.length === 0) return [[], false];

    const results = FicsCollection.find(query).fetch();
    return [results, false];
  }, [searchParams]);

  const handleSearchFormSubmitted = (e) => {
    e.preventDefault();

    setSearchParams({
      keyword,
      tags: tags.join(","),
      crossovers,
      nsfw,
      language,
    });
  };

  return (
    <Flex
      onSubmit={handleSearchFormSubmitted}
      as="form"
      gap={3}
      direction="column"
    >
      <Heading>{t("search.title")}</Heading>

      <FormControl id="keyword">
        <FormLabel>{t("search.keyword")}</FormLabel>
        <Input
          bg="white"
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </FormControl>

      <FormControl id="tags">
        <FormLabel>{t("search.tags")}</FormLabel>
        <TagSelector readOnly value={tags} onChange={(tags) => setTags(tags)} />
      </FormControl>

      <FormControl id="crossovers">
        <FormLabel>{t("search.crossovers")}</FormLabel>
        <Switch
          colorScheme="cyan"
          isChecked={crossovers}
          onChange={() => setCrossovers(!crossovers)}
        />
      </FormControl>

      <FormControl id="nsfw">
        <FormLabel>{t("search.nsfw")}</FormLabel>
        <Switch
          colorScheme="cyan"
          isChecked={nsfw}
          onChange={() => setNsfw(!nsfw)}
        />
      </FormControl>

      <FormControl id="language">
        <FormLabel>{t("search.language")}</FormLabel>
        <Select
          bg="white"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">{t("search.any_language")}</option>
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" colorScheme="cyan" color="white">
        {t("search.search")}
      </Button>

      {!isSearchEmpty &&
        (isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <SearchResults results={results} />
        ))}
    </Flex>
  );
}

function SearchResults({ results }) {
  const t = useTranslator();

  if (results.length === 0)
    return (
      <>
        <Heading fontSize="xl">{t("search.results")}</Heading>
        <Text>{t("search.no_results")}</Text>
      </>
    );

  return (
    <>
      <Heading fontSize="xl">{t("search.results")}</Heading>
      <FicList fics={results} />
    </>
  );
}

function FicList({ fics }) {
  return (
    <Flex gap={3} flexDirection="column">
      {fics.map((fic) => (
        <Fic key={fic._id} fic={fic} />
      ))}
    </Flex>
  );
}

function Fic({ fic }) {
  const { title, description, tags } = fic;

  return (
    <Flex bg="white" borderRadius="md" overflow="hidden">
      <Image
        m={4}
        boxSize="60px"
        borderRadius="md"
        mr={2}
        objectFit="cover"
        src="http://placekitten.com/60/60"
      />
      <Flex direction="column" my={4} gap={1} flexGrow={1}>
        <Heading noOfLines={1} size="sm">
          {title}
        </Heading>
        <Text noOfLines={1}>{description}</Text>
        <Flex gap={1}>
          {tags.map((tag) => (
            <Tag key={tag} name={tag} />
          ))}
        </Flex>
      </Flex>
      <Flex alignItems="center">
        <Flex
          as={Link}
          to={`/fics/${fic._id}`}
          height="100%"
          alignItems="center"
          p={5}
          _hover={{ bg: "cyan.400", color: "white" }}
        >
          <FiChevronRight />
        </Flex>
      </Flex>
    </Flex>
  );
}
