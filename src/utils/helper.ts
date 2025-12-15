import type { Worksheet } from "exceljs";

export type AccountAndCitizen = {
  so_tai_khoan: string;
  so_cccd: string;
};

export function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatNumberWithCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function normalizeText(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function findColumnIndex(
  worksheet: Worksheet,
  headerName: string
): { col: number; row: number } | null {
  const target = normalizeText(headerName);

  for (let r = 1; r <= worksheet.rowCount; r++) {
    const row = worksheet.getRow(r);
    for (let c = 1; c <= row.cellCount; c++) {
      const cell = row.getCell(c);
      if (!cell.value) continue;

      const cellValue = normalizeText(String(cell.value));

      if (cellValue === target) {
        return {
          col: c,
          row: r,
        };
      }
    }
  }

  return null;
}

export function extractColumnValues(
  worksheet: Worksheet,
  colIndex: number,
  startRow: number
) {
  const results: string[] = [];

  for (let r = startRow; r <= worksheet.rowCount; r++) {
    const cell = worksheet.getRow(r).getCell(colIndex);
    const value = cell.value;

    if (value !== null && value !== undefined && value !== "") {
      results.push(String(value).trim());
    } else {
      results.push("");
    }
  }

  return results;
}

export function extractAccountAndCitizen(worksheet: Worksheet) {
  const colTaiKhoan = findColumnIndex(worksheet, "SỐ TÀI KHOẢN");
  const colCCCD = findColumnIndex(worksheet, "SỐ CCCD");

  if (!colTaiKhoan || !colCCCD) {
    return [];
  }

  const listTaiKhoan = extractColumnValues(
    worksheet,
    colTaiKhoan.col,
    colTaiKhoan.row + 1
  );

  const listCCCD = extractColumnValues(worksheet, colCCCD.col, colCCCD.row + 1);

  const maxLen = Math.max(listTaiKhoan.length, listCCCD.length);

  const result = [];

  for (let i = 0; i < maxLen; i++) {
    result.push({
      so_tai_khoan: listTaiKhoan[i] || "",
      so_cccd: listCCCD[i] || "",
    });
  }

  return result.filter(
    (row) => row.so_tai_khoan.trim() !== "" || row.so_cccd.trim() !== ""
  );
}

export function buildAccountMap(data: AccountAndCitizen[]) {
  const map = new Map<string, string>();

  for (const item of data) {
    if (item.so_tai_khoan && item.so_cccd) {
      map.set(item.so_tai_khoan.trim(), item.so_cccd.trim());
    }
  }

  return map;
}

export function fillCitizenIdToSheet(
  worksheet: Worksheet,
  accountMap: Map<string, string>
) {
  const colTaiKhoan = findColumnIndex(worksheet, "SỐ TÀI KHOẢN");
  const colCCCD = findColumnIndex(worksheet, "SỐ CCCD");

  if (!colTaiKhoan || !colCCCD) {
    throw new Error("Không tìm thấy cột SỐ TÀI KHOẢN hoặc SỐ CCCD");
  }

  for (let r = colTaiKhoan.row + 1; r <= worksheet.rowCount; r++) {
    const row = worksheet.getRow(r);

    const accCell = row.getCell(colTaiKhoan.col);
    if (!accCell.value) continue;

    const soTaiKhoan = String(accCell.value).trim();
    const soCCCD = accountMap.get(soTaiKhoan);

    const cccdCell = row.getCell(colCCCD.col);

    if (soCCCD) {
      cccdCell.value = soCCCD;
    } else {
      cccdCell.value = "Không tìm thấy";
    }
  }
}
