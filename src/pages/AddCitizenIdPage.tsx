import { toaster } from "@/components/ui/toaster";
import { Tooltip } from "@/components/ui/tooltip";
import { extractAccountAndCitizen } from "@/utils/helper";
import {
  Box,
  ButtonGroup,
  FileUpload,
  IconButton,
  Stack,
  Steps,
  useFileUpload,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaFileExcel } from "react-icons/fa";
import { LuHardDriveUpload } from "react-icons/lu";
import * as XLSX from "xlsx";

type AccountAndCitizen = {
  so_tai_khoan: string;
  so_cccd: string;
};

export default function AddCitizenIdPage() {
  const [summaryData, setSummaryData] = useState<AccountAndCitizen[]>([]);

  const lastProcessedFile = useRef<string | null>(null);

  const summaryFile = useFileUpload({
    maxFiles: 1,
    accept: ".xlsx",
  });

  const needModifyFile = useFileUpload({
    maxFiles: 1,
    accept: ".xlsx",
  });

  const readSummaryFile = async (files: File[]) => {
    const file = files?.[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const extracted = extractAccountAndCitizen(sheet);

    if (extracted.length === 0) {
      toaster.create({
        title: "Lỗi !!!",
        type: "error",
        description: "File không hợp lệ",
        closable: true,
      });

      setSummaryData([]);

      return;
    }

    setSummaryData(extracted);
  };

  const readNeedModifyFile = async (files: File[]) => {
    const file = files?.[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet);

    console.log(json);
  };

  // const exportExcel = () => {
  //   const data = [
  //     { name: "Alice", age: 24 },
  //     { name: "Bob", age: 30 },
  //   ];

  //   // Convert JSON → worksheet
  //   const worksheet = XLSX.utils.json_to_sheet(data);

  //   // Tạo workbook mới
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  //   // Xuất file
  //   XLSX.writeFile(workbook, "example.xlsx");
  // };

  useEffect(() => {
    const file = summaryFile.acceptedFiles[0];
    if (!file) return;

    // chặn xử lý lại cùng 1 file
    if (lastProcessedFile.current === file.name) return;
    lastProcessedFile.current = file.name;

    readSummaryFile([file]);
  }, [summaryFile.acceptedFiles]);

  useEffect(() => {
    const file = needModifyFile.acceptedFiles[0];
    if (!file) return;

    // chặn xử lý lại cùng 1 file
    if (lastProcessedFile.current === file.name) return;
    lastProcessedFile.current = file.name;

    readNeedModifyFile([file]);
  }, [needModifyFile.acceptedFiles]);

  return (
    <Stack
      marginX={{ base: "20px", lg: "180px" }}
      marginY={{ base: "20px", md: "40px" }}
    >
      <Steps.Root
        width={{ base: "full", md: "680px" }}
        defaultStep={0}
        count={2}
      >
        <Steps.List>
          <Steps.Item key={0} index={0}>
            <Steps.Indicator />
            <Box>
              <Steps.Title>File tổng hợp</Steps.Title>
              <Steps.Description>
                <Stack alignItems="center" marginTop="2">
                  <FaFileExcel
                    color={
                      summaryData && summaryData.length > 0 ? "green" : "gray"
                    }
                  />

                  <Flex maxWidth={{ base: "20px", md: "120px" }}>
                    <Tooltip content={summaryFile.acceptedFiles?.[0]?.name}>
                      <Text truncate>
                        {summaryFile.acceptedFiles?.[0]?.name}
                      </Text>
                    </Tooltip>
                  </Flex>
                </Stack>
              </Steps.Description>
            </Box>
            <Steps.Separator />
          </Steps.Item>

          <Steps.Item key={1} index={1}>
            <Steps.Indicator />
            <Box>
              <Steps.Title>File cần thêm CCCD</Steps.Title>
              <Steps.Description>
                <Stack alignItems="center" marginTop="2">
                  <FaFileExcel
                    color={
                      needModifyFile.acceptedFiles &&
                      needModifyFile.acceptedFiles.length > 0
                        ? "green"
                        : "gray"
                    }
                  />

                  <Flex maxWidth={{ base: "20px", md: "120px" }}>
                    <Tooltip content={needModifyFile.acceptedFiles?.[0]?.name}>
                      <Text truncate>
                        {needModifyFile.acceptedFiles?.[0]?.name}
                      </Text>
                    </Tooltip>
                  </Flex>
                </Stack>
              </Steps.Description>
            </Box>
            <Steps.Separator />
          </Steps.Item>
        </Steps.List>

        <Steps.Content key={0} index={0} marginY="6">
          <FileUpload.RootProvider alignItems="center" value={summaryFile}>
            <FileUpload.HiddenInput />
            <FileUpload.Trigger asChild>
              <IconButton>
                <LuHardDriveUpload />
              </IconButton>
            </FileUpload.Trigger>
          </FileUpload.RootProvider>
        </Steps.Content>

        <Steps.Content key={1} index={1} marginY="6">
          <FileUpload.RootProvider alignItems="center" value={needModifyFile}>
            <FileUpload.HiddenInput />
            <FileUpload.Trigger asChild>
              <IconButton>
                <LuHardDriveUpload />
              </IconButton>
            </FileUpload.Trigger>
          </FileUpload.RootProvider>
        </Steps.Content>

        <Steps.CompletedContent marginY="6">
          Đã sẵn sàng tải về
        </Steps.CompletedContent>

        <Stack alignItems="center">
          <ButtonGroup size="sm" variant="outline">
            <Steps.PrevTrigger asChild>
              <IconButton>
                <FaAngleLeft />
              </IconButton>
            </Steps.PrevTrigger>
            <Steps.NextTrigger asChild>
              <IconButton>
                <FaAngleRight />
              </IconButton>
            </Steps.NextTrigger>
          </ButtonGroup>
        </Stack>
      </Steps.Root>
    </Stack>
  );
}
