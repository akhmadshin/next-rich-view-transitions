export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

function isObserved(rect1: Rectangle, x: number, y: number) {
  const rect2 = {
    x,
    y,
    width: window.screen.width,
    height: window.screen.height
  }
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

export const isTransitionAvailable = (routerKey?: string) => {
  if (!routerKey) {
    return false;
  }
  let isViewTransitionAvailable = true;
  let forcedScroll = null;
  let viewTransitionImagePosition: Rectangle | null = null;
  try {
    const v = sessionStorage.getItem('__NRVT_view_transition_image_' + routerKey)
    viewTransitionImagePosition = JSON.parse(v!) as Rectangle
  } catch {}

  try {
    const v = sessionStorage.getItem('__next_scroll_' + routerKey);
    forcedScroll = JSON.parse(v!);
  } catch {
    forcedScroll = { x: 0, y: 0 };
  }

  if (viewTransitionImagePosition) {
    const isImgObserved = isObserved(viewTransitionImagePosition, forcedScroll?.x || 0, forcedScroll?.y || 0);
    isViewTransitionAvailable  = forcedScroll === null ? true : isImgObserved;
  } else {
    isViewTransitionAvailable = true;
  }

  return isViewTransitionAvailable;
}
