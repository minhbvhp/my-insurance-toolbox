import { toaster } from "@/components/ui/toaster";
import { Tooltip } from "@/components/ui/tooltip";
import {
  buildAccountMap,
  extractAccountAndCitizen,
  fillCitizenIdToSheet,
  type AccountAndCitizen,
} from "@/utils/helper";
import {
  Box,
  Button,
  ButtonGroup,
  FileUpload,
  Flex,
  FormatByte,
  IconButton,
  Stack,
  Steps,
  Text,
  useFileUpload,
} from "@chakra-ui/react";
import { Workbook } from "exceljs";
import { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaFileExcel } from "react-icons/fa";
import { LuDownload, LuHardDriveUpload } from "react-icons/lu";

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

    const buffer = await file.arrayBuffer();
    const workbook = new Workbook();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.worksheets[0];

    const extracted = extractAccountAndCitizen(worksheet);

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

    if (summaryData.length === 0) {
      toaster.create({
        title: "Lỗi",
        type: "error",
        description: "Chưa có dữ liệu từ file tổng hợp",
      });
      return;
    }

    const buffer = await file.arrayBuffer();
    const workbook = new Workbook();
    await workbook.xlsx.load(buffer);

    const accountMap = buildAccountMap(summaryData);

    workbook.worksheets.forEach((worksheet) => {
      fillCitizenIdToSheet(worksheet, accountMap);
    });

    const outBuffer = await workbook.xlsx.writeBuffer();

    return new File([outBuffer], "File da them CCCD.xlsx", {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  };

  const downloadExcelFile = (file: File, filename?: string) => {
    const url = URL.createObjectURL(file);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename || file.name;
    a.click();

    URL.revokeObjectURL(url);
  };

  const getFileAfterModify = async (files: File[]) => {
    try {
      const outputFile = await readNeedModifyFile(files);

      if (!outputFile) return;

      downloadExcelFile(outputFile);

      toaster.create({
        title: "Thành công",
        type: "success",
        description: "Đã tạo file Excel đã điền CCCD",
      });
    } catch (err) {
      toaster.create({
        title: "Lỗi",
        type: "error",
        description: (err as Error).message,
      });
    }
  };

  useEffect(() => {
    const file = summaryFile.acceptedFiles[0];
    if (!file) return;

    // chặn xử lý lại cùng 1 file
    if (lastProcessedFile.current === file.name) return;
    lastProcessedFile.current = file.name;

    readSummaryFile([file]);
  }, [summaryFile.acceptedFiles]);

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

        <Steps.CompletedContent marginY="10">
          <Stack alignItems="center">
            <Text fontWeight={"semibold"}>Đã thêm CCCD vào file</Text>
            <Button
              variant="outline"
              onClick={() => getFileAfterModify(needModifyFile.acceptedFiles)}
            >
              <LuDownload /> Tải về (
              <FormatByte
                value={needModifyFile.acceptedFiles?.[0]?.size}
                unitDisplay="short"
              />
              )
            </Button>
          </Stack>
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
