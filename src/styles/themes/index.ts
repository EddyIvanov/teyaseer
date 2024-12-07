// Global style overrides

// Foundational style overrides

// Custom brand tokens
import brand from './brand';
import boxShadows from './brand/boxShadows';
import breakpoints from './brand/breakpoints';
import colors from './brand/colors';
import fontSizes from './brand/fontSizes';
import fontWeights from './brand/fontWeights';
import letterSpacings from './brand/letterSpacings';
import lineHeights from './brand/lineHeights';
import radii from './brand/radii';
import sizes from './brand/sizes';
import space from './brand/space';
import { TooltipOverrides } from './componentOverrides/TooltipOverrides';
import styles from './styles';

// components
import { AccordionTheme as Accordion } from '@/components/atoms/Accordion';
import { CarouselTheme as Carousel } from '@/components/atoms/Carousel';
import { ContainerTheme as Container } from '@/components/atoms/Container';
import { ContentfulRichTextTheme as ContentfulRichText } from '@/components/atoms/ContentfulRichText';
import { SectionTheme as Section } from '@/components/atoms/Section';
import { SliderTheme as Slider } from '@/components/atoms/Slider';
import { TextTheme as Text } from '@/components/atoms/Text';
import { ArticleTheme as Article } from '@/components/molecules/Article';
import { MainArticleStyle as MainArticle } from '@/components/molecules/MainArticle';
import { MediaTheme as Media } from '@/components/molecules/Media';
// rendering
import { CarouselItemTheme as CarouselItem } from '@/components/molecules/slider/components/CarouselItem';
import { AppDownloadTheme as AppDownload } from '@/components/renderings/AppDownload';
import { ArticleCategorySectionTheme as ArticleCategorySection } from '@/components/renderings/ArticleCategorySection';
import { ArticleSectionTheme as ArticleSection } from '@/components/renderings/ArticleSection';
import { CarouselArticleSectionTheme as CarouselArticleSection } from '@/components/renderings/CarouselArticleSection';
import { CarouselMediaSectionTheme as CarouselMediaSection } from '@/components/renderings/CarouselMediaSection';
import { CustomerSignUpArticleTheme as CustomerSignUpArticle } from '@/components/renderings/CustomerSignUpArticle';
import { HeroTheme as Hero } from '@/components/renderings/Hero';
import { TeyaseerArticleSectionTheme as TeyaseerArticleSection } from '@/components/renderings/TeyaseerArticleSection';
import { ButtonOverrides } from '@/styles/themes/componentOverrides/ButtonOverrides';
import { CardOverrides } from '@/styles/themes/componentOverrides/CardOverrides';
import { HStackOverrides } from '@/styles/themes/componentOverrides/HStackOverrides';

const overrides = {
  styles,
  colors,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  radii,
  space,
  sizes,
  shadows: boxShadows,
  components: {
    Article,
    MainArticle,
    Card: CardOverrides,
    Button: ButtonOverrides,
    HStack: HStackOverrides,
    Container,
    ContentfulRichText,
    Text,
    Slider: { ...Slider },
    Carousel,
    Section,
    Hero,
    ArticleSection,
    CarouselArticleSection,
    TeyaseerArticleSection,
    CarouselItem,
    AppDownload,
    ArticleCategorySection,
    Accordion,
    CustomerSignUpArticle,
    CarouselMediaSection,
    Media,
    Tooltip: TooltipOverrides,
  },
  brand,
  breakpoints,
  textStyles: {
    title: {
      color: '#4C4E54',
      fontWeight: '500',
      fontSize: 'small',
    },
  },
};

export default overrides;
