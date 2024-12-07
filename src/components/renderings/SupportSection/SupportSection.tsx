import { Box } from '@chakra-ui/react';

import { SupportSection } from './SupportSection.type';
import SupportPanel from './components/SupportPanel/SupportPanel';

import { Image, MainArticle } from '@/components';

const SupportSection = ({
  backgroundImage,
  description,
  mainTitle,
  mainTitlePosition,
  displayLinkAs,
  fullScreen,
  swapImagePosition,
  dropdownLists,
  smallLogo,
  id,
  isPageFirstSection,
}: SupportSection) => {
  return (
    <>
      <MainArticle
        backgroundImg={backgroundImage}
        title={mainTitle}
        titlePosition={mainTitlePosition}
        description={description}
        descriptionPosition={'Top'}
        displayLinkAs={displayLinkAs}
        hasAnimation={false}
        variant={swapImagePosition ? 'swapImage' : 'normalImage'}
        size={fullScreen ? 'fullScreen' : 'fixedHeight'}
        panelWidth={'580px'}
        isPageFirstSection={isPageFirstSection}
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
              alt={smallLogo.fields.title}
              src={smallLogo.fields.file.url}
              width={smallLogo.fields.file.details.image.width}
              height={smallLogo.fields.file.details.image.height}
              unoptimized
              lazyLoading={false}
              priority={isPageFirstSection ? true : undefined}
            />
          </Box>
        }
        id={id}
      >
        <SupportPanel dropdownLists={dropdownLists} />
      </MainArticle>
    </>
  );
};
export default SupportSection;
