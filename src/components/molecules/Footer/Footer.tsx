import React, { Fragment, memo } from 'react';

import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import Link from 'next/link';

import style from './Footer.style';
import { FooterPros } from './Footer.type';
import SocialLinks from '../SocialLinks/SocialLinks';

import { Container, Image } from '@/components';

const Footer = ({ fixFooter, footerData: data }: FooterPros) => {
  const cmpStyle = style({ fixFooter });

  return (
    <Box as="footer" sx={cmpStyle.root}>
      <Container>
        <Flex flexDirection={'column'} gap={'10px'}>
          {/* Social Links start */}
          <Flex sx={cmpStyle.social_box}>
            <SocialLinks socialLinks={data?.socialLinks} />
          </Flex>
          {/* Social Links end */}

          {/* Links and Logos Start*/}
          <Flex sx={cmpStyle.nav_box}>
            {/* Footer nav start */}
            <Grid
              className="grid"
              display={{ base: 'grid', lg: 'none' }}
              templateColumns={{
                base: 'repeat(2, 1fr)',
              }}
              rowGap={{ base: '10px', lg: '32px' }}
              columnGap={{ base: '10px', lg: '24px' }}
            >
              {data?.navs &&
                data?.navs?.map((nav, i) => {
                  return (
                    <GridItem key={`navs-mob-${nav.fields.label}-${i}`}>
                      <Link
                        key={nav.fields.label}
                        target={nav.fields.target}
                        href={nav.fields.href || '#'}
                      >
                        {nav.fields.label}
                      </Link>
                    </GridItem>
                  );
                })}
            </Grid>
            <Flex sx={{ ...cmpStyle.nav_style, ...cmpStyle.nav }} as="nav">
              {data?.navs &&
                data.navs.map((nav, i) => {
                  return (
                    <Link
                      key={`navs-desk-${nav.fields.label}-${i}`}
                      target={nav.fields.target}
                      href={nav.fields.href || '#'}
                    >
                      {nav.fields.label}
                    </Link>
                  );
                })}
            </Flex>
            {/* Footer nav end */}
            {/* Logos list start */}
            <Flex sx={cmpStyle.logos_box}>
              {data?.logos &&
                data.logos.map((logo, index) => {
                  return (
                    <Fragment key={`logos-${logo.fields.label}-${index}`}>
                      <Link
                        className={`logos-${logo.fields.label}-${index}`}
                        href={logo.fields.href}
                        target={logo.fields.target}
                      >
                        {logo.fields.icon && (
                          <Image
                            alt={logo.fields.icon.fields.title}
                            height={
                              logo.fields.icon.fields.file?.details.image.height
                            }
                            width={
                              logo.fields.icon.fields.file?.details.image.width
                            }
                            src={logo.fields.icon.fields.file?.url}
                            unoptimized
                          />
                        )}
                      </Link>
                      {/* Logos Divider start */}
                      {index !== data.logos.length - 1 && (
                        <Box className="divider" />
                      )}
                      {/* Logos Divider end*/}
                    </Fragment>
                  );
                })}
            </Flex>
            {/* Logos list end */}
          </Flex>
          {/* LInks and Logos end */}

          {/* CopyRight text start */}
          <Text sx={cmpStyle.copy_right}>{data?.copyRight}</Text>
          {/* CopyRight text end */}
        </Flex>
      </Container>
    </Box>
  );
};

export default memo(Footer);
