import { ContentfulImageParams } from '@/components/atoms/Image/types';

export const parseAspectRatio = (ar: string): number => {
  if (!ar.includes(':')) {
    throw new Error(
      'Syntax not recognized for aspect ratio argument (ex: 4:3, 16:9)'
    );
  }

  const [w, h] = ar.split(':');
  return Number(h) / Number(w);
};

export const contentfulLoader = ({
  src,
  params,
}: {
  src: string;
  params: ContentfulImageParams;
}) => {
  const url = new URL(`${src.startsWith('https://') ? src : `https:${src}`}`);

  if (params.ar && params.w) {
    const aspectRatio = parseAspectRatio(params.ar);
    params.h = Math.round(params.w * aspectRatio);
    delete params.ar;
  }

  Object.keys(params).forEach(key => {
    const value = params[key as keyof ContentfulImageParams];
    if (value !== undefined) {
      url.searchParams.set(key, value.toString());
    }
  });

  return url.href;
};

export const contentfulOptimizedImage = (
  url: string,
  props?: ContentfulImageParams
) => {
  return contentfulLoader({
    params: {
      ...{
        q: 80,
        fm: 'webp',
        w: 1500,
      },
      ...props,
    },
    src: url,
  });
};
