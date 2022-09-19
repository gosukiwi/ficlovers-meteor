import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslator } from "/imports/ui/i18n";
import ValidationErrors from "/imports/ui/ValidationErrors";
import { Heading, Flex, Input, Textarea, Button } from "@chakra-ui/react";

export default function Write() {
  const [error, setError] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const t = useTranslator();

  const onSubmit = ({ title, description }) => {
    Meteor.call("fics.insert", title, description, (err) => {
      setError(<ValidationErrors error={err} />);
    });
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
          required
          maxLength={50}
          bg="white"
          placeholder={t("write.title")}
          focusBorderColor="cyan.400"
          {...register("title")}
        />
      </div>
      <div>
        <Textarea
          required
          maxLength={500}
          bg="white"
          placeholder={t("write.description")}
          focusBorderColor="cyan.400"
          {...register("description")}
        />
      </div>
      <Button colorScheme="cyan" color="white" type="submit">
        {t("write.submit")}
      </Button>
      {error}
    </Flex>
  );
}
