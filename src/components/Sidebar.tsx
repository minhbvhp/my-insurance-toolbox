import { Box, Drawer, Link, Portal, Text, VStack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/my-insurance-toolbox" },
  { label: "Settings", path: "/my-insurance-toolbox/#/settings" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: (e: any) => void;
}

function SidebarContent() {
  const location = useLocation();
  return (
    <VStack align="stretch" gap={1} p={4}>
      {navItems.map((item) => (
        <Link
          href={item.path}
          key={item.path}
          p={2}
          borderRadius="md"
          bg={location.pathname === item.path ? "gray.200" : "transparent"}
          _hover={{ bg: "gray.100" }}
        >
          <Text>{item.label}</Text>
        </Link>
      ))}
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
        w="60"
        bg="white"
        borderRight="1px solid"
        borderColor="primary.100"
        pos="fixed"
        h="full"
        display={{ base: "none", md: "block" }}
      >
        <SidebarContent />
      </Box>
    </>
  );
}
