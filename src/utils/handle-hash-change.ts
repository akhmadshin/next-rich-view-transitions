import type { SingletonRouter } from 'next/router';

export const getHandleHashChangeStart = (singletonRouter: SingletonRouter) => () => {
  let routerKey = (singletonRouter.router as never as { _key: string })._key;

  window.__NRVT_routerKeyByHashRouteKey = window.__NRVT_routerKeyByHashRouteKey || {};
  if (window.__NRVT_routerKeyByHashRouteKey[routerKey]) {
    routerKey = window.__NRVT_routerKeyByHashRouteKey[routerKey];
  }

  window.__NRVT_routerKeyCopy = routerKey
  if (window.__NRVT_viewTransition) {
    window.__NRVT_viewTransition.skipTransition();
  }
}

export const handleHashChangeComplete = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const routerKey = singletonRouter.router!._key;

  window.__NRVT_routerKeyByHashRouteKey = window.__NRVT_routerKeyByHashRouteKey || {};
  if (!window.__NRVT_routerKeyByHashRouteKey[routerKey]) {
    window.__NRVT_routerKeyByHashRouteKey = {
      ...window.__NRVT_routerKeyByHashRouteKey,
      [routerKey]: window.__NRVT_routerKeyCopy
    };
    window.__NRVT_routerKeyCopy = undefined;
  }
}
