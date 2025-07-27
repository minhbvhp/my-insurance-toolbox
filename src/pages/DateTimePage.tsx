import {
  Card,
  Grid,
  Input,
  InputGroup,
  NumberInput,
  Clipboard,
  Button,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { GoNumber } from "react-icons/go";
import { LuCalendarArrowDown } from "react-icons/lu";

export default function DateTimePage() {
  const [firstStartDate, setFirstStartDate] = useState(dayjs());
  const [firstAddDays, setFirstAddDays] = useState("");
  const [firstEndDate, setFirstEndDate] = useState(dayjs());

  const [secondStartDate, setSecondStartDate] = useState(dayjs());
  const [secondEndDate, setSecondEndDate] = useState(dayjs());
  const [secondDiffDays, setSecondDiffDays] = useState("");

  useEffect(() => {
    calculateEndDate();
  }, [firstStartDate, firstAddDays]);

  useEffect(() => {
    calculateDiffDays();
  }, [secondStartDate, secondEndDate]);

  const calculateEndDate = () => {
    if (firstStartDate && firstAddDays) {
      const date = dayjs(firstStartDate);
      const _endDate = dayjs(date.add(+firstAddDays, "day")).toDate();
      setFirstEndDate(dayjs(_endDate));
    }
  };

  const calculateDiffDays = () => {
    if (secondStartDate && secondEndDate) {
      const _startDate = dayjs(secondStartDate);
      const _endDate = dayjs(secondEndDate);
      const diffDays = _endDate.diff(_startDate, "day") + 1;
      setSecondDiffDays(diffDays.toString());
    }
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap="6">
      <Card.Root>
        <Card.Body gap="2">
          <Card.Title mt="2">Ngày kết thúc</Card.Title>
          <InputGroup startElement={<LuCalendarArrowDown />}>
            <Input
              type="date"
              placeholder="Ngày bắt đầu"
              value={firstStartDate.format("YYYY-MM-DD")}
              onChange={(e) => {
                setFirstStartDate(dayjs(e.target.value));
              }}
            />
          </InputGroup>

          <NumberInput.Root
            value={firstAddDays}
            onValueChange={(e) => {
              setFirstAddDays(e.value);
            }}
          >
            <InputGroup
              startElement={<GoNumber />}
              endElement="ngày"
              endElementProps={{ color: "gray.300" }}
            >
              <NumberInput.Input
                placeholder="Nhập số ngày"
                _placeholder={{ fontStyle: "italic", color: "gray.300" }}
              />
            </InputGroup>
          </NumberInput.Root>
          <Text>
            Ngày kết thúc (gồm 2 ngày biên):{" "}
            <span style={{ fontWeight: "bold" }}>
              {firstEndDate.format("DD/MM/YYYY")}
            </span>
          </Text>

          <Clipboard.Root
            value={firstEndDate.format("DD/MM/YYYY")}
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

      <Card.Root>
        <Card.Body gap="2">
          <Card.Title mt="2">Ngày chênh lệch</Card.Title>
          <InputGroup startElement={<LuCalendarArrowDown />}>
            <Input
              type="date"
              placeholder="Ngày bắt đầu"
              value={secondStartDate.format("YYYY-MM-DD")}
              onChange={(e) => {
                setSecondStartDate(dayjs(e.target.value));
              }}
            />
          </InputGroup>

          <InputGroup startElement={<LuCalendarArrowDown />}>
            <Input
              type="date"
              placeholder="Ngày kết thúc"
              value={secondEndDate.format("YYYY-MM-DD")}
              onChange={(e) => {
                setSecondEndDate(dayjs(e.target.value));
              }}
            />
          </InputGroup>

          <Text>
            Số ngày chênh lệch (gồm 2 ngày biên):{" "}
            <span style={{ fontWeight: "bold" }}>{secondDiffDays}</span>
          </Text>

          <Clipboard.Root value={secondDiffDays} pt="2" alignSelf="end">
            <Clipboard.Trigger asChild>
              <Button variant="surface" size="xs">
                <Clipboard.Indicator />
              </Button>
            </Clipboard.Trigger>
          </Clipboard.Root>
        </Card.Body>
      </Card.Root>
    </Grid>
  );
}
