import NextLink from 'next/link';
import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { startViewTransition } from 'next-rich-view-transitions';

export function Link(props: React.ComponentProps<typeof NextLink>) {
  const { href, as, replace, scroll } = props;
  const router = useRouter();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (props.onClick) {
        props.onClick(e);
      }

      if ('startViewTransition' in document) {
        e.preventDefault();

        const navigate = replace ? router.replace : router.push;
        // Find an image that should start transitioning. Feel free to change that code.
        const transitionImg = e.currentTarget.querySelector<HTMLImageElement>('.transitionable-img') || document.querySelector('#transition-img');

        const src = transitionImg ? transitionImg.src : '';
        startViewTransition({
          element: transitionImg,
          attributeName: 'src',
          attributeValue: src.replace(location.origin || '', ''),
        }).then(() => {
          navigate(as || href, as, { scroll: scroll ?? true });
        });
      }
    },
    [props.onClick, href, as, replace, scroll]
  )

  return (
    <NextLink {...props} onClick={handleClick} />
  )
}