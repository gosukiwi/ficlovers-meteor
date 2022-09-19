import { Meteor } from "meteor/meteor";
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { useTranslator } from "/imports/ui/i18n";
import { Link as RRLink, useLocation } from "react-router-dom";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiUser,
  FiSettings,
  FiMenu,
  FiEdit3,
  FiTrendingUp,
  FiSearch,
  FiHeart,
} from "react-icons/fi";

export default function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

function SidebarContent({ onClose, ...rest }) {
  const location = useLocation();
  const currentRoute = location.pathname;
  const t = useTranslator();
  const user = useTracker(() => Meteor.user());
  const username = user && user.username;

  let LinkItems = [
    { name: t("sidebar.trending"), icon: FiTrendingUp, to: "/" },
    { name: t("sidebar.explore"), icon: FiSearch, to: "/explore" },
    { name: t("sidebar.favorites"), icon: FiHeart, to: "/favorites" },
    // { name: "Trending", icon: FiTrendingUp },
    // { name: "Explore", icon: FiCompass },
    // { name: "Favourites", icon: FiStar },
  ];

  if (user) {
    LinkItems = LinkItems.concat([
      { name: t("sidebar.write"), icon: FiEdit3, to: "/write" },
      { name: t("sidebar.profile"), icon: FiUser },
      { name: t("sidebar.settings"), icon: FiSettings },
      { name: t("sidebar.sign_out"), icon: FiUser, to: "/logout" },
    ]);
  } else {
    LinkItems = LinkItems.concat([
      { name: t("sidebar.sign_up"), icon: FiEdit3, to: "/register" },
      { name: t("sidebar.sign_in"), icon: FiUser, to: "/login" },
    ]);
  }

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Ficlovers
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          current={currentRoute === link.to}
          icon={link.icon}
          to={link.to}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
}

function NavItem({ icon, to, current, children, ...rest }) {
  return (
    <Link
      as={RRLink}
      to={to}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        bg={current ? "cyan.400" : ""}
        color={current ? "white" : ""}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
}

function MobileNav({ onOpen, ...rest }) {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Ficlovers
      </Text>
    </Flex>
  );
}
