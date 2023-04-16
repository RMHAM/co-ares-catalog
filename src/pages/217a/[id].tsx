import { GetServerSidePropsContext } from "next";
import Link from "next/link";

import dbConnect from "@/lib/dbConnect";
import { Form217A, IForm217A } from "@/models/form217a.model";

type View217AProps = {
  f217Data: IForm217A;
};

export default function View217A({ f217Data }: View217AProps) {
  return (
    <>
      <Link href={"/217a"}>&lt; Back to 217A Repository</Link>
      <h2>Form 217A</h2>
      <h2>
        {f217Data.owner} - {f217Data.frequencyBand}
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>Config</th>
            <th>Name</th>
            <th>Eligible Users</th>
            <th>RX Freq</th>
            <th>RX Width</th>
            <th>RX Tone</th>
            <th>TX Freq</th>
            <th>TX Width</th>
            <th>TX Tone</th>
            <th>Mode</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {f217Data.channels &&
            f217Data.channels.map((chan) => (
              <tr key={chan.order.toString()}>
                <td>{chan.config}</td>
                <td>{chan.name}</td>
                <td>{chan.eligibleUsers}</td>
                <td>{chan.rxFreq.toFixed(4)}</td>
                <td>{chan.rxWidth}</td>
                <td>{chan.rxTone}</td>
                <td>{chan.txFreq.toFixed(4)}</td>
                <td>{chan.txWidth}</td>
                <td>{chan.txTone}</td>
                <td>{chan.mode}</td>
                <td>{chan.remarks}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  if (!params) {
    return {
      notFound: true,
    };
  }
  await dbConnect();
  const f217Id = String(params["id"]);
  let f217Data = null;
  try {
    f217Data = await Form217A.findById(f217Id);
  } catch (err: any) {
    // If the ID is not a valid ObjectId, then we'll get a CastError.
    // In that case, let it fall through and we'll return a 404.
    if (err.name !== "CastError") {
      throw err;
    }
  }

  if (!f217Data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { f217Data: JSON.parse(JSON.stringify(f217Data)) },
  };
}
