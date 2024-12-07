import { Container, Flex } from '@chakra-ui/react';

import mediaStyle from './Media.style';
import MediaProps from './Media.type';

const Media = (props: MediaProps) => {
  const { imageNode, titleNode, descriptionNode, date } = props;

  return (
    <Container sx={{ height: '100%' }}>
      <Flex __css={mediaStyle.mediaItemContainer}>{imageNode}</Flex>
      {titleNode}
      {descriptionNode}
      {date}
    </Container>
  );
};

export default Media;
