import "@/styles/globals.scss";
import { useEffect } from "react";
import Head from "next/head";
import DefaultLayout from "@/layout/defaultLayout";
import { SessionProvider } from "next-auth/react";
import { DectiveProvider } from "@/hook/provider/dectiveProvider";
import Detector from "@/components/Detector";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return getLayout(
    <SessionProvider session={session}>
      <Head>
        <title>翔宇窗飾</title>
      </Head>
      <Detector >
        <main>
          <Component {...pageProps} />
        </main>
      </Detector>
    </SessionProvider>
  );
}
