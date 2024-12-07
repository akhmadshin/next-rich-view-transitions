declare global {
  interface Window {
    __NRVT_viewTransition?: ViewTransition;
    __NRVT_pageMounted?: () => void;
    __NRVT_transitionAttributeValue?: string;
    __NRVT_transitionAttributeName?: string;
    __NRVT_transitionImgSelector?: string;
    __NRVT_transitionImgPosition?: string;
    __NRVT_routerKey?: string;
    __NRVT_routerKeyCopy?: string;
    __NRVT_routerKeyByHashRouteKey?: Record<string, string>;
    __NRVT_previousRouterKey?: string;
  }
}

export {};