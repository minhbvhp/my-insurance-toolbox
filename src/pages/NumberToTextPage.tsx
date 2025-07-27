import { docSoTienUSD } from "@/utils/doc-so-tien-usd";
import { capitalizeFirstLetter } from "@/utils/helper";
import { readEnglishNumber } from "@/utils/read-english-number";
import { readUSDInEnglish } from "@/utils/read-usd-in-english";
import { readVietnameseNumber } from "@/utils/read-vietnamese-number";
import {
  Button,
  Card,
  Clipboard,
  Grid,
  InputGroup,
  NumberInput,
} from "@chakra-ui/react";
import { useState } from "react";

export default function NumberToTextPage() {
  const [vndViValue, setVndViValue] = useState("");
  const [vndViInWords, setVndViInWords] = useState("");

  const [vndEnValue, setVndEnValue] = useState("");
  const [vndEnInWords, setVndEnInWords] = useState("");

  const [usdViValue, setUsdViValue] = useState("");
  const [usdViInWords, setUsdViInWords] = useState("");

  const [usdEnValue, setUsdEnValue] = useState("");
  const [usdEnInWords, setUsdEnInWords] = useState("");

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap="6">
      <Card.Root>
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
              <NumberInput.Input
                placeholder="Nhập số tiền"
                _placeholder={{ fontStyle: "italic", color: "gray.300" }}
              />
            </InputGroup>
          </NumberInput.Root>

          {vndViInWords}

          <Clipboard.Root value={vndViInWords} pt="2" alignSelf="end">
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
              <NumberInput.Input
                placeholder="Nhập số tiền"
                _placeholder={{ fontStyle: "italic", color: "gray.300" }}
              />
            </InputGroup>
          </NumberInput.Root>

          {vndEnInWords}

          <Clipboard.Root value={vndEnInWords} pt="2" alignSelf="end">
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
          <Card.Title mt="2">Đọc tiền USD (Việt)</Card.Title>
          <NumberInput.Root
            formatOptions={{
              useGrouping: true,
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            }}
            locale="en-US"
            value={usdViValue}
            onValueChange={(e) => {
              setUsdViValue(e.value);
              setUsdViInWords(
                capitalizeFirstLetter(docSoTienUSD(e.valueAsNumber))
              );
            }}
          >
            <InputGroup
              endElement="USD"
              endElementProps={{ color: "gray.300" }}
            >
              <NumberInput.Input
                placeholder="Nhập số tiền"
                _placeholder={{ fontStyle: "italic", color: "gray.300" }}
              />
            </InputGroup>
          </NumberInput.Root>

          {usdViInWords}

          <Clipboard.Root value={usdViInWords} pt="2" alignSelf="end">
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
          <Card.Title mt="2">Đọc tiền USD (Anh)</Card.Title>
          <NumberInput.Root
            formatOptions={{
              useGrouping: true,
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            }}
            locale="en-US"
            value={usdEnValue}
            onValueChange={(e) => {
              setUsdEnValue(e.value);
              setUsdEnInWords(
                capitalizeFirstLetter(readUSDInEnglish(e.valueAsNumber))
              );
            }}
          >
            <InputGroup
              endElement="USD"
              endElementProps={{ color: "gray.300" }}
            >
              <NumberInput.Input
                placeholder="Nhập số tiền"
                _placeholder={{ fontStyle: "italic", color: "gray.300" }}
              />
            </InputGroup>
          </NumberInput.Root>

          {usdEnInWords}

          <Clipboard.Root value={usdEnInWords} pt="2" alignSelf="end">
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
