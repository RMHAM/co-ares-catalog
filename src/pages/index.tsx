import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [page, setData] = useState<any | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const url =
      "/api/f217a_pages/a9dbf678-99fa-4e03-8e60-75bade1d3d9f?" +
      "include=f217a_page_channels,organizations,f217a_page_channels.radio_channels&" +
      'orderBy={"channel_order":"$asc"}';
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!page) return <p>No page</p>;

  return (
    <>
      <Head>
        <title>Open ICS</title>
      </Head>
      <div>
        <p>{page.organizations.name}</p>
        <p>{page.frequency_band}</p>
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
            {page.f217a_page_channels &&
              page.f217a_page_channels.map((chan: any) => (
                <tr key={chan.channel_id}>
                  <td>{chan.radio_channels.config}</td>
                  <td>{chan.radio_channels.name}</td>
                  <td>{chan.radio_channels.eligible_users}</td>
                  <td>{chan.radio_channels.rx_freq}</td>
                  <td>{chan.radio_channels.rx_width}</td>
                  <td>{chan.radio_channels.rx_tone}</td>
                  <td>{chan.radio_channels.tx_freq}</td>
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
