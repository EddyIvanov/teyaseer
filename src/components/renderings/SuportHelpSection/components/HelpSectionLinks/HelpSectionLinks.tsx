import { Fragment } from 'react';

import { Box, Button, Flex } from '@chakra-ui/react';

import { HelpSectionLinksProps } from './HelpSection.type';
import style from './HelpSectionLinks.style';

import { Icon } from '@/components';

const HelpSectionLinks = ({
  actionLinks,
  openModal,
}: HelpSectionLinksProps) => {
  const customStyle = style();
  return (
    <Flex __css={customStyle.root}>
      {actionLinks?.map((actionLink, index) => {
        const { iconName, href, target } = actionLink.fields;

        return (
          <Fragment key={actionLink.sys.id}>
            <Box sx={customStyle.button}>
              {actionLink.fields.href !== '#' ? (
                <Button
                  variant={'primaryInverted'}
                  as="a"
                  href={href}
                  target={target}
                  rightIcon={
                    <Icon name={iconName ?? 'arrowRight'} w="28px" h="28px" />
                  }
                >
                  {actionLink.fields.label}
                </Button>
              ) : (
                <Button
                  key={actionLink.sys.id}
                  variant={'linkInverted'}
                  rightIcon={
                    <Icon name={iconName ?? 'pin'} w="20px" h="20px" />
                  }
                  onClick={openModal}
                  sx={customStyle.map}
                >
                  {actionLink.fields.label}
                </Button>
              )}
            </Box>
            {index == 0 && <Box className="separator" />}
          </Fragment>
        );
      })}
    </Flex>
  );
};

export default HelpSectionLinks;
