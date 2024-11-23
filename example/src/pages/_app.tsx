import "@/styles/globals.css";
import "@/styles/view-transitions.css";

import type { AppProps } from "next/app";
import singletonRouter from 'next/dist/client/router';

import { useTransitionRouterEvents, bpsViewTransitions } from 'next-rich-view-transitions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useTransitionRouterEvents(singletonRouter);
  useEffect(() => {
    router.beforePopState((props) => {
      bpsViewTransitions(props, router);
      return false;
    });
  }, []);

  return (
    <Component {...pageProps} />
  );
}