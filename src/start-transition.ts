import { runTransition } from './utils/run-transition';
import { timeout } from './utils/timeout';
import { getElementSelector } from './utils/get-element-selector';
import { getElementAbsolutePosition } from './utils/get-element-absolute-position';

export const startTransition = async (fromImg: HTMLImageElement | null) => {
  if (fromImg) {
    const linkSelector = getElementSelector(fromImg);

    const imagePosition = getElementAbsolutePosition(fromImg);
    window.__NRVT_transitionImgSelector = linkSelector;
    window.__NRVT_transitionImgPosition = JSON.stringify(imagePosition);
    window.__NRVT_transitionImgSrc = fromImg.src.replace(location.origin || '', '');

    const el = document.querySelector<HTMLImageElement>(`[style*='view-transition-name']`);
    if (el) {
      el.style.viewTransitionName = '';
    }
    fromImg.style.viewTransitionName = '__NRVT_transition-img';
  }
  await runTransition();
  await timeout(8);

}


