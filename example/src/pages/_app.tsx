import "@/styles/globals.css";
import "@/styles/view-transitions.css";

import type { AppProps } from "next/app";
import singletonRouter from 'next/dist/client/router';

import { useTransitionRouterEvents, handleBeforePopState } from 'next-rich-view-transitions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useTransitionRouterEvents(singletonRouter);
  useEffect(() => {
    router.beforePopState((props) => handleBeforePopState(props, router));
  }, []);

  return (
    <Component {...pageProps} />
  );
}