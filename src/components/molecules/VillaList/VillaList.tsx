import { useContext, useEffect, useRef, useState } from 'react';

import { Button, Text, Flex, useBreakpointValue } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import villaListStyle from './VillaList.style';
import { VillaListProps } from './VillaList.type';

import {
  Container,
  Section,
  Icon,
  VillaArticleBig,
  Loader,
  NoVillaFound,
  VillaListFilters,
} from '@/components';
import { VillaType } from '@/components/renderings/VillaDesignsSection/VillaDesignsSection.type';
import { FILTER_TYPES } from '@/constants/villaFiltersTypes.constant';
import useTranslation from '@/hooks/useTranslate';
import { Context } from '@/providers/MainContext';
import { getFilteredVillasByQuery } from '@/services/villas';
import { Filter } from '@/types/ContentFul.type';

const VillaList = ({
  id,
  villaDesign,
  initialVillas,
  villaCategory,
  isInsideCustomerPortal = false,
  headerTitle,
}: VillaListProps) => {
  const style = villaListStyle();
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = useContext(Context);
  const isMounting = useRef(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [villas, setVillas] = useState<VillaType[]>(initialVillas);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string | number>
  >({});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState<boolean>(true);

  // If screen size is Md or below wrap the corresponding components in a container
  const isScreenSizeMdOrBelow = useBreakpointValue(
    {
      base: true,
      lg: false,
    },
    {
      fallback: 'lg',
    }
  );

  const getFilterQuery = () => {
    const filterObject: any = {
      AND: [],
    };

    if (villaCategory) {
      filterObject.category = villaCategory;
    }

    for (const key in selectedFilters) {
      const selectedFilter = villaDesign!.fields.filters.find(
        filter => filter.fields.fieldName === key
      );

      if (key === FILTER_TYPES.VILLA_TYPE) {
        filterObject.category = selectedFilters[key];
      } else if (selectedFilter?.fields.type === FILTER_TYPES.MINMAX) {
        const selectedFilterOption = selectedFilter?.fields.filters.find(
          filter => filter.fields.value === selectedFilters[key]
        );

        filterObject.AND.push({
          specifications: {
            fieldName: key,
            numberValue_gte: selectedFilterOption?.fields.min,
            numberValue_lte: selectedFilterOption?.fields.max || null,
          },
        });
      } else if (selectedFilter?.fields.type === FILTER_TYPES.EXACT) {
        filterObject.AND.push({
          specifications: {
            fieldName: key,
            numberValue: selectedFilters[key],
          },
        });
      } else if (selectedFilter?.fields.type === FILTER_TYPES.EXACT_FIELD) {
        filterObject.AND.push({
          expandedRooms: selectedFilters[key],
        });
      }
    }

    return filterObject;
  };

  const getFilteredVillas = async (page = 0) => {
    try {
      const filterQueryObj = getFilterQuery();
      const villas_data = await getFilteredVillasByQuery(
        locale,
        10,
        filterQueryObj,
        page
      );
      setLoading(false);
      if (villas_data.length < 10) {
        setShowLoadMore(false);
      }
      if (page === 0) {
        setVillas(villas_data);
        return;
      }
      setVillas(prevVillas => [...prevVillas, ...villas_data]);
    } catch (e) {
      setLoading(false);
    }
  };

  // Get filtered villas on selected filters change, but not on initial render
  useEffect(() => {
    if (isMounting.current) {
      isMounting.current = false;
      return;
    }
    getFilteredVillas();
  }, [selectedFilters, locale]);

  const handleLoadMore = async () => {
    setPage(prevPage => {
      const newPage = prevPage + 1;
      getFilteredVillas(newPage);
      return newPage;
    });
  };

  const getInitialFilters = () => {
    const urlFilters: any = { ...router.query };
    const filters = villaDesign?.fields.filters || [];
    delete urlFilters.id;

    for (const key in urlFilters) {
      const matchedFilter = filters.find(
        filter => filter.fields.fieldName === key
      );

      // If filter is of type minmax, find the corresponding filter option
      if (matchedFilter?.fields.type === FILTER_TYPES.MINMAX) {
        urlFilters[key] = matchedFilter?.fields.filters.find(filter => {
          const minValue = filter.fields.min;
          const maxValue = filter.fields.max;

          const urlFilterMinValue = parseInt(urlFilters[key].split('-')[0]);
          const urlFilterMaxValue = parseInt(urlFilters[key].split('-')[1]);

          if (!urlFilterMaxValue) return minValue === urlFilterMinValue;

          return (
            minValue === urlFilterMinValue && maxValue === urlFilterMaxValue
          );
        })?.fields.value;
      } else if (matchedFilter?.fields.type === FILTER_TYPES.EXACT) {
        if (parseInt(urlFilters[key])) {
          urlFilters[key] = parseInt(urlFilters[key]);
        }
      }
    }

    setSelectedFilters(urlFilters);
  };

  // Get initial filters on page load if any
  useEffect(() => {
    setLoading(true);
    if (router.isReady) {
      const initialFilters = { ...router.query };
      delete initialFilters.id;

      if (Object.keys(initialFilters).length > 0) {
        getInitialFilters();
      } else {
        setLoading(false);
      }
    }
  }, [router.isReady]);
  const onFilterClick = (filterFieldName: string, option: Filter) => {
    setLoading(true);
    const newSelectedFilters = { ...selectedFilters };

    const optionValue = option.fields.value || option.fields.stringValue;
    if (newSelectedFilters[filterFieldName] === optionValue) {
      delete newSelectedFilters[filterFieldName];
    } else {
      newSelectedFilters[filterFieldName] = optionValue;
    }
    setPage(0);
    setShowLoadMore(true);
    setSelectedFilters(newSelectedFilters);
  };
  return (
    <Section sx={style.root} id={id}>
      <Container>
        <Flex sx={style.headerContainer}>
          {!isInsideCustomerPortal ? (
            <Button
              as={Link}
              href={villaDesign!.fields.backNavigation.fields.href}
              aria-label={t('aria_label_back_button')}
              variant={'unstyled'}
              leftIcon={<Icon name="arrowBack" />}
            />
          ) : null}
          <Text sx={style.headerTitle}>{headerTitle}</Text>
        </Flex>
        <VillaListFilters
          filters={villaDesign?.fields.filters || []}
          selectedFilters={selectedFilters}
          onFilterClick={onFilterClick}
        />
      </Container>
      <Flex flexDirection="column" sx={style.villasList}>
        <>
          {loading ? (
            <Loader />
          ) : (
            <>
              {villas.length > 0 ? (
                <>
                  {villas.map((villa, index) => (
                    <Flex
                      flexDirection={index % 2 === 0 ? 'row-reverse' : 'row'}
                      key={villa.sys.id}
                    >
                      <Flex
                        flexDirection="column"
                        width={{
                          base: '100%',
                          lg: 'min-content',
                        }}
                      >
                        <VillaArticleBig
                          villa={villa}
                          isScreenSizeMdOrBelow={isScreenSizeMdOrBelow}
                          isMirrored={index % 2 !== 0}
                          isInsideCustomerPortal={isInsideCustomerPortal}
                        />
                      </Flex>
                    </Flex>
                  ))}
                </>
              ) : (
                <>
                  <NoVillaFound />
                </>
              )}
            </>
          )}
        </>
      </Flex>
      {showLoadMore && (
        <Button
          variant={'secondary'}
          sx={{ maxW: '300px', m: 'auto', mb: '20px' }}
          isLoading={loading}
          onClick={handleLoadMore}
        >
          <Text>{t('portal_villa_show_more_button')}</Text>
        </Button>
      )}
    </Section>
  );
};

export default VillaList;
