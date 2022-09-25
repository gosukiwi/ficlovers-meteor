import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useNavigate, Link as RRLink } from "react-router-dom";
import { useTranslator } from "/imports/ui/i18n";
import {
  Flex,
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import Typewriter from "../Typewriter";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const t = useTranslator();

  const handleSubmit = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password, (err) => {
      setPassword("");
      if (err) {
        setError(true);
      } else {
        setError(false);
        navigate("/");
      }
    });
  };

  return (
    <Flex as="form" onSubmit={handleSubmit} minH="100vh" justify="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            {t("login.title")}
          </Heading>
          <Typewriter />
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="lg"
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>{t("login.username")}</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>{t("login.password")}</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={3}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align="start"
                justify="center"
              >
                <Link color="cyan.400">{t("login.forgot_password")}</Link>
              </Stack>
              <Button
                type="submit"
                bg="cyan.400"
                color="white"
                _hover={{
                  bg: "cyan.500",
                }}
              >
                {t("login.sign_in")}
              </Button>
            </Stack>
          </Stack>

          <Flex
            direction="column"
            mt={3}
            justifyContent="center"
            alignItems="center"
          >
            <Text>Don&apos;t have an account?</Text>
            <Link as={RRLink} to="/register" color={"cyan.400"}>
              Register
            </Link>
          </Flex>
        </Box>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>{t("login.error")}</AlertDescription>
          </Alert>
        )}
      </Stack>
    </Flex>
  );
}
