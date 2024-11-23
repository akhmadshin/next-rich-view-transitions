# next-rich-view-transitions

That library lets you tame View Transitions API in Next.js Pages Router.

## Installation

```sh
$ npm install next-query-glue
```
```sh
$ yarn add next-query-glue
```

## Getting started

### 1) Call useTransitionRouterEvents and handleBeforePopState in _app.tsx file
```tsx
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import singletonRouter from 'next/dist/client/router';

import { useTransitionRouterEvents, handleBeforePopState } from 'next-rich-transitions';
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
```

### 2) Create Link.tsx component
```tsx
import NextLink from 'next/link';
import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { startTransition } from 'next-rich-transitions';

export function Link(props: React.ComponentProps<typeof NextLink>) {
  const { href, as, replace, scroll } = props;
  const router = useRouter();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (props.onClick) {
        props.onClick(e);
      }

      if ('startViewTransition' in document) {
        e.preventDefault();

        const navigate = replace ? router.replace : router.push;
        // Find an image that will be transitioned. Feel free to change that.
        const transitionableImg = e.currentTarget.querySelector<HTMLImageElement>('.transitionable-img') || document.querySelector('#transition-img');

        startTransition(transitionableImg).then(() => {
          navigate(as || href, as, { scroll: scroll ?? true });
        });
      }
    },
    [props.onClick, href, as, replace, scroll]
  )

  return (
    <NextLink {...props} onClick={handleClick} />
  )
}
```
