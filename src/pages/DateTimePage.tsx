import {
  Card,
  Grid,
  Input,
  InputGroup,
  NumberInput,
  Clipboard,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function DateTimePage() {
  const [startDate, setStartDate] = useState(dayjs());
  const [addDays, setAddDays] = useState("");
  const [endDate, setEndDate] = useState(dayjs());

  useEffect(() => {
    calculateEndDate();
  }, [startDate, addDays]);

  const calculateEndDate = () => {
    if (startDate && addDays) {
      const date = dayjs(startDate);
      const _endDate = dayjs(date.add(+addDays, "day")).toDate();
      setEndDate(dayjs(_endDate));
    }
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap="6">
      <Card.Root>
        <Card.Body gap="2">
          <Card.Title mt="2">Ngày kết thúc</Card.Title>
          <Input
            type="date"
            placeholder="Ngày bắt đầu"
            value={startDate.format("YYYY-MM-DD")}
            onChange={(e) => {
              setStartDate(dayjs(e.target.value));
            }}
          />
          <NumberInput.Root
            value={addDays}
            onValueChange={(e) => {
              setAddDays(e.value);
            }}
          >
            <InputGroup
              endElement="ngày"
              endElementProps={{ color: "gray.300" }}
            >
              <NumberInput.Input
                placeholder="Nhập số ngày"
                _placeholder={{ fontStyle: "italic", color: "gray.300" }}
              />
            </InputGroup>
          </NumberInput.Root>
          Ngày kết thúc: {endDate.format("DD/MM/YYYY")}
          <Clipboard.Root
            value={endDate.format("DD/MM/YYYY")}
            pt="2"
            alignSelf="end"
          >
            <Clipboard.Trigger asChild>
              <Button variant="surface" size="xs">
                <Clipboard.Indicator />
              </Button>
            </Clipboard.Trigger>
          </Clipboard.Root>
        </Card.Body>
      </Card.Root>

      {/* <Card.Root>
        <Card.Body gap="2">
          <Card.Title mt="2">Số ngày chênh lệch</Card.Title>
        </Card.Body>
      </Card.Root> */}
    </Grid>
  );
}
