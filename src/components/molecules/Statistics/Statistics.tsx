import { useRef } from 'react';

import { Box, Button, Flex, Text } from '@chakra-ui/react';

import style from './Statistics.style';
import { StatisticsProps } from './Statistics.type';

import {
  Container,
  ContentfulRichText,
  Icon,
  Image,
  Link,
  Section,
} from '@/components';
import { animationStyle } from '@/helpers/utils';
import useInViewport from '@/hooks/useInVewport';
import colors from '@/styles/themes/brand/colors';

const Statistics = ({
  backgroundImage,
  title,
  infoBoxList,
  actionLinks,
  textColor,
  children,
  id,
  ...rest
}: StatisticsProps) => {
  const hasIcon = infoBoxList?.length
    ? !!infoBoxList[0].fields.iconName
    : false;

  const customStyle = style({
    hasIcon,
    color: colors.text[textColor],
    buttonCount: actionLinks?.length,
  });
  const sectionRef = useRef(null);
  const isInview = useInViewport(sectionRef);

  return (
    <Section ref={sectionRef} __css={customStyle.root} id={id}>
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
          src={backgroundImage || ''}
          alt="statistics-background-image"
          className="background-image"
          fill
        />
      </Box>
      <Container {...rest}>
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

        <Flex as={'ul'} className={hasIcon ? 'stats-list-grid' : 'stats-list'}>
          {infoBoxList?.length &&
            infoBoxList.map((item, index) => (
              <Flex
                sx={animationStyle({
                  type: 'slideDown',
                  duration: `${(index + 1) / 2}s`,
                  perform: isInview,
                })}
                as={'li'}
                key={index}
                className="stats-list-item"
              >
                {hasIcon && item.fields.iconName && (
                  <Flex className="stats-list__icon">
                    <Icon
                      name={item.fields.iconName}
                      sx={{
                        path: {
                          stroke: colors.text[textColor],
                        },
                      }}
                      className={`stats-list__icon--${textColor}`}
                    />
                  </Flex>
                )}
                <Text className="stats-list-item-count">
                  {item.fields.title}
                </Text>
                <Text className="stats-list-item-label">
                  {item.fields.subtitle}
                </Text>
                <Box className="stats-list-item-underline" />
              </Flex>
            ))}
        </Flex>

        <Flex className="cta-container">
          {actionLinks?.length &&
            actionLinks.map(actionLink => (
              <Button
                sx={animationStyle({
                  type: 'slideDown',
                  perform: isInview,
                })}
                key={actionLink.sys.id}
                as={Link}
                href={actionLink.fields.href}
                variant={'secondaryInverted'}
                w={{ base: '100%', sm: 'auto' }}
                target={actionLink.fields.target}
              >
                {actionLink.fields.label}
              </Button>
            ))}
        </Flex>

        {children}
      </Container>
    </Section>
  );
};

export default Statistics;
