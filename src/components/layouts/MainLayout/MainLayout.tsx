import React from 'react';

import ErrorBoundary from '../ErrorBoundary';

import { Footer, Header, Main } from '@/components';
import { primaryFont, secondaryFont } from '@/styles/themes/foundations/fonts';

interface IMainLayoutProps {
  children: React.ReactNode;
  fixFooter?: boolean;
  withScrollAnimation?: boolean;
  updateHeaderStyleOnScroll?: boolean;
  alwaysOpaqueStyle?: boolean;
  headerData?: any;
  footerData?: any;
}

const MainLayout = (props: IMainLayoutProps) => {
  const {
    children,
    fixFooter = false,
    withScrollAnimation = false,
    updateHeaderStyleOnScroll = true,
    alwaysOpaqueStyle = false,
    headerData,
    footerData,
  } = props;
  const hasError = (children as any)?.props?.extraDetails;
  return (
    <div
      className={`main-layout ${primaryFont.variable} ${secondaryFont.variable}`}
    >
      <Header
        alwaysOpaqueStyle={hasError ? true : alwaysOpaqueStyle}
        updateHeaderStyleOnScroll={updateHeaderStyleOnScroll}
        headerData={headerData}
      />
      <ErrorBoundary>
        <Main withScrollAnimation={withScrollAnimation}>{children}</Main>
      </ErrorBoundary>
      <Footer fixFooter={fixFooter} footerData={footerData} />
    </div>
  );
};
export default MainLayout;
