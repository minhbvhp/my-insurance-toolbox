import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Box, useDisclosure } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <Box height="100vh" w={"full"}>
      <Sidebar isOpen={open} onClose={onClose} />
      <Box pl={{ base: 0, md: 60 }}>
        <Header onOpen={onOpen} />
        <Box p={{ base: 10, md: 24 }} pl={{ md: 60 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
