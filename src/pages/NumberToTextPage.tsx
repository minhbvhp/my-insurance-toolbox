import { capitalizeFirstLetter } from "@/utils/helper";
import { readEnglishNumber } from "@/utils/read-english-number";
import { readVietnameseNumber } from "@/utils/read-vietnamese-number";
import { Card, InputGroup, NumberInput, Stack } from "@chakra-ui/react";
import { useState } from "react";

export default function NumberToTextPage() {
  const [vndViValue, setVndViValue] = useState("0");
  const [vndViInWords, setVndViInWords] = useState("");

  const [vndEnValue, setVndEnValue] = useState("0");
  const [vndEnInWords, setVndEnInWords] = useState("");

  return (
    <Stack direction="row" justify={"space-between"} gap={20}>
      <Card.Root width={"1/2"}>
        <Card.Body gap="2">
          <Card.Title mt="2">Đọc tiền VND (Việt)</Card.Title>
          <NumberInput.Root
            formatOptions={{
              useGrouping: true,
            }}
            locale="vi-VN"
            value={vndViValue}
            onValueChange={(e) => {
              setVndViValue(e.value);
              setVndViInWords(
                capitalizeFirstLetter(readVietnameseNumber(e.valueAsNumber))
              );
            }}
          >
            <InputGroup
              endElement="VND"
              endElementProps={{ color: "gray.300" }}
            >
              <NumberInput.Input />
            </InputGroup>
          </NumberInput.Root>

          {vndViInWords}
        </Card.Body>
      </Card.Root>

      <Card.Root width={"1/2"}>
        <Card.Body gap="2">
          <Card.Title mt="2">Đọc tiền VND (Anh)</Card.Title>
          <NumberInput.Root
            formatOptions={{
              useGrouping: true,
            }}
            locale="vi-VN"
            value={vndEnValue}
            onValueChange={(e) => {
              setVndEnValue(e.value);
              setVndEnInWords(
                capitalizeFirstLetter(readEnglishNumber(e.valueAsNumber))
              );
            }}
          >
            <InputGroup
              endElement="VND"
              endElementProps={{ color: "gray.300" }}
            >
              <NumberInput.Input />
            </InputGroup>
          </NumberInput.Root>

          {vndEnInWords}
        </Card.Body>
      </Card.Root>
    </Stack>
  );
}
