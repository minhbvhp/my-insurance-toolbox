import { Button, Flex } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

interface HeaderProps {
  onOpen: () => void;
}

export default function Header({ onOpen }: HeaderProps) {
  return (
    <Flex
      align="center"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      justify="end"
      h="16"
      display={{ base: "flex", md: "none" }}
    >
      <Button
        variant="outline"
        onClick={onOpen}
        aria-label="Open menu"
        display={{ base: "inline-flex", md: "none" }}
        mr={4}
      >
        <FiMenu />
      </Button>
    </Flex>
  );
}
