import React from 'react';

import { Box } from '@chakra-ui/react';

import MediaItemProps from './CarouselMediaItem.type';

import { Icon, Image } from '@/components';
import { contentfulOptimizedImage } from '@/components/atoms/Image/utils';
import Video from '@/components/atoms/Video';

const CarouselMediaItem = ({
  contentType,
  url,
  title,
  poster,
  onVideoClick,
}: MediaItemProps): JSX.Element => {
  return (
    <Box h={'100%'}>
      {contentType?.includes('video') ? (
        <Box
          sx={{
            height: '100%',
            cursor: 'pointer',
            _hover: {
              svg: {
                display: 'none',
              },
            },
          }}
          onClick={onVideoClick}
        >
          <Video
            style={{
              height: '100%',
              objectFit: 'cover',
              width: '100%',
            }}
            videoUrl={url}
            videoType={contentType}
            poster={
              poster?.fields?.file?.url
                ? contentfulOptimizedImage(poster?.fields?.file?.url)
                : ''
            }
            playOnHover
          />

          <button
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            aria-label="play video"
          >
            <Icon name="play" w="56px" h="64px" />
          </button>
        </Box>
      ) : (
        <Image
          src={url || ''}
          alt={title || ''}
          className="carouselMediaSectionItem"
          fill
          data-swiper-parallax-duration={500}
        />
      )}
    </Box>
  );
};

export default CarouselMediaItem;
