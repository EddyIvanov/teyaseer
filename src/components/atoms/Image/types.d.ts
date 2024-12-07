import { ImageProps as NextImageProps } from 'next/image';

export type ContentfulImageParams = {
  ar?: string;
  fm?: 'jpg' | 'png' | 'webp' | 'gif' | 'avif';
  fl?: 'progressive' | 'png8';
  w?: number;
  h?: number;
  fit?: 'pad' | 'fill' | 'scale' | 'crop' | 'thumb';
  f?:
    | 'face'
    | 'faces'
    | 'center'
    | 'top'
    | 'right'
    | 'left'
    | 'bottom'
    | 'top_right'
    | 'top_left'
    | 'bottom_right'
    | 'bottom_left';
  r?: number | 'max';
  q?: number;
  bg?: string;
};

export type ImageProps = Omit<NextImageProps, 'src'> & {
  lazyLoading?: boolean;
  style?: Record<string, unknown>;
  quality?: number;
  loaderOpt?: ContentfulImageParams;
  lazyLoadTheme?: 'light' | 'dark';
  src: string;
};
