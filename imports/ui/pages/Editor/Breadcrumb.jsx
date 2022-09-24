import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

export default function EditorBreadcrumb({ fic }) {
  if (!fic) return null;

  return (
    <Breadcrumb fontSize="xs" separator={<ChevronRightIcon color="gray.400" />}>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/write">
          Write
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink>Editor</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to={`/fics/${fic._id}`}>
          {fic.title}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
