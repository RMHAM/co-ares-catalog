import { getRegionAndDistrict, readExcel, rowsTo217s } from './excel.js';
import { findOrg, upsertIcs217 } from './firebase.js';

// Parse excel file from program arguments
const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Usage: node main.js <path-to-excel-file>');
  process.exit(1);
}
const excelFile = args[0];
console.log(excelFile);

const { region, district } = getRegionAndDistrict(excelFile);
console.log(`Region: ${region}, District: ${district}`);

const orgDocSnapshot = await findOrg(region, district);

const rows = readExcel(excelFile);
const ics217s = rowsTo217s(rows, orgDocSnapshot.ref);

ics217s.map(async (ics217) => {
  if (ics217.band == undefined) {
    console.warn(`Band is undefined`);
    return;
  }
  await upsertIcs217(ics217);
});
