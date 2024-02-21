import "@/styles/globals.scss";
import "@/styles/custom.scss";

import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>翔宇窗飾</title>
      </Head>
        <Component {...pageProps} />
    </>
  );
}
