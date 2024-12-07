import { memo, useState } from 'react';

import cx from 'classnames';
import NextImage, { ImageLoaderProps } from 'next/image';

import { colorVariant } from './const';
import { ImageProps } from './types';

import { contentfulLoader } from '@/components/atoms/Image/utils';

const defaultSizes =
  '(max-width: 480px) 60vh, (max-width: 768px) 70vh, (max-width: 1024px) 80vh, (max-width: 1280px) 200vh, 200vh';

const Image = ({
  lazyLoading = true,
  src,
  className,
  style = {},
  sizes,
  loaderOpt,
  lazyLoadTheme = 'dark',
  ...rest
}: ImageProps) => {
  const [loading, setLoading] = useState(true);
  const isRelativeURL = src.toString().startsWith('//');

  const onLoadingComplete = () => {
    setLoading(false);
  };

  const loader = (props: ImageLoaderProps) =>
    contentfulLoader({
      params: {
        w: props.width,
        h: 2436,
        q: 80,
        fm: 'webp',
        fit: 'crop',
        f: 'faces',
        ...loaderOpt,
      },
      src,
    });

  const { r = '' } = loaderOpt || {};

  const shouldUseLoader =
    (isRelativeURL && typeof src === 'string') || loaderOpt;

  return src ? (
    <NextImage
      className={cx(className ? className : undefined, {
        isLoading: lazyLoading && loading,
      })}
      {...(shouldUseLoader && {
        loader,
      })}
      sizes={sizes || defaultSizes}
      onLoad={onLoadingComplete}
      style={{
        ...style,
        ...(lazyLoading &&
          loading && { backgroundColor: colorVariant[lazyLoadTheme] }),
        ...(r && { borderRadius: r }),
      }}
      {...rest}
      src={src}
    />
  ) : null;
};

export default memo(Image);
