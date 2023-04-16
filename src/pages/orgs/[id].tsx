import { GetServerSidePropsContext } from "next";
import Link from "next/link";

import dbConnect from "@/lib/dbConnect";
import { IOrganization, Organization } from "@/models/organization.model";

type ViewOrgProps = {
  org: IOrganization;
};

export default function ViewOrg({ org }: ViewOrgProps) {
  return (
    <>
      <Link href={"/orgs"}>&lt; Back to Organization List</Link>
      <h3>Organization Details</h3>
      <h2>{org.name}</h2>
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
  const orgId = String(params["id"]);
  let org = null;
  try {
    org = await Organization.findById(orgId);
  } catch (err: any) {
    // If the ID is not a valid ObjectId, then we'll get a CastError.
    // In that case, let it fall through and we'll return a 404.
    if (err.name !== "CastError") {
      throw err;
    }
  }

  if (!org) {
    return {
      notFound: true,
    };
  }
  return {
    props: { org: JSON.parse(JSON.stringify(org)) },
  };
}
