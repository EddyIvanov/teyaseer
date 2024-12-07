import React from 'react';

import { AbsoluteCenter, Box, SystemStyleObject } from '@chakra-ui/react';

import style from './CenteredLoader.style';
import {
  DashboardHomeSkeleton,
  DocumentListSkeleton,
  GuideSkeleton,
  MyProfileSkeleton,
  ServiceDetailsSkeleton,
  CalculatorSideBlock,
  CalculatorCarousel,
} from './components/skeletons';
import { MainArticleSkeleton } from './components/skeletons/MainArticleSkeleton';
import ProjectCompletionSummarySkeleton from './components/skeletons/ProjectCompletionSummarySkeleton';

import { Loader } from '@/components';

interface ICenteredLoaderProps {
  variant?:
    | 'loader'
    | 'guideSkeleton'
    | 'serviceDetailsSkeleton'
    | 'documentListSkeleton'
    | 'myProfileSkeleton'
    | 'dashbaordHomeSkeleton'
    | 'projectCompletionSummary'
    | 'mainArticleSkeleton'
    | 'calculatorSideBlock'
    | 'calculatorCarousel';
  sx?: SystemStyleObject;
}

const noBackgroundVariantas = [
  'myProfileSkeleton',
  'dashbaordHomeSkeleton',
  'guideSkeleton',
  'calculatorCarousel',
];
const CenteredLoader = ({ variant = 'loader', sx }: ICenteredLoaderProps) => (
  <Box
    sx={
      !noBackgroundVariantas.includes(variant)
        ? style.root
        : { w: '100%', ...sx }
    }
    className={variant}
  >
    {variant === 'loader' && (
      <AbsoluteCenter axis="both">
        <Loader thickness="3px" size={'xl'} />{' '}
      </AbsoluteCenter>
    )}
    {variant === 'guideSkeleton' && <GuideSkeleton />}
    {variant === 'serviceDetailsSkeleton' && <ServiceDetailsSkeleton />}
    {variant === 'documentListSkeleton' && <DocumentListSkeleton />}
    {variant === 'myProfileSkeleton' && <MyProfileSkeleton />}
    {variant === 'dashbaordHomeSkeleton' && <DashboardHomeSkeleton />}
    {variant === 'projectCompletionSummary' && (
      <ProjectCompletionSummarySkeleton />
    )}
    {variant === 'calculatorSideBlock' && <CalculatorSideBlock />}
    {variant === 'calculatorCarousel' && <CalculatorCarousel />}
    {variant === 'mainArticleSkeleton' && <MainArticleSkeleton />}
  </Box>
);

export default CenteredLoader;
