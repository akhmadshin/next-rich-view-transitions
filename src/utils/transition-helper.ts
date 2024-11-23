interface Props {
  skipTransition?: boolean;
  classNames?: string[];
  update: () => Promise<void>;
  onFinish?: () => void;
}

export function transitionHelper({
  skipTransition = false,
  update,
  onFinish,
}: Props) {
  if (skipTransition || !document.startViewTransition) {
    const updateCallbackDone = Promise.resolve(update());
    return {
      ready: Promise.resolve(Error('View transitions unsupported')),
      updateCallbackDone,
      finished: updateCallbackDone.then(() => {
        if (onFinish) {
          onFinish();
        }
      }),
      skipTransition: () => undefined,
    };
  }

  const transition = document.startViewTransition(update);
  window.__NRVT_viewTransition = transition;
  transition.finished
    .catch((e: string) => {
      throw new Error(e);
    })
    .finally(() => {
        window.__NRVT_viewTransition = undefined;
        if (onFinish) {
          onFinish();
        }
      }
    );
  return transition;
}