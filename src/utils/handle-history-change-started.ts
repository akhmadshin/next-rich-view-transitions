import { getElementAbsolutePosition } from './get-element-absolute-position';
import { isTransitionAvailable } from './is-transition-available';
import { runTransition } from './run-transition';
import { cleanUpTransition } from './clean-up-transition';

export const handleHistoryTransitionStarted = async (futureKeyOrig: string) => {
  await runTransition();

  let futureKey = futureKeyOrig;
  window.__NRVT_routerKeyByHashRouteKey = window.__NRVT_routerKeyByHashRouteKey || {};
  if (futureKeyOrig && window.__NRVT_routerKeyByHashRouteKey[futureKeyOrig]) {
    futureKey = window.__NRVT_routerKeyByHashRouteKey[futureKeyOrig];
  }

  let routerKey = window.__NRVT_routerKey!;
  if (window.__NRVT_routerKeyByHashRouteKey && window.__NRVT_routerKey) {
    routerKey = window.__NRVT_routerKeyByHashRouteKey[window.__NRVT_routerKey] ?? routerKey;
  }

  const bffImgSelector = sessionStorage.getItem(`__NRVT_view_transition_image_selector_${routerKey}-${futureKey}`) || '';

  if (bffImgSelector) {
    const clickedImg = document.querySelector<HTMLImageElement>(bffImgSelector);
    if (clickedImg && clickedImg.src) {
      const imgPosition = getElementAbsolutePosition(clickedImg);
      sessionStorage.setItem(
        `__NRVT_view_transition_image_${routerKey}-${futureKey}`,
        JSON.stringify(imgPosition)
      );

      window.__NRVT_transitionAttributeValue = clickedImg.src.replace(location.origin || '', '');
      const isViewTransitionAvailable = isTransitionAvailable(`${routerKey}-${futureKey}`);

      if (isViewTransitionAvailable) {
        cleanUpTransition();
        clickedImg.style.viewTransitionName = '__NRVT_transition-img';
      }
      return;
    }
  }
}
