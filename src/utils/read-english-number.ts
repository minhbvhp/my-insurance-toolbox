/**
 * Reads a number and returns the English reading.
 * @param input The number to read (string or number).
 * @param unit The currency/unit suffix (default: ['đồng']).
 * @returns The English reading string.
 * @throws Error with a user-friendly message.
 */

import { toWords } from "number-to-words";

export function readEnglishNumber(
  input: string | number,
  unit: string = "Vietnamese dongs"
): string {
  try {
    return `${toWords(input)} ${unit}`;
  } catch (err) {
    throw new Error("Error when reading English number");
  }
}
