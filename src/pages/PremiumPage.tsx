import CustomPremiumForm from "@/components/CustomPremium";
import PropertyPremiumForm from "@/components/PropertyPremium";
import { Card, Grid } from "@chakra-ui/react";

export default function PremiumPage() {
  return (
    <Grid
      templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
      gap="6"
    >
      <Card.Root>
        <Card.Body gap="2">
          <Card.Title mt="2" color={"primary.600"}>
            Theo hạng mục
          </Card.Title>

          <CustomPremiumForm />
        </Card.Body>
      </Card.Root>

      <Card.Root>
        <Card.Body gap="2">
          <Card.Title mt="2" color={"primary.600"}>
            Đơn tài sản
          </Card.Title>
          <PropertyPremiumForm />
        </Card.Body>
      </Card.Root>
    </Grid>
  );
}
