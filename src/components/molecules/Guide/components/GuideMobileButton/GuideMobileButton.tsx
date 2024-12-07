import React from 'react';

import { Box, IconButton, Tooltip } from '@chakra-ui/react';

import style from './GuideMobileButton.style';

import { Icon } from '@/components';
import { scrollToElement } from '@/helpers/srollToElement';
import useTranslation from '@/hooks/useTranslate';

const GuideMobileButton = () => {
  const { t } = useTranslation();

  const onClick = () => {
    scrollToElement('guide-component');
  };

  return (
    <Tooltip label={t('portal_guide_button_tooltip')} placement="top" hasArrow>
      <Box __css={style.root}>
        <IconButton
          variant={'primaryInverted'}
          aria-label="Some action"
          icon={
            <Icon
              name="support"
              width={'20px'}
              height={'20px'}
              color="secondary"
            />
          }
          onClick={onClick}
        />
      </Box>
    </Tooltip>
  );
};

export default GuideMobileButton;
