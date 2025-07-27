import { navItems } from "@/components/Sidebar";
import { Card, For, Grid, Icon, Link, Text } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" mb={4} color={"primary.500"}>
        My Insurance Toolbox
      </Text>

      <Grid templateColumns="repeat(4, 1fr)" gap="6" pt={16}>
        <For each={navItems}>
          {(item) => (
            <Card.Root
              _hover={{ borderColor: "primary.300" }}
              transition="border-color 0.4s ease-in-out"
            >
              <Link
                href={item.path}
                key={item.path}
                _hover={{ textDecoration: "none" }}
                focusRing={"none"}
              >
                <Card.Body gap="2">
                  <Card.Title mt="2" spaceY={4}>
                    <Icon size={"2xl"} color={"primary.500"}>
                      {item.icon}
                    </Icon>
                    <Text>{item.label}</Text>
                  </Card.Title>
                  <Card.Description>{item.description}</Card.Description>
                </Card.Body>
              </Link>
            </Card.Root>
          )}
        </For>
      </Grid>
    </>
  );
}
