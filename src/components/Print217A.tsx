import Link from "next/link";

import styles from "@/components/Print217A.module.css";
import { IForm217A } from "@/models/form217a.model";

type Print217AProps = {
  f217Data: IForm217A;
};

export default function Print217A({ f217Data }: Print217AProps) {
  return (
    <>
      <div className={styles.noPrint}>
        <Link href={`/217a/${f217Data._id}`}>&lt; Back to 217A</Link>
      </div>

      <div className={styles.printForm}>
        <table>
          <tbody>
            <tr>
              <td colSpan={7}>
                <h1>
                  ICS-217A Communications Resource Availability&nbsp;Worksheet
                </h1>
              </td>
              <td colSpan={3}>
                <div className={styles.smallHeading}>1. Freqency Band</div>
                {f217Data.frequencyBand}
              </td>
              <td colSpan={2}>
                <div className={styles.smallHeading}>2. Description</div>
                {f217Data.description}
              </td>
            </tr>
            <tr>
              <td className={styles.smallHeading}>{/* channel number */}</td>
              <td className={styles.smallHeading}>3. Channel Configuration</td>
              <td className={styles.smallHeading}>
                4. Channel Name / Trunked Radio System Talkgroup
              </td>
              <td className={styles.smallHeading}>5. Eligible Users</td>
              <td className={styles.smallHeading}>6. Rx Freq</td>
              <td className={styles.smallHeading}>N/W</td>
              <td className={styles.smallHeading}>7. Rx Tone/NAC</td>
              <td className={styles.smallHeading}>8.Tx Freq</td>
              <td className={styles.smallHeading}>N/W</td>
              <td className={styles.smallHeading}>9. Tx Tone/NAC</td>
              <td className={styles.smallHeading}>
                10. Mode <br />
                A, D or M
              </td>
              <td className={styles.smallHeading}>11. Remarks</td>
            </tr>
            {f217Data.channels &&
              f217Data.channels.map((chan) => (
                <tr key={chan.order.toString()}>
                  <td>{/* channel number */}</td>
                  <td>{chan.config}</td>
                  <td>{chan.name}</td>
                  <td className={styles.smallHeading}>{chan.eligibleUsers}</td>
                  <td>{chan.rxFreq.toFixed(4)}</td>
                  <td>{chan.rxWidth}</td>
                  <td>{chan.rxTone}</td>
                  <td>{chan.txFreq.toFixed(4)}</td>
                  <td>{chan.txWidth}</td>
                  <td>{chan.txTone}</td>
                  <td>{chan.mode}</td>
                  <td className={styles.smallHeading}>{chan.remarks}</td>
                </tr>
              ))}
            <tr>
              <td className={styles.smallHeading} colSpan={2}>
                12. Prepared by:
              </td>
              <td colSpan={2}>{/* name */}</td>
              <td className={styles.smallHeading} colSpan={2}>
                13. Date prepared:
              </td>
              <td colSpan={2}>{/* date */}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
