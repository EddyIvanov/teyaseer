import React from 'react';

import { Box, Button, Divider, Flex, Heading } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

import styles from './OurPartners.style';
import OurPartnersProps from './OurPartners.type';
import UserSignUp from './components/UserSignUp';

import { Container, Icon, Link, Section } from '@/components';

const PartnersList = dynamic(
  () => import('./components/PartnersList/PartnersList'),
  { ssr: false }
);

const SearchAndFilters = dynamic(
  () => import('./components/SearchAndFilters'),
  { ssr: false }
);

export default function OurPartners({
  filters,
  title,
  signupInfo,
}: OurPartnersProps) {
  return (
    <Section sx={styles.section}>
      <Container sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <Flex sx={styles.headerBlock} flex={1}>
          <Flex sx={styles.backNavContainer}>
            <Button
              as={Link}
              href={'/find-qualified-vendors'}
              variant={'link'}
              leftIcon={
                <Icon name={'arrowBack'} width={'18px'} height={'18px'} />
              }
            />
            <Heading as="h1" sx={styles.headerTitle}>
              {title}
            </Heading>
          </Flex>
          <SearchAndFilters filters={filters} />
          <Divider borderColor="#ADADAD" />
          <PartnersList />
        </Flex>
        <UserSignUp signupInfo={signupInfo} />
        <Box h={'70px'} />
      </Container>
    </Section>
  );
}
