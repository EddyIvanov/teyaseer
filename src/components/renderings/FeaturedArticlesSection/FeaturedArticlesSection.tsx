import { useContext, useEffect, useState } from 'react';

import { Box, useMultiStyleConfig } from '@chakra-ui/react';
import Link from 'next/link';

import { CarouselMediaSectionProps as FeaturedArticlesSectionProps } from '../CarouselMediaSection/CarouselMediaSection.type';

import {
  Carousel,
  Container,
  ContentfulRichText,
  Section,
  Text,
} from '@/components';
import CarouselMediaItem from '@/components/molecules/CarouselMediaItem';
import Media from '@/components/molecules/Media';
import { getFeaturedArticles } from '@/graphql/api';
import { Context } from '@/providers/MainContext';

interface FeaturedArticle {
  image: { contentType: string; fileName: string; title: string; url: string };
  sys: { id: string; publishedAt: string };
  title: string;
}

const FeaturedArticlesSection = ({
  title,
  id,
}: FeaturedArticlesSectionProps) => {
  const style = useMultiStyleConfig('CarouselMediaSection', {});
  const { locale } = useContext(Context);
  const [featuredArticles, setFeaturedArticles] = useState<FeaturedArticle[]>(
    []
  );

  useEffect(() => {
    getFeaturedArticles(locale).then(articles => {
      setFeaturedArticles(articles);
    });
  }, [locale]);

  const getMediaItemNode = (image: FeaturedArticle['image']) => {
    return (
      <CarouselMediaItem
        contentType={image?.contentType}
        url={image?.url}
        title={image?.title}
        onVideoClick={() => undefined}
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

  const getMediaTitleNode = (text: string) => {
    return (
      <Box data-swiper-parallax={'20%'} data-swiper-parallax-opacity={0.5}>
        <Text className="carouselMediaSectionItemTitle">{text}</Text>
      </Box>
    );
  };

  /* const getDateNode = (date: string) => {
    const localeFormat = locale === 'en' ? 'en-US' : 'ar-EG';
    const publishedAt = new Intl.DateTimeFormat(localeFormat, {
      dateStyle: locale === 'en' ? 'medium' : 'long',
    }).format(new Date(date));
    return (
      <Box data-swiper-parallax={'20%'} data-swiper-parallax-opacity={0.5}>
        <Text>{publishedAt}</Text>
      </Box>
    );
  }; */

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
        {featuredArticles.map(article => {
          return (
            <Link
              href={`/support/articles/${article.sys.id}`}
              key={article.sys.id}
            >
              <Media
                imageNode={getMediaItemNode(article.image)}
                titleNode={getMediaTitleNode(article.title)}
                /* date={getDateNode(article.sys.publishedAt)} */
              />
            </Link>
          );
        })}
      </Carousel>
    </Section>
  );
};
export default FeaturedArticlesSection;
