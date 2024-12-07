import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  MenuItemOption,
  MenuOptionGroup,
  Tooltip,
  VStack,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import style from './AdditionalConsultant.style';
import { IAdditionalVendor } from './AdditionalConsultant.type';
import { IConsultantType } from '../../Consultants.type';
import BucketList from '../BucketList';
import ConsultantsList from '../ConsultantsList';

import { MenuDropdown, Text } from '@/components';
import Search from '@/components/molecules/Search';
import SearchAndFiltersProps from '@/components/organism/OurPartners/components/SearchAndFilters/SearchAndFilters.type';
import { debounce } from '@/helpers/debounce';
import useTranslation from '@/hooks/useTranslate';
import { Context } from '@/providers/MainContext';
import { getAuthVendorsListFilters, getVendorsList } from '@/services/vendors';

const AdditionalConsultant = ({
  updateContextState,
  vendors,
  minSelected,
  maxSelected,
  vendorType,
  title,
  description,
}: IAdditionalVendor) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { locale } = useContext(Context);
  const cardStyle = useMultiStyleConfig('Card', {});
  const [items, setItems] = useState<IConsultantType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<SearchAndFiltersProps>();
  const [selectedFilters, setSelectedFilters] = useState<Map<string, any>>(
    new Map()
  );

  const [selectedItems, setSelectItems] = useState<IConsultantType[]>(vendors);
  // const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState<number>(1);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const searchQuery = searchRef.current?.value || '';
  const vendorFilters = new Map([
    ['ratings', 'rating'],
    ['locations', 'location'],
    ['classifications', 'classification'],
  ]);
  const handleSubmit = () => {
    updateContextState({ vendors: selectedItems });
    router.back();
  };

  const handleSelectConsultant = (items: IConsultantType[]) => {
    setSelectItems(items);
  };

  useEffect(() => {
    setItems([]);
    setIsEnd(false);
    setPage(1);
    fetchList();
  }, [selectedFilters]);

  useEffect(() => {
    fetchFilters();
  }, []);

  const handleNextPage = () => {
    setPage(page + 1);
    fetchList(page + 1);
  };

  const fetchFilters = async () => {
    getAuthVendorsListFilters().then(res => {
      const data = res.data.data;
      Object.keys(data).forEach(key => {
        data[key].data.unshift({ name: t('portal_filter_all') });
      });
      setFilters(res.data.data);
    });
  };

  const fetchList = async (_page = 1) => {
    setLoading(true);
    getVendorsList(selectedFilters, _page, 10, vendorType, locale)
      .then((response: any) => {
        const new_data = response.data.data;
        const total = response.data.meta.total;
        setItems(prev => {
          if (total <= prev.length + new_data.length) {
            setIsEnd(true);
          }
          if (_page === 1) {
            return new_data;
          }
          return [...prev, ...new_data];
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleFilterClick = (fieldName: string, option: string) => {
    if (option === t('portal_filter_all')) {
      option = '';
    }
    if (fieldName === 'search') {
      selectedFilters.set('search', option);
    } else {
      if (selectedFilters.get(fieldName) === option || option === '') {
        selectedFilters.delete(fieldName);
      } else {
        selectedFilters.set(fieldName, option);
      }
    }
    setSelectedFilters(new Map(selectedFilters));
  };

  const handleSearchKeydown = (e: React.KeyboardEvent) => {
    if (e.type === 'keydown' && e.key === 'Enter') {
      handleFilterClick('search', searchQuery);
    }
  };

  const debounceOnHandleSearchInputChange = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length) {
        handleFilterClick('search', e.target.value);
      } else {
        handleFilterClick('search', '');
      }
    }, 1000),
    [selectedFilters, searchQuery]
  );

  const handleClearList = () => {
    setSelectItems([]);
  };

  return (
    <Flex gap="8" flex={1} overflow={'hidden'}>
      <Flex flex={1} flexDirection="column" gap="8" overflow={'hidden'}>
        <Card>
          <CardHeader>
            <VStack gap={'20px'} alignItems={'flex-start'}>
              <Text sx={{ ...cardStyle.headerTitle, ...cardStyle.guideTitle }}>
                {title}
              </Text>
              <Text sx={cardStyle.headerSubtitle}>{description}</Text>
            </VStack>
          </CardHeader>
          <Divider />
          <Flex sx={style.searchContainer}>
            <Search
              ref={searchRef}
              onKeyDown={handleSearchKeydown}
              handleInputChange={debounceOnHandleSearchInputChange}
              handleOnSubmitSearch={() =>
                handleFilterClick('search', searchQuery)
              }
            />
            <Flex sx={style.filterBox}>
              {filters &&
                Object.entries(filters).map(([key, value]) => {
                  return value.data.length ? (
                    <MenuDropdown
                      key={key}
                      placeholderText={t(value.labelTextContentfulId)}
                    >
                      <MenuOptionGroup
                        value={selectedFilters.get(
                          vendorFilters.get(key || '') || key
                        )}
                        type="radio"
                        ringOffset={'100px'}
                      >
                        {value.data.map((option: any) => (
                          <MenuItemOption
                            sx={style.menuItemOption}
                            onClick={() => {
                              handleFilterClick(
                                vendorFilters.get(key) || key,
                                option.name.toString()
                              );
                            }}
                            key={option.name}
                            value={option.name.toString()}
                          >
                            {t(option.name) || option.name}
                          </MenuItemOption>
                        ))}
                      </MenuOptionGroup>
                    </MenuDropdown>
                  ) : null;
                })}
            </Flex>
          </Flex>
          <CardBody>
            {!loading && (
              <BucketList
                vendorList={selectedItems}
                updateContextState={updateContextState}
                vendorType={vendorType}
                onClear={handleClearList}
                onSelectedChange={handleSelectConsultant}
              />
            )}
            <ConsultantsList
              items={items}
              selectedItems={selectedItems}
              loading={loading}
              onSelectConsultant={handleSelectConsultant}
              maxSelectable={maxSelected}
              minSelectable={minSelected}
              noDataMesage={t('portal_additional_vendors_serach_not_found')}
            />
          </CardBody>
          {!isEnd && items.length > 0 && (
            <Flex mt="20px" w="100%" justifyContent="center">
              <Button
                isLoading={loading && items.length > 0}
                onClick={handleNextPage}
                variant={'secondary'}
              >
                {t('load_more')}
              </Button>
            </Flex>
          )}
          <CardFooter>
            <Flex sx={style.cardFooterWrapper}>
              <Button variant={'secondary'} onClick={router.back}>
                {t('portal_cancel')}
              </Button>
              <Tooltip hasArrow>
                <Button
                  isDisabled={selectedItems.length === 0}
                  onClick={handleSubmit}
                >
                  {t('portal_add_additional_consultant_confirm_button')}
                </Button>
              </Tooltip>
            </Flex>
          </CardFooter>
        </Card>
      </Flex>
    </Flex>
  );
};

export default AdditionalConsultant;
