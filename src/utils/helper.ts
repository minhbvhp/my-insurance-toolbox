import * as XLSX from "xlsx";

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

export function findColumnIndex(sheet: XLSX.Sheet, headerName: string) {
  const range = XLSX.utils.decode_range(sheet["!ref"]!);
  const target = normalizeText(headerName);

  for (let R = range.s.r; R <= range.e.r; R++) {
    for (let C = range.s.c; C <= range.e.c; C++) {
      const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
      const cell = sheet[cellAddress];

      if (!cell || cell.v == null) continue;

      const cellValue = normalizeText(String(cell.v));

      if (cellValue === target) {
        return { col: C, row: R };
      }
    }
  }

  return null;
}

export function extractColumnValues(
  sheet: XLSX.Sheet,
  colIndex: number,
  startRow: number
) {
  const range = XLSX.utils.decode_range(sheet["!ref"]!);
  const results: any[] = [];

  for (let R = startRow; R <= range.e.r; R++) {
    const cellAddress = XLSX.utils.encode_cell({ r: R, c: colIndex });
    const cell = sheet[cellAddress];

    if (cell && cell.v !== undefined && cell.v !== null && cell.v !== "") {
      results.push(String(cell.v).trim());
    } else {
      results.push("");
    }
  }

  return results;
}

export function extractAccountAndCitizen(sheet: XLSX.Sheet) {
  const colTaiKhoan = findColumnIndex(sheet, "SỐ TÀI KHOẢN");
  const colCCCD = findColumnIndex(sheet, "SỐ CCCD");

  if (!colTaiKhoan || !colCCCD) {
    return [];
  }

  const listTaiKhoan = extractColumnValues(
    sheet,
    colTaiKhoan.col,
    colTaiKhoan.row + 1
  );
  const listCCCD = extractColumnValues(sheet, colCCCD.col, colCCCD.row + 1);

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
  sheet: XLSX.Sheet,
  accountMap: Map<string, string>
) {
  const colTaiKhoan = findColumnIndex(sheet, "SỐ TÀI KHOẢN");
  const colCCCD = findColumnIndex(sheet, "SỐ CCCD");

  if (!colTaiKhoan || !colCCCD) {
    throw new Error("Không tìm thấy cột SỐ TÀI KHOẢN hoặc SỐ CCCD");
  }

  const range = XLSX.utils.decode_range(sheet["!ref"]!);

  for (let R = colTaiKhoan.row + 1; R <= range.e.r; R++) {
    const accCellAddr = XLSX.utils.encode_cell({
      r: R,
      c: colTaiKhoan.col,
    });

    const cccdCellAddr = XLSX.utils.encode_cell({
      r: R,
      c: colCCCD.col,
    });

    const accCell = sheet[accCellAddr];
    if (!accCell || !accCell.v) continue;

    const soTaiKhoan = String(accCell.v).trim();
    const soCCCD = accountMap.get(soTaiKhoan);

    if (!soCCCD) continue;

    // GHI CCCD VÀO Ô
    sheet[cccdCellAddr] = {
      t: "s",
      v: soCCCD,
    };
  }

  return sheet;
}
