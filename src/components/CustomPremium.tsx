import {
  Box,
  Button,
  Editable,
  Field,
  Fieldset,
  Flex,
  IconButton,
  Input,
  InputGroup,
  NumberInput,
  Separator,
  Stat,
  VStack,
} from "@chakra-ui/react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { GoNumber } from "react-icons/go";
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";

type Item = {
  name: string;
  amount: string;
  rate: string;
};

type FormValues = {
  items: Item[];
};

export default function CustomPremiumForm() {
  const { register, control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      items: [{ name: "", amount: "", rate: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const values = useWatch({ control, name: "items" });

  const calculateFee = (amount: number, rate: number) => (amount * rate) / 100;

  const totalAmount =
    values?.reduce((sum, item) => sum + Number(item.amount || 0), 0) ?? 0;

  const totalFee = values?.reduce(
    (sum, item) =>
      sum + calculateFee(Number(item.amount || 0), Number(item.rate || 0)),
    0
  );

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} p={4}>
      <VStack align="stretch">
        {fields.map((field, index) => {
          const amount = Number(values?.[index]?.amount || 0);
          const rate = Number(values?.[index]?.rate || 0);
          const fee = calculateFee(amount, rate);

          return (
            <Fieldset.Root
              key={field.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
            >
              <Fieldset.Legend as="legend">
                <Editable.Root defaultValue="Hạng mục">
                  <Editable.Preview />
                  <Editable.Input />
                  <Editable.Control>
                    <Editable.EditTrigger asChild>
                      <IconButton variant="ghost" size="xs">
                        <LuPencilLine />
                      </IconButton>
                    </Editable.EditTrigger>
                    <Editable.CancelTrigger asChild>
                      <IconButton variant="outline" size="xs">
                        <LuX />
                      </IconButton>
                    </Editable.CancelTrigger>
                    <Editable.SubmitTrigger asChild>
                      <IconButton variant="outline" size="xs">
                        <LuCheck />
                      </IconButton>
                    </Editable.SubmitTrigger>
                  </Editable.Control>
                </Editable.Root>
              </Fieldset.Legend>

              <Fieldset.Content>
                <Flex gap={4} mt={2} flexWrap="wrap">
                  {/* Số tiền / Mức trách nhiệm */}
                  <Box flex="2" minW="200px">
                    <Field.Root>
                      <Field.Label fontSize="sm">
                        Số tiền / Mức trách nhiệm
                      </Field.Label>
                    </Field.Root>
                    <Controller
                      control={control}
                      name={`items.${index}.amount`}
                      render={({ field }) => (
                        <NumberInput.Root
                          name={field.name}
                          formatOptions={{
                            useGrouping: true,
                          }}
                          locale="vi-VN"
                          value={field.value}
                          onValueChange={({ valueAsNumber }) => {
                            field.onChange(valueAsNumber);
                          }}
                        >
                          <InputGroup
                            startElement={<GoNumber />}
                            endElement="VND"
                            endElementProps={{ color: "gray.300" }}
                          >
                            <NumberInput.Input
                              placeholder="Nhập số tiền"
                              _placeholder={{
                                fontStyle: "italic",
                                color: "gray.300",
                              }}
                            />
                          </InputGroup>
                        </NumberInput.Root>
                        // <NumberInput.Root
                        //   name={field.name}
                        //   value={field.value.toString()}
                        //   onValueChange={({ value }) => {
                        //     field.onChange(value);
                        //   }}
                        // >
                        //   <NumberInput.Control />
                        //   <NumberInput.Input onBlur={field.onBlur} />
                        // </NumberInput.Root>
                      )}
                    />
                  </Box>

                  {/* Tỉ lệ phí */}
                  <Box flex="1" minW="150px">
                    <Field.Root>
                      <Field.Label fontSize="sm">Tỉ lệ phí (%)</Field.Label>
                    </Field.Root>
                    <Controller
                      control={control}
                      name={`items.${index}.rate`}
                      render={({ field }) => (
                        <NumberInput.Root
                          min={0}
                          max={100}
                          name={field.name}
                          value={field.value.toString()}
                          onValueChange={({ value }) => {
                            field.onChange(value);
                          }}
                        >
                          <NumberInput.Control />
                          <NumberInput.Input onBlur={field.onBlur} />
                        </NumberInput.Root>
                      )}
                    />
                  </Box>

                  {/* Phí bảo hiểm */}
                  <Stat.Root flex="1" minW="150px">
                    <Stat.Label>Phí bảo hiểm</Stat.Label>
                    <Stat.ValueText color="teal.500">
                      {fee.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 0,
                      })}
                    </Stat.ValueText>
                  </Stat.Root>

                  <Button
                    variant="solid"
                    onClick={() => remove(index)}
                    alignSelf="flex-end"
                    colorScheme="red"
                    disabled={fields.length === 1}
                  >
                    <FaCircleMinus />
                  </Button>
                </Flex>
              </Fieldset.Content>

              <Button
                variant="solid"
                onClick={() => append({ name: "", amount: "", rate: "" })}
                alignSelf="flex-end"
                colorScheme="blue"
              >
                <FaCirclePlus />
              </Button>

              <Separator />

              {/* Tổng cộng */}
              <Flex justify="space-between" mt={4} gap={4} flexWrap="wrap">
                <Stat.Root minW="200px">
                  <Stat.Label>Tổng số tiền / Mức trách nhiệm</Stat.Label>
                  <Stat.ValueText>
                    {totalAmount.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                      minimumFractionDigits: 0,
                    })}
                  </Stat.ValueText>
                </Stat.Root>

                <Stat.Root minW="200px">
                  <Stat.Label>Tổng phí bảo hiểm</Stat.Label>
                  <Stat.ValueText color="green.500">
                    {totalFee.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                      minimumFractionDigits: 0,
                    })}
                  </Stat.ValueText>
                </Stat.Root>
              </Flex>
            </Fieldset.Root>
          );
        })}
      </VStack>
    </Box>
  );
}
