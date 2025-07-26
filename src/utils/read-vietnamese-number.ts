import {
  InvalidFormatError,
  InvalidNumberError,
  ReadingConfig,
  doReadNumber,
} from "read-vietnamese-number";

/**
 * Reads a number and returns the Vietnamese reading.
 * @param input The number to read (string or number).
 * @param unit The currency/unit suffix (default: ['đồng']).
 * @returns The Vietnamese reading string.
 * @throws Error with a user-friendly message.
 */

export function readVietnameseNumber(
  input: string | number,
  unit: string[] = ["đồng"]
): string {
  const config = new ReadingConfig();
  config.unit = unit;

  try {
    return doReadNumber(config, input.toString());
  } catch (err) {
    if (err instanceof InvalidFormatError) {
      throw new Error("Định dạng số không hợp lệ");
    } else if (err instanceof InvalidNumberError) {
      throw new Error("Số không hợp lệ");
    }
    throw new Error("Đã xảy ra lỗi khi đọc số");
  }
}
