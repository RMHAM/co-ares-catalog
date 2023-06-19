import { readExcel } from './excel.js';
import { findOrg } from './firebase.js';

// Parse excel file from program arguments
const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Usage: node main.js <path-to-excel-file>');
  process.exit(1);
}
const excelFile = args[0];
const region = Number(excelFile.match(/Region (\d+)/)[1]) || null;
const district = Number(excelFile.match(/District (\d+)/)[1]) || null;
console.log(`Region: ${region}, District: ${district}`);

const rows = readExcel(excelFile);
console.log(`Read ${rows.length} rows`);

const org = await findOrg(region, district);
console.log('Found org:', org.name);
