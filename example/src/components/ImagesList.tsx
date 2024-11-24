import { MOCK_THUMBNAILS } from '@/constants/MOCK_THUMBNAILS';
import React from 'react';
import { Container } from '@/components/Container';
import { Image } from '@/components/image';
import { Link } from '@/components/Link';
import { WithImagePrefetch } from '@/components/image/WithImagePrefetch';

interface Props {
  id: number
}

export const ImagesList: React.FC<Props> =  ({ id }) => {
  const cover = MOCK_THUMBNAILS[id % 4];

  const nextImages = [
    MOCK_THUMBNAILS[(id + 1) % 4],
    MOCK_THUMBNAILS[(id + 2) % 4],
    MOCK_THUMBNAILS[(id + 3) % 4],
    MOCK_THUMBNAILS[(id + 4) % 4],
  ];

  return (
    <>
      <Container>
        <Image
          id="transition-img"
          className="aspect-[16/9] transitionable-img"
          priority
          sizes="100vw"
          src={`/${cover.data.attributes.name}`}
          thumbhash={cover.data.attributes.thumbhash}
          alt={cover.data.attributes.alternativeText}
          width={cover.data.attributes.width}
          height={cover.data.attributes.height}
        />
        <div className="my-10 block grid grid-rows-2 grid-cols-2 lg:grid-rows-1 lg:grid-cols-4 gap-4">
          {nextImages && nextImages.map((img, index) => (
            <WithImagePrefetch
              key={index}
              src={`/${img.data.attributes.name}`}
              height={img.data.attributes.height}
              width={img.data.attributes.width}
              prefetchSize="100vw"
            >
              <Link href={`/${id + index + 1}`}>
                <Image
                  className="aspect-[16/9] transitionable-img"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  src={`/${img.data.attributes.name}`}
                  thumbhash={img.data.attributes.thumbhash}
                  alt={img.data.attributes.alternativeText}
                  width={img.data.attributes.width}
                  height={img.data.attributes.height}
                />
              </Link>
            </WithImagePrefetch>

          ))}
        </div>
      </Container>
    </>
  )
}