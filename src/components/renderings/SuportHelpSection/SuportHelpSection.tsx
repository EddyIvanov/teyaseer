import { useRef, useState } from 'react';

import { Box, Flex } from '@chakra-ui/react';

import style from './SupportHelpSection.style';
import HelpSectionLinks from './components/HelpSectionLinks';
import { StatisticsSectionProps } from '../StatisticsSection/StatisticsSection.type';

import { Container, ContentfulRichText, Image, Section } from '@/components';
import MapModal from '@/components/organism/MapModal/MapModal';
import { animationStyle } from '@/helpers/utils';
import useInViewport from '@/hooks/useInVewport';

const SuportHelpSection = ({
  backgroundImage,
  title,
  actionLinks,
  id,
}: StatisticsSectionProps) => {
  const [isOpen, setISopen] = useState(false);
  const toggleModal = () => {
    setISopen(!isOpen);
  };
  const sectionRef = useRef(null);
  const isInview = useInViewport(sectionRef);

  return (
    <Section ref={sectionRef} __css={style.root} id={id}>
      <Box
        position={'absolute'}
        height={'100%'}
        width={'100%'}
        sx={animationStyle({
          type: 'blur',
          perform: !isInview,
        })}
      >
        <Image
          src={backgroundImage?.fields?.file?.url || ''}
          alt="statistics-background-image"
          className="background-image"
          fill
        />
      </Box>
      <Container>
        <Flex
          sx={animationStyle({ type: 'slideUp', perform: isInview })}
          justifyContent="center"
        >
          {title && (
            <ContentfulRichText
              className="title"
              document={title}
              variant="unstyled"
            />
          )}
        </Flex>
        <HelpSectionLinks actionLinks={actionLinks} openModal={toggleModal} />
        <MapModal isOpen={isOpen} onClose={toggleModal} />
      </Container>
    </Section>
  );
};
export default SuportHelpSection;
