import { Flex, Spinner, SpinnerProps } from '@chakra-ui/react';

import style from './Loader.style';

import { Container } from '@/components';

const Loader = (props: SpinnerProps) => {
  const cmpStyle = style(props);
  return (
    <Container>
      <Flex justifyContent="center">
        <Spinner
          thickness="6px"
          speed="0.65s"
          sx={cmpStyle.villasSpinner}
          {...props}
        />
      </Flex>
    </Container>
  );
};

export default Loader;
