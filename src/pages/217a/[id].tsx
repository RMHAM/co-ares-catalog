import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function View217A() {
  const router = useRouter();
  const { id } = router.query;

  const [f217Data, setF217Data] = useState<any | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const url =
      `/api/f217a_pages/${id}?` +
      "include=f217a_page_channels,organizations,f217a_page_channels.radio_channels&" +
      'orderBy={"channel_order":"$asc"}';
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setF217Data(data);
        setLoading(false);
      });
  }, [id]);

  if (isLoading)
    return (
      <>
        <Head>
          <title>Open ICS</title>
        </Head>
        <p>Loading...</p>
      </>
    );
  if (!f217Data)
    return (
      <>
        <Head>
          <title>Open ICS</title>
        </Head>
        <p>No 217A data</p>
      </>
    );

  return (
    <>
      <Head>
        <title>Open ICS</title>
      </Head>
      <div>
        <Link href={"/217a"}>&lt; Back to 217A Repository</Link>
        <h2>Form 217A</h2>
        <h1>
          {f217Data.organizations.name} - {f217Data.frequency_band}
        </h1>
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
    </>
  );
}
