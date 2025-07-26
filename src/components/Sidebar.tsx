import {
  Box,
  Drawer,
  Icon,
  Link,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RxGithubLogo } from "react-icons/rx";
import { SiConvertio, SiGitextensions } from "react-icons/si";
import { useLocation } from "react-router-dom";

const navItems = [
  {
    icon: <SiConvertio />,
    label: "Đọc số",
    path: "/my-insurance-toolbox/#/number-to-text",
  },
  {
    icon: <SiGitextensions />,
    label: "Settings",
    path: "/my-insurance-toolbox/#/settings",
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: (e: any) => void;
}

function SidebarContent() {
  const location = useLocation();
  const currentPath = location.hash?.replace(/^#/, "") || location.pathname;

  return (
    <VStack align="stretch" gap={1} p={4}>
      {navItems.map((item) => {
        const itemHashPath = item.path.replace(/^.*#/, "");

        const isActive = currentPath === itemHashPath;

        return (
          <Link
            href={item.path}
            key={item.path}
            p={2}
            borderRadius="md"
            focusRing={"none"}
            bg={isActive ? "primary.300" : "transparent"}
            color={isActive ? "white" : "primary.500"}
            _hover={{
              bg: isActive ? "primary.300" : "primary.50",
              textDecoration: "none",
            }}
          >
            <Icon size="sm">{item.icon}</Icon>
            <Text fontWeight={isActive ? "medium" : "normal"}>
              {item.label}
            </Text>
          </Link>
        );
      })}
    </VStack>
  );
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Drawer */}
      <Drawer.Root
        open={isOpen}
        placement={"top"}
        onOpenChange={(e) => onClose(e.open)}
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <SidebarContent />
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>

      {/* Desktop Sidebar */}

      <Box
        w="80"
        bg="gray.100"
        borderRight="1px solid"
        borderColor="blackAlpha.100"
        pos="fixed"
        h="full"
        display={{ base: "none", md: "block" }}
        pt={8}
      >
        <a
          href="https://github.com/minhbvhp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon size={"lg"} color={"primary.500"} mb={4} animation={"bounce"}>
            <RxGithubLogo />
          </Icon>
        </a>

        <SidebarContent />
      </Box>
    </>
  );
}
