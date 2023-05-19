import Link from "next/link";

import dbConnect from "@/lib/dbConnect";
import { Form217A, IForm217A } from "@/models/form217a.model";

type List217AProps = {
  f217s: IForm217A[];
};

export default function List217A({ f217s }: List217AProps) {
  return (
    <>
      <h2>ICS-217A Catalog</h2>
      <ul>
        {f217s &&
          f217s.map((f217) => (
            <li key={f217._id.toString()}>
              <Link href={"/217a/" + f217._id}>
                {f217.description} - {f217.frequencyBand}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  const f217s = await Form217A.find().sort({
    description: "asc",
    frequencyBand: "asc",
  });  

  console.log(f217s);
  return {
    props: { f217s: f217s.map((f) => JSON.parse(JSON.stringify(f))) },
  };
}
