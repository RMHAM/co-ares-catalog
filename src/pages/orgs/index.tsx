import Link from "next/link";

import dbConnect from "@/lib/dbConnect";
import { IOrganization, Organization } from "@/models/organization.model";

type ListOrgsProps = {
  orgs: IOrganization[];
};

export default function ListOrgs({ orgs }: ListOrgsProps) {
  return (
    <>
      <h2>Organization List</h2>
      <ul>
        {orgs &&
          orgs.map((org) => (
            <li key={org._id.toString()}>
              <Link href={"/orgs/" + org._id}>{org.name}</Link>
            </li>
          ))}
      </ul>
    </>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  const orgs = await Organization.find();
  return {
    props: { orgs: orgs.map((o) => JSON.parse(JSON.stringify(o))) },
  };
}
