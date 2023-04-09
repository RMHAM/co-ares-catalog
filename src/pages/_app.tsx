import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Open ICS</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
