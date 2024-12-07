import { useEffect, useState } from 'react';

import { Box, Button, Flex, HStack, Heading, VStack } from '@chakra-ui/react';
import { EntrySys } from 'contentful';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  Container,
  ContentfulRichText,
  Icon,
  Image,
  Section,
} from '@/components';
import { getArticleIds } from '@/graphql/api';
import useTranslation from '@/hooks/useTranslate';
// import { Context } from '@/providers/MainContext';
import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';
import { AssetType, RichTextType } from '@/types/ContentFul.type';

interface NewsSectionProps {
  sys: EntrySys;
  fields: {
    title: string;
    description: RichTextType;
    isFeatured: boolean;
    image: AssetType;
  };
  id?: string;
}

export default function NewsSection(props: NewsSectionProps) {
  const {
    // sys: { updatedAt },
    fields: { title, description, image },
    id,
  } = props;
  /* const { locale } = useContext(Context);
  const localeFormat = locale === 'en' ? 'en-US' : 'ar-EG';
  const publishedAt = new Intl.DateTimeFormat(localeFormat, {
    dateStyle: locale === 'en' ? 'medium' : 'long',
  }).format(new Date(updatedAt)); */
  const router = useRouter();
  const [articles, setArticles] = useState<{ sys: { id: string } }[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    getArticleIds().then(articles => {
      setArticles(articles);
    });
  }, []);

  const currentIdx = articles.findIndex(
    article => article.sys.id === router.query.id
  );

  const isFirstItem = currentIdx === 0;
  const isLastItem = currentIdx === articles.length - 1;
  const nextArticleId = articles[currentIdx + 1]?.sys?.id;
  const prevArticleId = articles[currentIdx - 1]?.sys?.id;
  const isFirstItemDisabled = (isFirstItem && isLastItem) || isFirstItem;
  const isLastItemDisabled = (isFirstItem && isLastItem) || isLastItem;

  return (
    <Section minH="calc(100vh - 200px)" sx={{ h: '100%' }} id={id}>
      <Box
        sx={{
          position: 'relative',
          ':before': {
            zIndex: 1,
            content: '""',
            bottom: 0,
            position: 'absolute',
            width: '100%',
            height: { base: '150px', lg: '250px' },
            background: `linear-gradient(0deg, ${colors.background} 2.19%, rgba(255, 255, 255, 0.675338) 40.95%, rgba(255, 255, 255, 0) 76.89%)`,
          },
          pb: { base: '45%', md: '30%' },
        }}
      >
        <Image
          loaderOpt={{ w: 1920, h: 770, fit: 'fill' }}
          src={image.fields.file.url}
          alt={image.fields.title}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          fill
        />
        <Container>
          <VStack align="start" position="absolute" bottom={0} zIndex={1}>
            <Heading
              as="h1"
              fontWeight={{ base: FontWeights.normal, xl: FontWeights.light }}
              fontSize={{
                base: FontSizes.fourXLarge,
                xl: FontSizes.sixHalfXLarge,
              }}
              color={colors.secondaryHover}
            >
              {title}
            </Heading>
            {/* <Text fontSize={FontSizes.normal}>{publishedAt}</Text> */}
          </VStack>
        </Container>
      </Box>

      <Flex direction="column" alignItems="center" my="72px">
        <Flex
          direction="column"
          w={{ base: '95%', md: '70%', lg: '50%' }}
          gap="64px"
        >
          <ContentfulRichText document={description} />
          <HStack flexWrap="wrap-reverse">
            <Button
              variant="secondary"
              as={!isFirstItemDisabled ? Link : undefined}
              href={
                !isFirstItemDisabled
                  ? `/support/articles/${prevArticleId}`
                  : undefined
              }
              isDisabled={isFirstItemDisabled}
              leftIcon={<Icon name="arrowBack" w="20px" h="20px" />}
              w={{ base: '100%', sm: 'auto' }}
            >
              {t('prev_article')}
            </Button>
            <Button
              as={!isLastItemDisabled ? Link : undefined}
              href={
                !isLastItemDisabled
                  ? `/support/articles/${nextArticleId}`
                  : undefined
              }
              isDisabled={isLastItemDisabled}
              rightIcon={
                <Icon
                  name="arrow"
                  sx={{
                    path: {
                      stroke: 'white',
                    },
                  }}
                  w="24px"
                  h="24px"
                />
              }
              w={{ base: '100%', sm: 'auto' }}
            >
              {t('next_article')}
            </Button>
          </HStack>
        </Flex>
      </Flex>
    </Section>
  );
}
