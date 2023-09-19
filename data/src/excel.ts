import { DocumentReference } from '@google-cloud/firestore';
import { readFileSync } from 'fs';
import { parse } from 'node-xlsx';
import { Channel, Ics217 } from './ics217.js';

export function getRegionAndDistrict(filename: string) {
  let region = null;
  const regionMatch = filename.match(/Region (\d+)/);
  if (regionMatch) {
    region = Number(regionMatch[1]);
    if (region == 0) {
      // Colorado Section
      region = null;
    }
  } else {
    // There is no "Region n" in the file name, so it's probably not a 217; quit now
    console.error('File name does not contain "Region n"');
    process.exit(1);
  }
  let district = null;
  const districtMatch = filename.match(/District (\d+)/);
  if (districtMatch) {
    district = Number(districtMatch[1]);
  }
  return { region, district };
}

export function readExcel(excelFile): string[][] {
  // Parse excel file
  const workSheetsFromBuffer = parse(readFileSync(excelFile));
  const sheet = workSheetsFromBuffer[0];
  return sheet.data
    .slice(1)
    .filter((row) => typeof row[0] == 'number' && typeof row[1] == 'string');
}

export function rowsTo217s(
  rows: string[][],
  ownerId: DocumentReference,
): Array<Partial<Ics217>> {
  // Transfer each row into a Channel object
  const channels: Channel[] = rows.map((row, idx) => {
    const [
      page,
      config,
      name,
      users,
      rxFrequency,
      rxWidth,
      rxTone,
      txFrequency,
      txWidth,
      txTone,
      mode,
      remarks,
    ] = row;
    return {
      order: idx,
      page: page ? Number(page) : null,
      config,
      name,
      users,
      rxFrequency: rxFrequency ? Number(rxFrequency) : null,
      rxWidth: rxWidth ? rxWidth : null,
      rxTone,
      txFrequency: txFrequency ? Number(txFrequency) : null,
      txWidth: txWidth ? txWidth : null,
      txTone,
      mode,
      remarks,
    };
  });

  // Group channels by band
  const pages = channels.reduce(
    (acc, channel: Channel) => {
      const bandLetter = channel.name.match(/([A-Z])/)[1] || null;
      if (!acc[bandLetter]) {
        acc[bandLetter] = [];
      }
      acc[bandLetter].push(channel);
      return acc;
    },
    {} as { [key: string]: Channel[] },
  );

  // Transfer each band into an ICS-217 object
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Object.entries(pages).map(([_, channels]) => {
    const bandLetter = channels[0].name.match(/([A-Z])/)[1] || null;
    // map band letter to a band name
    const band = {
      V: 'VHF',
      U: 'UHF',
      H: 'HF',
      D: 'DMR',
      P: 'Packet',
    }[bandLetter];

    return {
      owner: ownerId,
      band,
      channels,
    } as Ics217;
  });
}
