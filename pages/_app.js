import "@/styles/globals.scss";
import Head from "next/head";
import DefaultLayout from "@/layout/defaultLayout";
import { SessionProvider } from "next-auth/react";

import Detector from "@/components/Detector";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return getLayout(
    <ErrorBoundary>
      <SessionProvider session={session}>
        <Head>
          <title>翔宇窗飾</title>
        </Head>
        <Detector>
          <main>
            <Component {...pageProps} />
          </main>
        </Detector>
      </SessionProvider>
    </ErrorBoundary>
  );
}
