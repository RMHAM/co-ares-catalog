import Link from "next/link";
import { useEffect, useState } from "react";

export default function List217A() {
  const [f217s, setF217s] = useState<any | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const url = "/api/f217a_pages?" + "include=organizations";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setF217s(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!f217s) return <p>No 217A data</p>;

  return (
    <>
      <h2>Form 217A Repository</h2>
      <ul>
        {f217s &&
          f217s.map((f217: any) => (
            <li key={f217.id}>
              <Link href={"/217a/" + f217.id}>
                {f217.organizations.name} {f217.frequency_band}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}
