import { extractAccountAndCitizen, extractColumnValues } from "@/utils/helper";
import {
  Box,
  ButtonGroup,
  FileUpload,
  IconButton,
  Stack,
  Steps,
  useFileUpload,
} from "@chakra-ui/react";
import { FaAngleLeft, FaAngleRight, FaFileExcel } from "react-icons/fa";
import { LuHardDriveUpload } from "react-icons/lu";
import * as XLSX from "xlsx";

export default function AddCitizenIdPage() {
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
    console.log("RESULT:", extracted);
  };

  const readNeedModifyFile = async (files: File[]) => {
    const file = files?.[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet);

    console.log("Need modify file JSON output:", json);
  };

  const steps = [
    {
      id: 1,
      title: "File tổng hợp",
      uploader: summaryFile,
      handler: () => readSummaryFile(summaryFile.acceptedFiles),
    },
    {
      id: 2,
      title: "File cần thêm CCCD",
      uploader: needModifyFile,
      handler: () => readNeedModifyFile(needModifyFile.acceptedFiles),
    },
  ];

  const exportExcel = () => {
    const data = [
      { name: "Alice", age: 24 },
      { name: "Bob", age: 30 },
    ];

    // Convert JSON → worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Tạo workbook mới
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Xuất file
    XLSX.writeFile(workbook, "example.xlsx");
  };

  return (
    <Stack
      marginX={{ base: "20px", md: "40px", lg: "180px" }}
      marginY={{ base: "20px", md: "40px" }}
    >
      <Steps.Root width="600px" defaultStep={1} count={steps.length}>
        <Steps.List>
          {steps.map((step, index) => (
            <Steps.Item key={index} index={index} title={step.title}>
              <Steps.Indicator />
              <Box>
                <Steps.Title>{step.title}</Steps.Title>
                <Steps.Description>
                  <Stack alignItems="center" marginTop="2">
                    <FaFileExcel />
                  </Stack>
                </Steps.Description>
              </Box>
              <Steps.Separator />
            </Steps.Item>
          ))}
        </Steps.List>

        {steps.map((step, index) => (
          <Steps.Content key={index} index={index} marginY="6">
            <FileUpload.RootProvider
              alignItems="center"
              value={step.uploader}
              onChange={step.handler}
            >
              <FileUpload.HiddenInput />
              <FileUpload.Trigger asChild>
                <IconButton>
                  <LuHardDriveUpload />
                </IconButton>
              </FileUpload.Trigger>
            </FileUpload.RootProvider>
          </Steps.Content>
        ))}

        <Steps.CompletedContent marginY="6">
          Đã sẵn sàng tải về
        </Steps.CompletedContent>

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
      </Steps.Root>
    </Stack>
  );
}
