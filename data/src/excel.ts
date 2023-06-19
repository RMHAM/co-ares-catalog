import { readFileSync } from 'fs';
import { parse } from 'node-xlsx';

export function readExcel(excelFile): any[][] {
  // Parse excel file
  const workSheetsFromBuffer = parse(readFileSync(excelFile));
  const sheet = workSheetsFromBuffer[0];
  return sheet.data
    .slice(1)
    .filter((row) => typeof row[0] == 'number' && typeof row[1] == 'string');
}
