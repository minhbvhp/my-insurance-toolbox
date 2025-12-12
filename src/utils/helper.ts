import * as XLSX from "xlsx";

export function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatNumberWithCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function findColumnIndex(sheet: XLSX.Sheet, headerName: string) {
  const range = XLSX.utils.decode_range(sheet["!ref"]!);

  for (let R = range.s.r; R <= range.e.r; R++) {
    for (let C = range.s.c; C <= range.e.c; C++) {
      const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
      const cell = sheet[cellAddress];

      if (cell && String(cell.v).trim() === headerName) {
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
    console.error("Không tìm thấy header!");
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
