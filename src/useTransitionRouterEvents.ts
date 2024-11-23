import { useEffect } from 'react';
import type { SingletonRouter } from 'next/dist/client/router';

import { getHandleRouteChangeComplete } from './utils/handle-route-change-complete';
import { getHandleHashChangeComplete, getHandleHashChangeStart } from './utils/handle-hash-change';

export function useTransitionRouterEvents(singletonRouter: SingletonRouter) {
  useEffect(() => {
    const router = singletonRouter?.router;

    if (!router) return;

    const handleRouteChangeComplete = getHandleRouteChangeComplete(singletonRouter);
    const handleHashChangeStart = getHandleHashChangeStart(singletonRouter);
    const handleHashChangeComplete = getHandleHashChangeComplete(singletonRouter);

    let newRouterKey = (singletonRouter.router as never as { _key: string })._key;
    if (window.__NRVT_routerKeyByHashRouteKey && window.__NRVT_routerKey) {
      newRouterKey = window.__NRVT_routerKeyByHashRouteKey[newRouterKey] ?? newRouterKey;
    }
    window.__NRVT_routerKey = newRouterKey;

    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('hashChangeStart', handleHashChangeStart);
    router.events.on('hashChangeComplete', handleHashChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('hashChangeStart', handleHashChangeStart);
      router.events.off('hashChangeComplete', handleHashChangeComplete);
    };
  }, [singletonRouter]);
}