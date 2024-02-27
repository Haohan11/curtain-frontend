import "@/styles/globals.scss";

import Head from "next/head";
import DefaultLayout from "@/layout/defaultLayout";

export default function App({ Component, pageProps }) {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return getLayout(
    <>
      <Head>
        <title>翔宇窗飾</title>
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
