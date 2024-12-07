import VendorMapSection from '@/components/organism/VendorMap/VendorMapSection';
import AppDownload from '@/components/renderings/AppDownload';
import ArticleCategorySection from '@/components/renderings/ArticleCategorySection';
import ArticleListSection from '@/components/renderings/ArticleListSection';
import ArticleSection from '@/components/renderings/ArticleSection';
import CarouselArticleSection from '@/components/renderings/CarouselArticleSection';
import CarouselMediaSection from '@/components/renderings/CarouselMediaSection';
import CustomerSignUpArticle from '@/components/renderings/CustomerSignUpArticle';
import FeaturedArticlesSection from '@/components/renderings/FeaturedArticlesSection';
import Hero from '@/components/renderings/Hero';
import MainArticleSection from '@/components/renderings/MainArticleSection';
import NewsSection from '@/components/renderings/NewsSection';
import NonEligibleArticleSection from '@/components/renderings/NonEligibleArticleSection';
import OnlyHtmlArticleSection from '@/components/renderings/OnlyHtmlArticleSection';
import PlainHtmlArticleSection from '@/components/renderings/PlainHtmlArticleSection';
import StatisticsSection from '@/components/renderings/StatisticsSection';
import SuportHelpSection from '@/components/renderings/SuportHelpSection';
import SupportSection from '@/components/renderings/SupportSection';
import TeyaseerArticleSection from '@/components/renderings/TeyaseerArticleSection';
import Timeline from '@/components/renderings/Timeline';
import VendorsListSection from '@/components/renderings/VendorsListSection';
import VillaDesignsSection from '@/components/renderings/VillaDesignsSection';
import VillaDetailsSection from '@/components/renderings/VillaDetailsSection';
import VillaListSection from '@/components/renderings/VillaListSection';

const DYNAMIC_RENDERINGS: Record<string, any> = {
  Hero,
  Timeline,
  ArticleSection,
  StatisticsSection,
  appDownload: AppDownload,
  CarouselArticleSection,
  TeyaseerArticleSection,
  ArticleCategorySection,
  OnlyHtmlArticleSection,
  VillaDesignsSection,
  CustomerSignUpArticle,
  NonEligibleArticleSection,
  MainArticleSection,
  ArticleListSection,
  VillaListSection,
  VillaDetailsSection,
  SupportSection,
  CarouselMediaSection,
  SuportHelpSection,
  NewsSection,
  FeaturedArticlesSection,
  VendorsListSection,
  PlainHtmlArticleSection,
  VendorMapSection,
};

export default DYNAMIC_RENDERINGS;
