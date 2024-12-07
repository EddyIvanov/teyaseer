import { memo } from 'react';

import Head from 'next/head';

import { contentfulOptimizedImage } from '../Image/utils';

import { AssetType } from '@/types/ContentFul.type';

interface HeadInfoProps {
  metaTitle: string;
  metaDescription: string;
  openGraphImage?: AssetType;
}

const HeadInfo = ({
  metaTitle,
  metaDescription,
  openGraphImage,
}: HeadInfoProps) => {
  return (
    <Head>
      {metaTitle && (
        <>
          <title>{metaTitle}</title>
          <meta property="og:title" content={metaTitle} />
        </>
      )}
      {metaDescription && (
        <>
          <meta name="description" content={metaDescription} />
          <meta property="og:description" content={metaDescription} />
        </>
      )}
      {openGraphImage && (
        <meta
          property="og:image"
          content={contentfulOptimizedImage(openGraphImage?.fields.file?.url)}
        />
      )}
    </Head>
  );
};

export default memo(HeadInfo);
