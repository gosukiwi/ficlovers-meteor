import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useParams, useNavigate, Link as RRLink } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import {
  Flex,
  Text,
  Select,
  Heading,
  Link,
  HStack,
  Image,
  Button,
} from "@chakra-ui/react";
import { FiEdit3 } from "react-icons/fi";
import { FicsCollection, ChaptersCollection } from "/imports/collections";
import Tag from "/imports/ui/Tag";

export default function Fic() {
  const { id, chapterId } = useParams();
  const navigate = useNavigate();
  const user = useTracker(() => Meteor.user());
  const [currentChapter, setCurrentChapter] = useState(null);
  const fic = useTracker(() => {
    const handler = Meteor.subscribe("fics.byId", id);

    if (!handler.ready()) return null;

    return FicsCollection.findOne(id);
  }, [id]);

  const chapters = useTracker(() => {
    const handler = Meteor.subscribe("chapters.byId", id);

    if (!handler.ready()) return [];

    const chapters = ChaptersCollection.find({ ficId: id }).fetch();

    // Find current chapter
    if (chapters.length === 0) return chapters;

    if (!chapterId) {
      setCurrentChapter(chapters[0]);
    } else {
      const current = chapters.find((c) => c._id === chapterId);
      if (!current) {
        navigate("/not-found");
      } else {
        setCurrentChapter(current);
      }
    }

    return chapters;
  }, [id, chapterId]);

  const author = useTracker(() => {
    if (!fic) return null;

    const handler = Meteor.subscribe("users.byId", fic.userId);
    if (!handler.ready()) return null;

    return Meteor.users.findOne(fic.userId);
  }, [fic]);

  const isAuthor = user && author && author._id === user._id;

  if (fic === null) return null;
  if (chapters.length === 0) return null;
  if (author === null) return null;
  // TODO: Loading

  return (
    <Flex direction="column">
      <Heading mb={3}>{fic.title}</Heading>
      <Flex direction="column" mb={3}>
        <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
          <Image
            borderRadius="full"
            boxSize="40px"
            src="https://placekitten.com/40/40"
            alt={`Avatar of ${author.username}`}
          />
          <Link
            as={RRLink}
            to={`/users/${author.username}`}
            color="cyan.400"
            fontWeight="bold"
          >
            {author.username}
          </Link>
          <Text>—</Text>
          <Text>{fic.createdAt.toLocaleDateString()}</Text>
        </HStack>
        <Flex flexWrap="wrap" mt={3} gap={2}>
          {fic.tags.map((tag) => (
            <Tag key={tag} name={tag} />
          ))}
        </Flex>
      </Flex>
      <Text dangerouslySetInnerHTML={{ __html: currentChapter.body }} />
      <Flex
        bg="white"
        position="sticky"
        borderRadius="md"
        bottom={3}
        p={3}
        mt={3}
        justifyContent="center"
        boxShadow="lg"
      >
        <Select
          value={currentChapter._id}
          onChange={(e) => navigate(`/fics/${id}/${e.target.value}`)}
        >
          {chapters.map((chapter) => (
            <option key={chapter._id} value={chapter._id}>
              {chapter.title}
            </option>
          ))}
        </Select>
        {isAuthor && (
          <Button
            as={RRLink}
            to={`/editor/${fic._id}`}
            ml={3}
            color="white"
            colorScheme="cyan"
          >
            <FiEdit3 />
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
