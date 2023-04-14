import { GetServerSidePropsContext } from "next";
import Link from "next/link";

type View217AProps = {
  f217Data: any;
};

export default function View217A({ f217Data }: View217AProps) {
  return (
    <div>
      <Link href={"/217a"}>&lt; Back to 217A Repository</Link>
      <h2>Form 217A</h2>
      <h2>
        {f217Data.organizations.name} - {f217Data.frequency_band}
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
          {f217Data.f217a_page_channels &&
            f217Data.f217a_page_channels.map((chan: any) => (
              <tr key={chan.channel_id}>
                <td>{chan.radio_channels.config}</td>
                <td>{chan.radio_channels.name}</td>
                <td>{chan.radio_channels.eligible_users}</td>
                <td>{chan.radio_channels.rx_freq.toFixed(4)}</td>
                <td>{chan.radio_channels.rx_width}</td>
                <td>{chan.radio_channels.rx_tone}</td>
                <td>{chan.radio_channels.tx_freq.toFixed(4)}</td>
                <td>{chan.radio_channels.tx_width}</td>
                <td>{chan.radio_channels.tx_tone}</td>
                <td>{chan.radio_channels.mode}</td>
                <td>{chan.radio_channels.remarks}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
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
  const f217Id = String(params["id"]);
  let f217Data = await prisma.f217a_pages.findUnique({
    where: { id: f217Id },
    include: {
      f217a_page_channels: { include: { radio_channels: true } },
      organizations: true,
    },
  });

  if (!f217Data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { f217Data: f217Data },
  };
}
