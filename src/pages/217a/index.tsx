import Link from "next/link";

import dbConnect from "@/lib/dbConnect";
import { Form217A, IForm217A } from "@/models/form217a.model";

type List217AProps = {
  grouped217s: any;
};

export default function List217A({ grouped217s }: List217AProps) {
  return (
    <>
      <h2>ICS-217A Catalog</h2>
      {grouped217s &&
        Object.keys(grouped217s).map((ownerId) => {
          const f217s: IForm217A[] = grouped217s[ownerId]!;
          return (
            <div key={ownerId}>
              <div>{f217s[0].description}</div>
              <ul>
                {f217s &&
                  f217s.map((f217) => (
                    <li key={f217._id.toString()}>
                      <Link href={"/217a/" + f217._id}>
                        {f217.frequencyBand}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          );
        })}
    </>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  const f217s = await Form217A.find().sort({
    description: "asc",
    frequencyBand: "asc",
  });
  const flat217s = f217s.map((f) => JSON.parse(JSON.stringify(f)));
  // group by ownerId
  const grouped217s = flat217s.reduce<Map<string, IForm217A[]>>((acc, f217) => {
    const ownerId: string = f217.ownerId;
    if (!acc.has(ownerId)) {
      acc.set(ownerId, []);
    }
    acc.get(ownerId)!.push(f217);
    return acc;
  }, new Map<string, IForm217A[]>());

  return {
    props: { grouped217s: Object.fromEntries(grouped217s) },
  };
}
