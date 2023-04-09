import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Container, SSRProvider } from "react-bootstrap";

import IcsNavbar from "@/components/navbar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Head>
        <title>Open ICS</title>
      </Head>
      <IcsNavbar />
      <Container>
        <Component {...pageProps} />
      </Container>
    </SSRProvider>
  );
}
