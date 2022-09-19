import { Meteor } from "meteor/meteor";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslator } from "/imports/ui/i18n";
import { Heading, Flex, Input, Textarea, Button } from "@chakra-ui/react";

export default function Write() {
  const { register, handleSubmit, reset } = useForm();
  const t = useTranslator();

  const onSubmit = ({ title, description }) => {
    Meteor.call("fics.insert", title, description);

    reset();
  };

  return (
    <Flex
      gap="12px"
      as="form"
      flexDirection="column"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading size="xl">{t("write.write")}</Heading>
      <div>
        <Input
          bg="white"
          placeholder={t("write.title")}
          focusBorderColor="cyan.400"
          {...register("title")}
        />
      </div>
      <div>
        <Textarea
          bg="white"
          placeholder={t("write.description")}
          focusBorderColor="cyan.400"
          {...register("description")}
        />
      </div>
      <Button colorScheme="cyan" color="white" type="submit">
        {t("write.submit")}
      </Button>
    </Flex>
  );
}
