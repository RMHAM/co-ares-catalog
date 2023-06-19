import { DocumentReference } from '@google-cloud/firestore';
import { readFileSync } from 'fs';
import { parse } from 'node-xlsx';
import { Channel, Ics217 } from './ics217.js';

export function readExcel(excelFile): any[][] {
  // Parse excel file
  const workSheetsFromBuffer = parse(readFileSync(excelFile));
  const sheet = workSheetsFromBuffer[0];
  return sheet.data
    .slice(1)
    .filter((row) => typeof row[0] == 'number' && typeof row[1] == 'string');
}

export function rowsTo217s(
  rows: any[][],
  ownerId: DocumentReference
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
    };
  });

  // Group channels by page
  const pages = channels.reduce((acc, channel: Channel) => {
    if (!acc[channel.page]) {
      acc[channel.page] = [];
    }
    acc[channel.page].push(channel);
    return acc;
  }, {} as { [key: string]: Channel[] });

  // Transfer each page into an ICS-217 object
  return Object.entries(pages).map(([_, channels]) => {
    const bandLetter = channels[0].name.match(/([A-Z]+)/)[1] || null;
    // map band letter to a band name
    const band = {
      V: 'VHF',
      U: 'UHF',
      H: 'HF',
      D: 'Digital',
      P: 'Packet',
    }[bandLetter];

    return {
      owner: ownerId,
      band,
      channels,
    } as Ics217;
  });
}
