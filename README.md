# next-rich-view-transitions

That library lets you tame View Transitions API in Next.js Pages Router.

## Installation

```sh
$ npm install next-rich-view-transitions
```
```sh
$ yarn add next-rich-view-transitions
```

## Getting started

### 1) Call useTransitionRouterEvents and bpsViewTransitions in _app.tsx file
```tsx
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
```

### 2) Add view-transitions.css
```css
.no-view-transition {
  view-transition-name: no-view-transition;
}

@keyframes fade-in {
  from { opacity: 0; }
}

@keyframes fade-out {
  to { opacity: 0; }
}

@keyframes slide-from-right {
  from { transform: translateX(30px); }
}

@keyframes slide-to-left {
  to { transform: translateX(-30px); }
}

::view-transition-old(root) {
  animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
  300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
}

::view-transition-new(root) {
  animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
  300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
}

::view-transition-image-pair(__NRVT_transition-img) {
  isolation: none;
}

@media (prefers-reduced-motion) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
}
```

### 3) Create Link.tsx component
```tsx
import NextLink from 'next/link';
import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { startViewTransition } from 'next-rich-view-transitions';

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
        // Find an image that should start transitioning. Feel free to change that code.
        const transitionImg = e.currentTarget.querySelector<HTMLImageElement>('.transitionable-img') || document.querySelector('#transition-img');

        startViewTransition(transitionImg).then(() => {
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
