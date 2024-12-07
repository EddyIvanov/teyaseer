import { Button, Flex, useBreakpointValue } from '@chakra-ui/react';

import style from './VillaDesignSection.style';
import { VillaDesignSectionProps } from './VillaDesignSection.type';

import {
  Container,
  Icon,
  Text,
  VillaArticleBig,
  VillaArticleSmall,
  Link,
} from '@/components';

const VillaDesignSection = ({ villaDesign }: VillaDesignSectionProps) => {
  // If screen size is Md or below wrap the corresponding components in a container
  const isScreenSizeMdOrBelow = useBreakpointValue(
    {
      base: true,
      lg: false,
    },
    {
      fallback: 'lg',
    }
  );
  const featuredVillas = villaDesign.fields.villas.filter(
    villa => !!villa.fields.isFeatured
  );

  return (
    <>
      {featuredVillas.length > 0 ? (
        <Flex
          __css={style.root}
          as="section"
          id={`villa-${villaDesign.fields.subtitle}-design`}
        >
          <Container>
            <Flex className="villaDesignsHeading">
              <Text className="category">{villaDesign.fields.title}</Text>
              <Text as="h1" className="subCategory">
                {villaDesign.fields.subtitle}
              </Text>
            </Flex>
          </Container>
          <Flex __css={style.root.villaArticleSmallContainer}>
            {featuredVillas.length > 0 && (
              <VillaArticleSmall
                villa={featuredVillas[0]}
                isScreenSizeMdOrBelow={isScreenSizeMdOrBelow}
              />
            )}
          </Flex>

          <Flex flexDirection="row-reverse">
            <Flex
              flexDirection="column"
              width={{
                base: '100%',
                lg: 'min-content',
              }}
            >
              <Flex __css={style.root.villaArticleBigContainer}>
                {featuredVillas.length > 1 && (
                  <VillaArticleBig
                    villa={featuredVillas[1]}
                    isScreenSizeMdOrBelow={isScreenSizeMdOrBelow}
                  />
                )}
              </Flex>
            </Flex>
          </Flex>
          <>
            {isScreenSizeMdOrBelow ? (
              <Container>
                <Flex className="villaDesignsCta">
                  <Button
                    variant="primary"
                    href={villaDesign.fields.cta.fields.href || '#'}
                    as={Link}
                    rightIcon={
                      <Icon
                        name="arrowRight"
                        sx={{
                          path: {
                            stroke: 'white',
                          },
                        }}
                        w="18px"
                        h="18px"
                      />
                    }
                  >
                    {villaDesign.fields.cta.fields.label}
                  </Button>
                </Flex>
              </Container>
            ) : (
              <Flex className="villaDesignsCta">
                <Button
                  variant="primary"
                  href={villaDesign.fields.cta.fields.href || '#'}
                  as={Link}
                  rightIcon={
                    <Icon
                      name="arrowRight"
                      sx={{
                        path: {
                          stroke: 'white',
                        },
                      }}
                    />
                  }
                >
                  {villaDesign.fields.cta.fields.label}
                </Button>
              </Flex>
            )}
          </>
        </Flex>
      ) : null}
    </>
  );
};

export default VillaDesignSection;
