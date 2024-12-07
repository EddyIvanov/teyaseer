import React, { forwardRef, memo } from 'react';

import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import NextLink from 'next/link';

interface CustomLinkProps extends ChakraLinkProps {
  locale?: string;
}

const Link = forwardRef(function Link(
  { children, locale, ...rest }: CustomLinkProps,
  ref
) {
  return (
    <ChakraLink
      as={NextLink}
      target="_self"
      {...rest}
      ref={ref}
      locale={locale}
    >
      {children}
    </ChakraLink>
  );
});

export default memo(Link);
