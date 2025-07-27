import {
  Box,
  Drawer,
  Icon,
  Image,
  Link,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaCalendar } from "react-icons/fa";
import { RxGithubLogo } from "react-icons/rx";
import { SiConvertio } from "react-icons/si";
import { useLocation } from "react-router-dom";

export const navItems = [
  {
    icon: <SiConvertio />,
    label: "Đọc số",
    path: "/my-insurance-toolbox/#/number-to-text",
    description: "Đọc số tiền (VND, USD) sang chữ bằng ngôn ngữ Anh và Việt...",
  },
  {
    icon: <FaCalendar />,
    label: "Ngày tháng",
    path: "/my-insurance-toolbox/#/date-time",
    description:
      "Tính toán ngày kết thúc khi nhập ngày bắt đầu và một số ngày nhất định, chênh lệch ngày giữa hai thời điểm...",
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
            <Text fontWeight={isActive ? "medium" : "normal"} pl={2}>
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
        w={48}
        bg="gray.100"
        borderRight="1px solid"
        borderColor="blackAlpha.100"
        pos="fixed"
        h="full"
        display={{ base: "none", md: "block" }}
        pt={8}
      >
        <a href="/">
          <Image
            src="/my-insurance-toolbox/logo.png"
            alt="My Insurance Toolbox"
            boxSize={12}
            mx="auto"
            mb={4}
          />
        </a>

        <SidebarContent />

        <a
          href="https://github.com/minhbvhp"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            bottom: 4,
            width: "100%",
          }}
        >
          <Icon size={"2xl"} mb={12}>
            <RxGithubLogo />
          </Icon>
        </a>
      </Box>
    </>
  );
}
