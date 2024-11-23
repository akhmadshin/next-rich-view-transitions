import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { ImagesList } from '@/components/ImagesList';
import { Credits } from '@/components/Header';

const r = /\d+/;

const Page = () => {
  const router = useRouter()

  const id = useMemo(() => {
    const slug = router.query.slug as string;
    const slugInt = slug ? parseInt(slug.match(r)![0]) : 0;
    return slugInt ?? 0;
  }, [router]);


  return (
    <>
      <Credits/>
      <ImagesList id={id} />
    </>
  );
};

export default Page;