import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
}

// function NavBar() {
//   const { isOpen, onToggle } = useDisclosure();
//   const t = useTranslator();
//   const user = useTracker(() => Meteor.user());
//   const username = user && user.username;

//   return (
//     <Box>
//       <Flex
//         bg={useColorModeValue("white", "gray.800")}
//         color={useColorModeValue("gray.600", "white")}
//         minH="60px"
//         py={{ base: 2 }}
//         px={{ base: 4 }}
//         borderBottom={1}
//         borderStyle="solid"
//         borderColor={useColorModeValue("gray.200", "gray.900")}
//         align="center"
//       >
//         <Flex
//           flex={{ base: 1, md: "auto" }}
//           ml={{ base: -2 }}
//           display={{ base: "flex", md: "none" }}
//         >
//           <IconButton
//             onClick={onToggle}
//             icon={
//               isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
//             }
//             variant="ghost"
//             aria-label="Toggle Navigation"
//           />
//         </Flex>
//         <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
//           <Text
//             textAlign={useBreakpointValue({ base: "center", md: "left" })}
//             fontFamily="heading"
//             color={useColorModeValue("gray.800", "white")}
//           >
//             <strong>Ficlovers</strong>
//           </Text>

//           <Flex display={{ base: "none", md: "flex" }} ml={10}>
//             <DesktopNav />
//           </Flex>
//         </Flex>

//         <Stack
//           flex={{ base: 1, md: 0 }}
//           justify="flex-end"
//           direction="row"
//           spacing={6}
//         >
//           {user ? (
//             <Button
//               as={RRLink}
//               to="/logout"
//               fontSize="sm"
//               fontWeight={400}
//               variant="link"
//             >
//               {username}
//             </Button>
//           ) : (
//             <>
//               <Button
//                 as={RRLink}
//                 to="/login"
//                 fontSize="sm"
//                 fontWeight={400}
//                 variant="link"
//               >
//                 Sign In
//               </Button>
//               <Button
//                 as={RRLink}
//                 display={{ base: "none", md: "inline-flex" }}
//                 fontSize="sm"
//                 fontWeight={600}
//                 color="white"
//                 bg="pink.400"
//                 href="/login"
//                 _hover={{
//                   bg: "pink.300",
//                 }}
//               >
//                 Sign Up
//               </Button>
//             </>
//           )}
//         </Stack>
//       </Flex>

//       <Collapse in={isOpen} animateOpacity>
//         <MobileNav />
//       </Collapse>
//     </Box>
//   );
// }

// function DesktopNav() {
//   const linkColor = useColorModeValue("gray.600", "gray.200");
//   const linkHoverColor = useColorModeValue("gray.800", "white");
//   const popoverContentBgColor = useColorModeValue("white", "gray.800");

//   return (
//     <Stack direction="row" spacing={4}>
//       {NAV_ITEMS.map((navItem) => (
//         <Box key={navItem.label}>
//           <Popover trigger="hover" placement="bottom-start">
//             <PopoverTrigger>
//               <Link
//                 as={RRLink}
//                 to={navItem.href ?? "/"}
//                 p={2}
//                 fontSize="sm"
//                 fontWeight={500}
//                 color={linkColor}
//                 _hover={{
//                   textDecoration: "none",
//                   color: linkHoverColor,
//                 }}
//               >
//                 {navItem.label}
//               </Link>
//             </PopoverTrigger>

//             {navItem.children && (
//               <PopoverContent
//                 border={0}
//                 boxShadow="xl"
//                 bg={popoverContentBgColor}
//                 p={4}
//                 rounded="xl"
//                 minW="sm"
//               >
//                 <Stack>
//                   {navItem.children.map((child) => (
//                     <DesktopSubNav key={child.label} {...child} />
//                   ))}
//                 </Stack>
//               </PopoverContent>
//             )}
//           </Popover>
//         </Box>
//       ))}
//     </Stack>
//   );
// }

// function DesktopSubNav({ label, href, subLabel }) {
//   return (
//     <Link
//       href={href}
//       role="group"
//       display="block"
//       p={2}
//       rounded="md"
//       _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
//     >
//       <Stack direction="row" align="center">
//         <Box>
//           <Text
//             transition="all .3s ease"
//             _groupHover={{ color: "pink.400" }}
//             fontWeight={500}
//           >
//             {label}
//           </Text>
//           <Text fontSize="sm">{subLabel}</Text>
//         </Box>
//         <Flex
//           transition="all .3s ease"
//           transform="translateX(-10px)"
//           opacity={0}
//           _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
//           justify="flex-end"
//           align="center"
//           flex={1}
//         >
//           <Icon color="pink.400" w={5} h={5} as={ChevronRightIcon} />
//         </Flex>
//       </Stack>
//     </Link>
//   );
// }

// function MobileNav() {
//   return (
//     <Stack
//       bg={useColorModeValue("white", "gray.800")}
//       p={4}
//       display={{ md: "none" }}
//     >
//       {NAV_ITEMS.map((navItem) => (
//         <MobileNavItem key={navItem.label} {...navItem} />
//       ))}
//     </Stack>
//   );
// }

// function MobileNavItem({ label, children, href }) {
//   const { isOpen, onToggle } = useDisclosure();

//   return (
//     <Stack spacing={4} onClick={children && onToggle}>
//       <Flex
//         py={2}
//         as={RRLink}
//         to={href ?? "#"}
//         justify="space-between"
//         align="center"
//         _hover={{
//           textDecoration: "none",
//         }}
//       >
//         <Text
//           fontWeight={600}
//           color={useColorModeValue("gray.600", "gray.200")}
//         >
//           {label}
//         </Text>
//         {children && (
//           <Icon
//             as={ChevronDownIcon}
//             transition="all .25s ease-in-out"
//             transform={isOpen ? "rotate(180deg)" : ""}
//             w={6}
//             h={6}
//           />
//         )}
//       </Flex>

//       <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
//         <Stack
//           mt={2}
//           pl={4}
//           borderLeft={1}
//           borderStyle="solid"
//           borderColor={useColorModeValue("gray.200", "gray.700")}
//           align="start"
//         >
//           {children &&
//             children.map((child) => (
//               <Link key={child.label} py={2} href={child.href}>
//                 {child.label}
//               </Link>
//             ))}
//         </Stack>
//       </Collapse>
//     </Stack>
//   );
// }

// const NAV_ITEMS = [
//   {
//     label: "Home",
//     href: "/",
//   },
//   {
//     label: "Fics",
//     href: "/fics",
//   },
//   {
//     label: "Write",
//     href: "/write",
//   },
// ];
