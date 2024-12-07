import { forwardRef } from 'react';

import { Flex } from '@chakra-ui/react';

import SectionProps from './Section.type';

export type Ref = HTMLButtonElement;

// const Section = ((props: SectionProps,ref)) => {
const Section = forwardRef<Ref, SectionProps>(
  ({ height = '100vh', children, ...rest }, ref) => {
    return (
      <Flex
        ref={ref}
        position={'relative'}
        w="100%"
        overflow={'hidden'}
        display={'flex'}
        flexDirection={'column'}
        as={'section'}
        sx={{ h: height }}
        {...rest}
      >
        {children}
      </Flex>
    );
  }
);

Section.displayName = 'Section';
export default Section;
