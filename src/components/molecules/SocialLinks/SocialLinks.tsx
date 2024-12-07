import React from 'react';

import { Flex } from '@chakra-ui/react';
import Link from 'next/link';

import { SocialLinksType } from './SocailLinks.type';

import { Icon } from '@/components';
import useTranslation from '@/hooks/useTranslate';

type SocialLinksProp = {
  socialLinks?: SocialLinksType;
};

const SocialLinks = ({ socialLinks }: SocialLinksProp) => {
  const { t } = useTranslation();
  return (
    <Flex gap="24px">
      {socialLinks?.fields.links.map((social, index) => {
        return (
          <Link
            aria-label={`${t('aria_label_social_links')} ${
              social.fields.iconName
            }`}
            key={`socials-${index}`}
            href={social?.fields?.href || '#'}
            target={social.fields.target}
          >
            {social.fields.iconName && (
              <Icon name={social.fields.iconName} w="24px" h="24px" />
            )}
          </Link>
        );
      })}
    </Flex>
  );
};

export default SocialLinks;
