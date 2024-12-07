import { runTransition } from './utils/run-transition';
import { timeout } from './utils/timeout';
import { getElementSelector } from './utils/get-element-selector';
import { getElementAbsolutePosition } from './utils/get-element-absolute-position';

export interface StartViewTransitionProps {
  element?: HTMLElement | null;
  attributeName?: string;
  attributeValue: string;
}
export const startViewTransition = async (props: StartViewTransitionProps) => {
  const { element, attributeName = 'src', attributeValue } = props;
  if (element) {
    const linkSelector = getElementSelector(element);

    const imagePosition = getElementAbsolutePosition(element);
    window.__NRVT_transitionImgSelector = linkSelector;
    window.__NRVT_transitionImgPosition = JSON.stringify(imagePosition);
    window.__NRVT_transitionAttributeValue = attributeValue;
    window.__NRVT_transitionAttributeName = attributeName;

    const el = document.querySelector<HTMLImageElement>(`[style*='view-transition-name']`);
    if (el) {
      el.style.viewTransitionName = '';
    }
    element.style.viewTransitionName = '__NRVT_transition-img';
  }
  await runTransition();
  // TODO: Find out why transitions works unstable without it
  await timeout(8);
}


