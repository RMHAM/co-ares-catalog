import { f217a_pages } from "@prisma/client";
import Link from "next/link";

import prisma from "@/lib/prisma";

type List217AProps = {
  f217s: f217a_pages[];
};

export default function List217A({ f217s }: List217AProps) {
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

export async function getServerSideProps() {
  let f217s = await prisma.f217a_pages.findMany({
    include: { organizations: true },
  });
  return {
    props: { f217s },
  };
}
