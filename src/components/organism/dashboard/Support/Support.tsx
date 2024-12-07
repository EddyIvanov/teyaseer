import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Input,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { Icon } from '@/components';
import { Category } from '@/components/renderings/ArticleCategorySection/ArticleCategorySection.type';
import ArticleCategoryDetails from '@/components/renderings/ArticleCategorySection/components/ArticleCategoryDetails';
import style from '@/components/renderings/SupportSection/components/SupportPanel/SupportPanel.style';
import AppRoutes from '@/constants/AppRoutes';
import useTranslation from '@/hooks/useTranslate';
import colors from '@/styles/themes/brand/colors';

type TProps = {
  title?: string;
  categories: Array<Category>;
};

export const Support = ({ categories }: TProps) => {
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

  const updateRoute = (query: string) => {
    router.push({
      pathname: AppRoutes.Dashboard.Supports.Search,
      query: { searchId: 'WebPortalAndMobile', q: query },
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

  const onAccordionChange = (id: number) => {
    setSelectedCategoryIdx(id);
  };

  return (
    <Box width="100%" overflow={'hidden'}>
      <Card
        borderWidth="1px"
        borderRadius="2xl"
        borderColor="border"
        direction="column"
        padding="0"
      >
        <CardBody px={{ md: '120px' }}>
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
          <Accordion
            variant="noOutline"
            pb={'30px'}
            pt={'10px'}
            onChange={onAccordionChange}
            index={[selectedCategoryIdx]}
            // data-selected={selectedCategoryIdx === index}
            sx={style.accordion}
            allowToggle
          >
            {categories.map(category => (
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
                  <ArticleCategoryDetails articles={category.fields.content} />
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </CardBody>
      </Card>
    </Box>
  );
};
