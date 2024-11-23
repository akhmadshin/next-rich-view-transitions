import { transitionHelper } from './transition-helper';
import { timeout } from './timeout';


export const runTransition = async () => {
  if (window.__NRVT_viewTransition) {
    window.__NRVT_viewTransition.skipTransition();
    await timeout(0);
  }

  const pageMountedPromise: Promise<void> = new Promise(resolve => {
    window.__NRVT_pageMounted = resolve;
  })
  transitionHelper({
    update: async () => {
      if (window.__NRVT_pageMounted) {
        await pageMountedPromise;
      }
    },
  });
}