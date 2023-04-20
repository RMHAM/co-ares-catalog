import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { Container, SSRProvider } from "react-bootstrap";

import IcsNavbar from "@/components/IcsNavbar";
import "@/styles/globals.css";

const rawPages = ["/217a/[id]/print"];

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const isRawPage = rawPages.includes(appProps.router.pathname);
  if (isRawPage) {
    return (
      <SSRProvider>
        <Head>
          <title>Open ICS</title>
        </Head>
        <Component {...pageProps} />
      </SSRProvider>
    );
  }

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
