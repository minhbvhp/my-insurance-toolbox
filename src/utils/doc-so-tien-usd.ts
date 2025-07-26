export function docSoTienUSD(soTien: number): string {
  if (!Number.isFinite(soTien) || soTien < 0) {
    return "Số tiền không hợp lệ";
  }

  const donVi = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ"];
  const soChu = [
    "không",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];

  function docBaSo(n: number): string {
    const tram = Math.floor(n / 100);
    const chuc = Math.floor((n % 100) / 10);
    const donvi = n % 10;
    let ketQua = "";

    if (tram !== 0) {
      ketQua += `${soChu[tram]} trăm`;
      if (chuc === 0 && donvi !== 0) ketQua += " lẻ";
    }

    if (chuc !== 0 && chuc !== 1) {
      ketQua += ` ${soChu[chuc]} mươi`;
      if (donvi === 1) ketQua += " mốt";
      else if (donvi === 5) ketQua += " lăm";
      else if (donvi !== 0) ketQua += ` ${soChu[donvi]}`;
    } else if (chuc === 1) {
      ketQua += " mười";
      if (donvi === 1) ketQua += " một";
      else if (donvi === 5) ketQua += " lăm";
      else if (donvi !== 0) ketQua += ` ${soChu[donvi]}`;
    } else if (chuc === 0 && donvi !== 0 && tram === 0) {
      ketQua += `${soChu[donvi]}`;
    }

    return ketQua.trim();
  }

  function docPhanNguyen(n: number): string {
    if (n === 0) return "";
    const parts: string[] = [];
    let i = 0;
    while (n > 0) {
      const baSo = n % 1000;
      if (baSo !== 0) {
        const doc = docBaSo(baSo);
        const ten = donVi[i];
        parts.unshift(`${doc} ${ten}`.trim());
      }
      n = Math.floor(n / 1000);
      i++;
    }
    return parts.join(" ").replace(/\s+/g, " ").trim();
  }

  function docPhanThapPhan(n: number): string {
    if (n === 0) return "";
    if (n < 10) n *= 10; // ví dụ: 0.3 => 30 xu
    return docBaSo(n) + " xu";
  }

  const phanNguyen = Math.floor(soTien);
  const phanThapPhan = Math.round((soTien - phanNguyen) * 100);

  const chuNguyen = docPhanNguyen(phanNguyen);
  const chuThapPhan = docPhanThapPhan(phanThapPhan);

  let ketQua = "";

  if (chuNguyen && phanNguyen !== 0) {
    ketQua += chuNguyen + " đô la Mỹ";
  }

  if (chuThapPhan && phanThapPhan !== 0) {
    if (ketQua !== "") ketQua += " và ";
    ketQua += chuThapPhan;
  }

  if (ketQua === "") return "Không đô la Mỹ";

  return ketQua.charAt(0).toUpperCase() + ketQua.slice(1);
}
