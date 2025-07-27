import { navItems } from "@/components/Sidebar";
import { Card, For, Grid, Icon, Text } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        My Insurance Toolbox
      </Text>
      <Text mb={8}>
        Đây là những tiện ích nhỏ giúp tính toán thao tác nhanh các thông tin
        liên quan đến bảo hiểm.
      </Text>

      <Grid templateColumns="repeat(4, 1fr)" gap="6" pt={16}>
        <For each={navItems}>
          {(item) => (
            <Card.Root
              as={"a" as React.ElementType}
              href={item.path}
              key={item.path}
              _hover={{ borderColor: "primary.300" }}
              transition="border-color 0.4s ease-in-out"
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
            </Card.Root>
          )}
        </For>
      </Grid>
    </>
  );
}
