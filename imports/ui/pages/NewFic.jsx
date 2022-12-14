import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslator } from "/imports/ui/i18n";
import ValidationErrorAlert from "/imports/ui/ValidationErrorAlert";
import { Heading, Flex, Input, Textarea, Button } from "@chakra-ui/react";

export default function Write() {
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();
  const t = useTranslator();
  const navigate = useNavigate();

  const onSubmit = ({ title, description }) => {
    Meteor.call("fics.insert", title, description, (err, ficId) => {
      setError(<ValidationErrorAlert error={err} />);

      if (!err) navigate(`/editor/${ficId}`);
    });
  };

  return (
    <Flex
      gap="12px"
      as="form"
      flexDirection="column"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading size="xl">{t("write.new_fic")}</Heading>
      <Input
        size="lg"
        required
        maxLength={50}
        bg="white"
        placeholder={t("write.title")}
        focusBorderColor="cyan.400"
        {...register("title")}
      />
      <Textarea
        size="lg"
        required
        maxLength={500}
        bg="white"
        placeholder={t("write.description")}
        focusBorderColor="cyan.400"
        {...register("description")}
      />
      <Button colorScheme="cyan" color="white" type="submit">
        {t("write.submit")}
      </Button>
      {error}
    </Flex>
  );
}
