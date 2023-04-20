import { GetServerSidePropsContext } from "next";
import Link from "next/link";

import Print217A from "@/components/Print217A";
import dbConnect from "@/lib/dbConnect";
import { Form217A, IForm217A } from "@/models/form217a.model";

type Print217APageProps = {
  f217Data: IForm217A;
};

export default function Print217APage({ f217Data }: Print217APageProps) {
  return (
    <>
      <Print217A f217Data={f217Data} />
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
