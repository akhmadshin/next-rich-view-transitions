import React from 'react';
import { ImagesList } from '@/components/ImagesList';
import { Credits } from '@/components/Header';

const Page = () => {
  return (
    <>
      <Credits/>
      <ImagesList id={0} />
    </>
  );
};

export default Page;