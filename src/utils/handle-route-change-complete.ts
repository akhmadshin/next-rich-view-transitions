import { isTransitionAvailable } from './is-transition-available';
import { getElementSelector } from './get-element-selector';
import type { SingletonRouter } from 'next/router';
import { cleanUpTransition } from './clean-up-transition';

export const getHandleRouteChangeComplete = (singletonRouter: SingletonRouter) => () => {
  if (typeof window === 'undefined') {
    return;
  }
  if (!window.__NRVT_pageMounted) {
    return;
  }

  let newRouterKey = (singletonRouter.router as never as { _key: string })._key;

  if (window.__NRVT_routerKeyByHashRouteKey && window.__NRVT_routerKey) {
    newRouterKey = window.__NRVT_routerKeyByHashRouteKey[newRouterKey] ?? newRouterKey;
  }

  window.__NRVT_previousRouterKey = window.__NRVT_routerKey;
  window.__NRVT_routerKey = newRouterKey;

  let routerKey = window.__NRVT_routerKey;
  if (window.__NRVT_routerKeyByHashRouteKey && window.__NRVT_routerKey) {
    routerKey = window.__NRVT_routerKeyByHashRouteKey[window.__NRVT_routerKey] ?? routerKey;
  }

  if (window.__NRVT_transitionImgSelector && window.__NRVT_transitionImgPosition) {
    sessionStorage.setItem(`__NRVT_view_transition_image_selector_${window.__NRVT_previousRouterKey}-${routerKey}`, window.__NRVT_transitionImgSelector);
    sessionStorage.setItem(`__NRVT_view_transition_image_${window.__NRVT_previousRouterKey}-${routerKey}`, window.__NRVT_transitionImgPosition);

    window.__NRVT_transitionImgSelector = undefined;
    window.__NRVT_transitionImgPosition = undefined;
  }
  // Navigation via back-forward
  const backRouterKey = `${routerKey}-${window.__NRVT_previousRouterKey}`;
  const isViewTransitionAvailable = isTransitionAvailable(backRouterKey);

  const imgSelector = sessionStorage.getItem(`__NRVT_view_transition_image_selector_${backRouterKey}`);
  const img = imgSelector ? document.querySelector<HTMLImageElement>(imgSelector) : undefined;

  cleanUpTransition();
  if (img && isViewTransitionAvailable) {
    img.style.viewTransitionName = '__NRVT_transition-img';
  } else {
    // Navigation via clicking link
    const transitionImg = document.querySelector<HTMLImageElement>(`img[src$='${window.__NRVT_transitionImgSrc}']`);

    if (transitionImg) {
      const imgSelector = getElementSelector(transitionImg) || '';
      transitionImg.style.viewTransitionName = '__NRVT_transition-img';
      sessionStorage.setItem(`__NRVT_view_transition_image_selector_${backRouterKey}`, imgSelector);
    }
  }

  window.__NRVT_transitionImgSrc = undefined;
  if (window.__NRVT_pageMounted) {
    window.__NRVT_pageMounted();
    window.__NRVT_pageMounted = undefined;
  }
}
