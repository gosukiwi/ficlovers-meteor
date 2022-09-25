import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useTranslator } from "/imports/ui/i18n";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate, Link as RRLink } from "react-router-dom";
import Typewriter from "../Typewriter";
import ValidationErrorAlert from "/imports/ui/ValidationErrorAlert";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const t = useTranslator();
  const navigate = useNavigate();

  const createAccount = (e) => {
    e.preventDefault();

    Meteor.call("register", { username, password, email }, (err) => {
      setError(<ValidationErrorAlert error={err} />);
      if (!err) navigate("/login");
    });
  };

  return (
    <Flex as="form" minH={"100vh"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Join Ficlovers!
          </Heading>
          <Typewriter />
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="firstName" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                type="submit"
                loadingText="Submitting"
                size="lg"
                bg={"cyan.400"}
                color={"white"}
                _hover={{
                  bg: "cyan.500",
                }}
                onClick={createAccount}
              >
                Sign up
              </Button>
            </Stack>
            <Flex justifyContent="center">
              <Text>Already a user?</Text>
              <Link ml={1} as={RRLink} to="/login" color={"cyan.400"}>
                Login
              </Link>
            </Flex>
          </Stack>
        </Box>

        {error}
      </Stack>
    </Flex>
  );
}
