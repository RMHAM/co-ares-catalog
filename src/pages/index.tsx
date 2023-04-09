import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Open ICS</title>
      </Head>
      <h1>Open ICS</h1>
      <Link href={"/217a"}>Form 217a Repository</Link>
    </>
  );
}
