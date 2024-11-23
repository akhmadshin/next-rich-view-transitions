import { handleHistoryTransitionStarted } from './utils/handle-history-change-started';
import { NextRouter } from 'next/router';

interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
  unstable_skipClientCache?: boolean;
}
export interface NextHistoryState {
  url: string;
  as: string;
  options: TransitionOptions;
}

export const handleBeforePopState = (props: NextHistoryState, router: NextRouter) => {
  const key = (props as unknown as { key: string }).key;
  const { url, as, options } = props;

  let forcedScroll = { x: 0, y: 0 };
  try {
    const v = sessionStorage.getItem('__next_scroll_' + key);
    forcedScroll = JSON.parse(v!);
  } catch {
    forcedScroll = { x: 0, y: 0 };
  }

  forcedScroll = forcedScroll || { x: 0, y: 0 };

  handleHistoryTransitionStarted(key).then(() => {
    setTimeout(async () => {
      await router.replace(url, as, { shallow: options.shallow, locale: options.locale, scroll: false });
      // Waiting 1 tick for document to update
      setTimeout(() => {
        scrollTo({ left: forcedScroll.x, top: forcedScroll.y, behavior: 'instant'});
      }, 0);
    }, 8);
  })
  return false;
}