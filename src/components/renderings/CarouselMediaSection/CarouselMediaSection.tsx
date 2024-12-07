import { useState } from 'react';

import { Box, useMultiStyleConfig } from '@chakra-ui/react';

import {
  CarouselMediaSectionProps,
  CarouselMediaSectionSlide,
} from './CarouselMediaSection.type';

import {
  Carousel,
  Container,
  ContentfulRichText,
  Modal,
  Section,
  Text,
} from '@/components';
import Video from '@/components/atoms/Video';
import CarouselMediaItem from '@/components/molecules/CarouselMediaItem';
import Media from '@/components/molecules/Media';
import { RichTextType } from '@/types/ContentFul.type';

const CarouselMediaSection = (props: CarouselMediaSectionProps) => {
  const { slides: carouselMediaSectionSlides, title, id } = props;
  const style = useMultiStyleConfig('CarouselMediaSection', {});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalVideoData, setModalVideoData] = useState<{
    title: string;
    videoUrl: string;
    videoType: string;
    poster: string;
  } | null>(null);

  const getMediaItemNode = (slide: CarouselMediaSectionSlide) => {
    const fields = slide.fields.mediaItem.fields;
    return (
      <CarouselMediaItem
        contentType={fields.file?.contentType}
        poster={slide.fields.poster}
        url={fields.file?.url}
        title={fields?.title}
        onVideoClick={() => {
          setModalVideoData({
            title: fields.title,
            videoType: fields.file.contentType,
            videoUrl: fields.file.url,
            poster: slide.fields.poster?.fields.file.url,
          });
          setIsModalOpen(true);
        }}
      />
    );
  };

  const getSectionTitleNode = () => {
    return (
      <ContentfulRichText
        variant="unstyled"
        className="carouselMediaSectionRichTitle"
        document={title}
      />
    );
  };

  const getMediaTitleNode = (title: RichTextType) => {
    return (
      <Box data-swiper-parallax={'20%'} data-swiper-parallax-opacity={0.5}>
        <ContentfulRichText
          className="carouselMediaSectionItemTitle"
          variant="unstyled"
          document={title}
        />
      </Box>
    );
  };

  const getTextNode = (text: string) => {
    return (
      <Box data-swiper-parallax={'20%'} data-swiper-parallax-opacity={0.5}>
        <Text className="carouselMediaSectionDescription">{text}</Text>
      </Box>
    );
  };

  return (
    <Section sx={{ ...style.root }} id={id}>
      <Container>{getSectionTitleNode()}</Container>
      <Carousel
        watchSlidesProgress
        isPaginate={false}
        slidesPerView={1.5}
        spaceBetween={20}
        breakpoints={{
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        slidesOffsetAfter={50}
        slidesOffsetBefore={50}
        navigation
      >
        {carouselMediaSectionSlides.map(carouselSlide => {
          const { title, description } = carouselSlide.fields;
          return (
            <Media
              key={carouselSlide.sys.id}
              imageNode={getMediaItemNode(carouselSlide)}
              titleNode={getMediaTitleNode(title)}
              descriptionNode={getTextNode(description)}
            />
          );
        })}
      </Carousel>

      {isModalOpen && modalVideoData ? (
        <Modal
          title={modalVideoData.title}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setModalVideoData(null);
          }}
        >
          <Video
            style={{
              height: '100vh',
              maxHeight: '400px',
              margin: 'auto',
            }}
            enabled
            videoUrl={modalVideoData.videoUrl}
            videoType={modalVideoData.videoType}
            autoPlay
          />
        </Modal>
      ) : (
        <></>
      )}
    </Section>
  );
};
export default CarouselMediaSection;
