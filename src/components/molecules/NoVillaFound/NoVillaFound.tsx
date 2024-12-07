import { Flex, Text } from '@chakra-ui/react';

import style from './NoVillaFound.style';

import { Container, Icon } from '@/components';
import useTranslation from '@/hooks/useTranslate';

const NoVillaFound = () => {
  const { t } = useTranslation();

  const noVillaFoundMessages = t('no_villas_found');
  const noVillaFoundMessagesArray = noVillaFoundMessages.trim().split('|');

  return (
    <Container sx={style.noVillasFoundContainer}>
      <Flex alignItems="center" flexDirection="column">
        <Icon name="homeGray" width="48px" height="48px" opacity="0.3" />
        <Text sx={style.header}>{noVillaFoundMessagesArray[0]}</Text>
        <Text sx={style.subHeader}>{noVillaFoundMessagesArray[1]}</Text>
        <Flex sx={style.textsContainer}>
          <Text sx={style.text}>{noVillaFoundMessagesArray[2]}</Text>
          <Text sx={style.text}>{noVillaFoundMessagesArray[3]}</Text>
        </Flex>
      </Flex>
    </Container>
  );
};

export default NoVillaFound;
