import { useEffect, useRef, useState } from 'react';

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { ArticleCategorySectionProps } from './ArticleCategorySection.type';
import ArticleCategoryDetails from './components/ArticleCategoryDetails';

import { Icon, Image, MainArticle } from '@/components';

const ArticleCategorySection = ({
  backgroundImage,
  categories,
  icon,
  mainTitle,
  id,
  isPageFirstSection,
}: ArticleCategorySectionProps) => {
  const style = useMultiStyleConfig('ArticleCategorySection', {});
  const scrollableAreaRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const params = router.query;
  const { selected } = params;
  const categoryIdx = Number(params.category);

  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const scrollToAccordion = () => {
    const selectedAccordionItem = document?.querySelector(
      `[data-id="${selected}"]`
    );
    if (selectedAccordionItem) {
      selectedAccordionItem.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const onChange = (id: number) => {
    setSelectedCategoryIdx(id);
  };

  useEffect(() => {
    if (selected) {
      const cat = categories.findIndex(cat => {
        return cat.sys.id === selected;
      });
      if (cat >= 0) {
        setSelectedCategoryIdx(cat);
        setTimeout(() => {
          scrollToAccordion();
        }, 200);
      }
    }
  }, [selected, categories]);

  useEffect(() => {
    categoryIdx && setSelectedCategoryIdx(categoryIdx - 1);
  }, [categoryIdx]);

  return (
    <MainArticle
      backgroundImg={backgroundImage}
      title={mainTitle}
      titlePosition={'Center'}
      descriptionPosition="Top"
      variant={'normalImage'}
      size={'fullScreen'}
      panelWidth={'600px'}
      isPageFirstSection={isPageFirstSection}
      hasAnimation={false}
      LogoComponent={
        <Box
          sx={{
            width: {
              lg: '60%',
              xl: '70%',
              '2xl': '80%',
              '3xl': '90%',
              '4xl': '100%',
            },
          }}
        >
          <Image
            alt={icon.fields.title}
            src={icon.fields.file.url}
            width={icon.fields.file.details.image.width}
            height={icon.fields.file.details.image.height}
            unoptimized
            lazyLoading={false}
            priority={isPageFirstSection ? true : undefined}
          />
        </Box>
      }
      id={id}
    >
      <Accordion
        className="arccordion"
        variant="noOutline"
        onChange={onChange}
        index={[selectedCategoryIdx]}
        sx={style.accordion}
        allowToggle
        ref={scrollableAreaRef}
      >
        {categories.map(category => (
          <AccordionItem
            className="accordion-item"
            key={category.sys.id}
            data-id={category.sys.id}
          >
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
    </MainArticle>
  );
};
export default ArticleCategorySection;
