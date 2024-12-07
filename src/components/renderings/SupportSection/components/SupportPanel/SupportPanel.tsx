import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Input,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import style from './SupportPanel.style';
import { SupportPanelProps } from './SupportPanel.type';

import { Icon } from '@/components';
import ArticleCategoryDetails from '@/components/renderings/ArticleCategorySection/components/ArticleCategoryDetails';
import useTranslation from '@/hooks/useTranslate';
import colors from '@/styles/themes/brand/colors';

const SupportPanel = ({ dropdownLists }: SupportPanelProps) => {
  const { t } = useTranslation();

  const router = useRouter();
  const params = router.query;
  const categoryIdx = Number(params.category);

  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const [searchText, setSearchText] = useState('');
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const accordionItemId = isMobile ? String(categoryIdx) : ''; // as we don't need the scroll to the specific item feature on large screen
  useEffect(() => {
    categoryIdx && setSelectedCategoryIdx(categoryIdx - 1);
  }, [categoryIdx]);

  const [tabName, setTabName] = useState(dropdownLists[0]?.fields?.title || '');

  const updateRoute = (query: string) => {
    router.push({
      pathname: '/support/search',
      query: { searchId: tabName, q: query },
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleOnSubmitSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateRoute(event.currentTarget.value);
    }
  };

  const handleSearchClick = () => {
    if (searchText.length) {
      updateRoute(searchText);
    }
  };

  const onMainTabClick = () => {
    setSelectedCategoryIdx(0);
  };

  const onAccordionChange = (id: number) => {
    setSelectedCategoryIdx(id);
  };

  return (
    <Tabs
      sx={style.tabs}
      colorScheme={colors.brand.primary}
      onChange={index => setTabName(dropdownLists[index]?.fields?.title || '')}
    >
      <TabList>
        {dropdownLists.map((dropdownList, index) => {
          return (
            <Tab sx={style.tab} key={index} onClick={onMainTabClick}>
              {dropdownList.fields.title}
            </Tab>
          );
        })}
      </TabList>
      <HStack sx={style.searchWrapper}>
        <Button
          aria-label={t('aria_label_search_button')}
          variant="unstyled"
          className="serachIcon"
          onClick={handleSearchClick}
        >
          <Icon name="search" w="16px" h="16px" />
        </Button>
        <Box height={'100%'} width={'1px'} bg={colors.border} />
        <Input
          onKeyDown={handleOnSubmitSearch}
          placeholder={t('support_serach_input_placeholder')}
          onChange={handleInputChange}
        />
      </HStack>
      <TabPanels sx={{ height: { base: '100%', lg: 'unset' } }}>
        {dropdownLists &&
          dropdownLists.map((dropdownList, index) => {
            return (
              <TabPanel key={dropdownList.fields.title} sx={{ p: 0 }}>
                <Accordion
                  variant="noOutline"
                  pb={'30px'}
                  pt={'10px'}
                  onChange={onAccordionChange}
                  index={[selectedCategoryIdx]}
                  data-selected={selectedCategoryIdx === index}
                  sx={style.accordion}
                  allowToggle
                >
                  {dropdownList &&
                    dropdownList.fields.categories &&
                    dropdownList.fields.categories.map(category => (
                      <AccordionItem key={category.sys.id} id={accordionItemId}>
                        <AccordionButton gap={8}>
                          <Box sx={style.icon}>
                            <Icon
                              name={category.fields.iconName || 'clock'}
                              w="32px"
                              h="32px"
                            />
                          </Box>
                          <Box as="span" flex="1" className="accordion-title">
                            {category.fields.title}
                          </Box>
                        </AccordionButton>
                        <AccordionPanel>
                          <ArticleCategoryDetails
                            articles={category.fields.content}
                          />
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                </Accordion>
              </TabPanel>
            );
          })}
      </TabPanels>
    </Tabs>
  );
};
export default SupportPanel;
