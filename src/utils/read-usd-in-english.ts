export function readUSDInEnglish(amount: number): string {
  if (!Number.isFinite(amount) || amount < 0) {
    return "Invalid amount";
  }

  const ones = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const teens = [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const thousands = ["", "thousand", "million", "billion", "trillion"];

  function convertHundreds(n: number): string {
    let result = "";
    const hundred = Math.floor(n / 100);
    const remainder = n % 100;

    if (hundred > 0) {
      result += ones[hundred] + " hundred";
      if (remainder > 0) result += " ";
    }

    if (remainder >= 10 && remainder < 20) {
      result += teens[remainder - 10];
    } else {
      const ten = Math.floor(remainder / 10);
      const one = remainder % 10;
      if (ten > 0) result += tens[ten];
      if (ten > 0 && one > 0) result += "-";
      if (one > 0) result += ones[one];
    }

    return result;
  }

  function convertNumberToWords(n: number): string {
    if (n === 0) return "zero";

    const parts: string[] = [];
    let i = 0;

    while (n > 0) {
      const chunk = n % 1000;
      if (chunk !== 0) {
        let chunkWords = convertHundreds(chunk);
        if (thousands[i]) chunkWords += " " + thousands[i];
        parts.unshift(chunkWords.trim());
      }
      n = Math.floor(n / 1000);
      i++;
    }

    return parts.join(" ").replace(/\s+/g, " ").trim();
  }

  const dollars = Math.floor(amount);
  const cents = Math.round((amount - dollars) * 100);

  let result = "";

  if (dollars > 0) {
    result +=
      convertNumberToWords(dollars) +
      (dollars === 1 ? " US dollar" : " US dollars");
  }

  if (cents > 0) {
    if (result !== "") result += " and ";
    result += convertNumberToWords(cents) + (cents === 1 ? " cent" : " cents");
  }

  if (result === "") result = "zero US dollars";

  return result.charAt(0).toUpperCase() + result.slice(1);
}
