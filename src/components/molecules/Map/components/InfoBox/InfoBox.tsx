import React from 'react';

import { Box, Flex, HStack } from '@chakra-ui/react';
import { InfoBox as GoogleInfoBox, InfoBoxProps } from '@react-google-maps/api';

import style from './InfoBox.styled';

import { Icon } from '@/components';

interface IInfoBoxProps extends InfoBoxProps {
  closeInfoBox: () => void;
  disableAutoPan?: boolean;
}

const InfoBox = ({
  children,
  disableAutoPan = false,
  closeInfoBox,
  ...rest
}: IInfoBoxProps) => (
  <Box
    onClick={e => {
      e.stopPropagation();
    }}
    onTouchStart={e => {
      e.stopPropagation();
    }}
  >
    <GoogleInfoBox
      options={{
        disableAutoPan,
        pixelOffset: new google.maps.Size(-160, 0),
        closeBoxURL: ``,
        enableEventPropagation: false,
      }}
      {...rest}
    >
      <Box pt={2}>
        <HStack __css={style.root} gap={'4px'}>
          <Box className={'icon-wrapper'}>
            <Icon name={'locationPin'} color={'pink'} />
          </Box>
          <Box className={'children-wrapper'}>
            {children}
            <Flex onClick={closeInfoBox} className="m-infoBox__close">
              <Icon name="close" height={'10px'} width={'10px'} />
            </Flex>
          </Box>
        </HStack>
      </Box>
    </GoogleInfoBox>
  </Box>
);

export default InfoBox;
