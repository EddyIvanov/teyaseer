import { memo, useEffect, useRef } from 'react';

import { Box } from '@chakra-ui/react';

import { VideoProps } from './Video.type';

import colors from '@/styles/themes/brand/colors';

const Video = ({
  videoUrl,
  videoType,
  enabled,
  className,
  style = {},
  poster,
  playOnHover,
  autoPlay = false,
}: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    return () => {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      }
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };
  }, [videoRef.current]);

  const handleMouseEnter = () => {
    if (playOnHover && videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
    }
  };
  const handleMouseLeave = () => {
    if (playOnHover && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  return videoUrl && videoType ? (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      as="video"
      ref={videoRef}
      sx={{
        background: colors.videoBackground,
        aspectRatio: '16/9',
        ...style,
      }}
      muted={playOnHover}
      autoPlay={autoPlay}
      controls={enabled}
      className={className}
      poster={poster}
    >
      <source src={videoUrl} type={videoType} />
    </Box>
  ) : null;
};

export default memo(Video);
