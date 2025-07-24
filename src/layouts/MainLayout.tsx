import Header from "@/components/Header";
import Sidebar from "@/components/SideBar";
import { Box, Container, Stack, useDisclosure } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="gray.50" height="100vh" w={"full"}>
      <Sidebar isOpen={open} onClose={onClose} />
      <Box pl={{ base: 0, md: 60 }}>
        <Header onOpen={onOpen} />
        <Box p={4}>{children}</Box>
      </Box>
    </Box>
  );
}
