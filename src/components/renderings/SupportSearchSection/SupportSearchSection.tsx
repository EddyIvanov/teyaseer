import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  Container,
  ContentfulRichText,
  HeadInfo,
  Icon,
  Section,
} from '@/components';
import SupportSearchCategory from '@/components/molecules/SupportSearchCategory/SupportSearchCategory';
import {
  EmptySupportSearch,
  SupportCategory,
} from '@/components/molecules/SupportSearchCategory/SupportSearchCategory.types';
import CenteredLoader from '@/components/organism/dashboard/CenteredLoader/CenteredLoader';
import {
  getAllCategories,
  getEmptyCategoryText,
  getSearchedCategories,
} from '@/graphql/api';
import { debounce } from '@/helpers/debounce';
import useTranslation from '@/hooks/useTranslate';
import { NextPageWithLayout } from '@/pages/_app';
import { Context } from '@/providers/MainContext';
import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';
import { WebPage } from '@/types/ContentFul.type';

type T_Props = {
  hasTopMargin?: boolean;
  defaultSearchId?: string;
} & WebPage;

export const SupportSearchSection: NextPageWithLayout<T_Props> = ({
  metaTitle,
  metaDescription,
  metaImage,
  hasTopMargin = true,
  defaultSearchId,
}: T_Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const query = router.query.q as string | undefined;
  const searchIdQuery = router.query.searchId as string | undefined;
  const [searchQuery, setSearchQuery] = useState('');
  const { locale } = useContext(Context);
  const [categories, setCategories] = useState<SupportCategory[]>([]);
  const [noSearchText, setNoSearchText] = useState<EmptySupportSearch>();
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const searchId = searchIdQuery
    ? searchIdQuery?.charAt(0).toUpperCase() + searchIdQuery?.slice(1)
    : '';

  /*
  callback is needed to prevent debounced function from being recreated on every render
   */
  const debouncedGetSearchedCategories = useCallback(
    debounce((query, searchId, locale) => {
      if (query.trim()) {
        router.replace({
          pathname: router.pathname,
          search: `q=${query}`,
        });
        setIsLoading(true),
          getSearchedCategories(query, searchId, locale).then(data => {
            setCategories(data);
            setIsLoading(false);
          });
      } else {
        router.replace({
          pathname: router.pathname,
        });
        getAllCategories(locale, 10, defaultSearchId).then(data => {
          setCategories(data);
          setIsLoading(false);
        });
      }
    }, 500),
    []
  );

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    setSearchQuery(currentValue);
    setIsTyping(true);
    debouncedGetSearchedCategories(
      currentValue,
      defaultSearchId || searchId,
      locale
    );
  };

  useEffect(() => {
    if (query && !isTyping) {
      setIsLoading(true);
      setSearchQuery(query);
      getSearchedCategories(query, searchId, locale).then(data => {
        setCategories(data);
        setIsLoading(false);
      });
    } else if (!query) {
      getAllCategories(locale, 10, defaultSearchId).then(data => {
        setCategories(data);
        setIsLoading(false);
      });
    }
  }, [query, searchId, locale, defaultSearchId, isTyping]);

  /*
  Ensure to reset isTyping when debounced function is called
   */
  useEffect(() => {
    if (isTyping) {
      setIsTyping(false);
    }
  }, [debouncedGetSearchedCategories]);

  useEffect(() => {
    getEmptyCategoryText(locale).then(data => {
      setNoSearchText(data);
    });
  }, [locale]);

  return (
    <>
      <HeadInfo
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        openGraphImage={metaImage}
      />
      <Section
        sx={{
          minH: 'calc(100vh)',
          h: '100%',
          ...(hasTopMargin && {
            top: { base: '62px', lg: '100px' },
          }),
        }}
      >
        <Container>
          <VStack align="flex-start">
            <Heading
              fontSize={{
                base: FontSizes.fourXLarge,
                lg: FontSizes.fiveXLarge,
              }}
              fontWeight={FontWeights.medium}
              m={{ base: '30px 0', lg: '48px 0', xl: '62px 0 48px' }}
            >
              <Button
                aria-label={t('aria_label_back_button')}
                h="auto"
                lineHeight={0}
                variant="unstyled"
                as={Link}
                href="."
                leftIcon={<Icon name="arrowBack" />}
              />
              {t('search_for_result')}
            </Heading>
            <Flex direction="column" maxW="488px" w="100%">
              <InputGroup>
                <Input
                  sx={{
                    position: 'relative',
                    height: {
                      base: '40px',
                      md: '54px',
                    },
                    padding: '16px 56px 16px 32px',
                    borderRadius: '100px',
                    borderColor: colors.secondaryHover,
                    fontSize: {
                      base: FontSizes.small,
                      lg: FontSizes.xMedium,
                    },
                  }}
                  placeholder={t('search_for_result')}
                  onChange={handleSearchInputChange}
                  value={searchQuery}
                />
                <InputRightElement
                  sx={{
                    top: {
                      base: '7px',
                      md: '15px',
                    },
                    right: '28px',
                    cursor: 'pointer',
                  }}
                >
                  <Icon
                    name="search"
                    sx={{
                      _rtl: {
                        transform: 'scaleX(-1)',
                      },
                    }}
                  />
                </InputRightElement>
              </InputGroup>
            </Flex>

            <Divider borderColor={colors.borderSteelGray} mt={'48px'} />
            {isLoading ? (
              <CenteredLoader />
            ) : (
              <VStack alignItems="flex-start" mb="150px" w="100%">
                {categories.length > 0 ? (
                  categories.map(category => (
                    <SupportSearchCategory
                      key={self.crypto.randomUUID()}
                      category={category}
                    />
                  ))
                ) : (
                  <VStack w="100%" textAlign="center" mt={'48px'}>
                    {noSearchText?.iconName && (
                      <Icon
                        name={noSearchText.iconName}
                        mb={6}
                        w="48px"
                        h="48px"
                      />
                    )}
                    {noSearchText?.description.json && (
                      <ContentfulRichText
                        document={noSearchText?.description?.json}
                      />
                    )}
                  </VStack>
                )}
              </VStack>
            )}
          </VStack>
        </Container>
      </Section>
    </>
  );
};
