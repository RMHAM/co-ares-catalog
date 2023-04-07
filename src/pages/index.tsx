import { useEffect, useState } from "react";

export default function Home() {
  const [page, setData] = useState<any | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      "/api/f217a_pages/a9dbf678-99fa-4e03-8e60-75bade1d3d9f?" +
        "include=f217a_page_channels,organizations,f217a_page_channels.radio_channels"
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!page) return <p>No page</p>;

  return (
    <div>
      <p>{page.organizations.name}</p>
      <p>{page.frequency_band}</p>
      {page.f217a_page_channels &&
        page.f217a_page_channels.map((chan: any) => {
          return (
            <p key={chan.channel_id}>
              {chan.channel_order}: {chan.radio_channels.name}
            </p>
          );
        })}
    </div>
  );
}
