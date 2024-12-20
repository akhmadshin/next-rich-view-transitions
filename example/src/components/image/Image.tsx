import type { ImageProps } from 'next/image';
import NextImage from 'next/image';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { createPngDataUri } from './createPngDataUri';

type Props = Omit<ImageProps, 'alt'> & {
  thumbhash: string;
  alt?: string;
}

export const Image = forwardRef<HTMLImageElement, Props>(({
  thumbhash,
  height,
  width,
  alt,
  title,
  fill,
  className = '',
  src,
  ...props
}, ref) => {
  const [blurDataURL, setBlurDataURL] = useState<string | undefined>();
  const imgRef = useRef<HTMLImageElement>();

  useEffect(() => {
    if (typeof window === 'undefined' || !imgRef.current) {
      return;
    }
    requestIdleCallback(() => {
      setBlurDataURL(createPngDataUri(thumbhash));
    });
  }, [imgRef, src])

  return (
    <NextImage
      fill={fill}
      src={src}
      key={String(src)}
      className={`bg-no-repeat object-cover rounded-2xl ${className}`}
      draggable={'false'}
      alt={alt ?? ''}
      title={title ?? ''}
      height={fill ? undefined : height}
      width={fill ? undefined : width}
      placeholder={blurDataURL as `data:image/${string}`}
      ref={(node) => {
        if (node) {
          imgRef.current = node;
        }
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      {...props}
    />
  );
})

Image.displayName = 'Image';